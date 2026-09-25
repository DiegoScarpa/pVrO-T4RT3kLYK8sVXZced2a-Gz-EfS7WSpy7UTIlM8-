import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const value = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
    const palletSize = value("palletSize");
    const palletCondition = value("palletCondition");
    const palletType = value("palletType");
    const exportation = value("exportation");
    const loadCapacity = value("loadCapacity");
    const quantity = value("quantity");
    const companyName = value("companyName");
    const fullName = value("fullName");
    const email = value("email");
    const details = value("details");

    // Honeypot spam protection: silently accept automated submissions without sending email.
    if (value("website")) {
      return NextResponse.json({ ok: true });
    }

    if (!palletSize || !palletCondition || !palletType || !exportation || !loadCapacity || !quantity || !companyName || !fullName || !email) {
      return NextResponse.json({ error: "Completá todos los campos obligatorios." }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Ingresá un email válido." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json({ error: "El servicio de contacto no está configurado todavía." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const safePalletSize = escapeHtml(palletSize);
    const safePalletCondition = escapeHtml(palletCondition);
    const safePalletType = escapeHtml(palletType);
    const safeExportation = escapeHtml(exportation);
    const safeLoadCapacity = escapeHtml(loadCapacity);
    const safeQuantity = escapeHtml(quantity);
    const safeCompanyName = escapeHtml(companyName);
    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeDetails = escapeHtml(details || "Sin detalles adicionales");

    const { error } = await resend.emails.send({
      from: "Pallets Argentina <ventas@palletsargentina.com>",
      to: ["ventas@palletsargentina.com"],
      replyTo: email,
      subject: "Nuevo pedido de cotización — Pallets Argentina",
      text: [
        "NUEVA SOLICITUD DE COTIZACIÓN",
        "",
        `Empresa:\n${companyName}`,
        "",
        `Contacto:\n${fullName}`,
        "",
        `Email:\n${email}`,
        "",
        `Medida del pallet:\n${palletSize}`,
        "",
        `Estado del pallet:\n${palletCondition}`,
        "",
        `Tipo de pallet:\n${palletType}`,
        "",
        `Exportación:\n${exportation}`,
        "",
        `Capacidad de carga:\n${loadCapacity}`,
        "",
        `Cantidad de pallets:\n${quantity}`,
        "",
        `Detalles:\n${details || "Sin detalles adicionales"}`,
      ].join("\n"),
      html: `<h2>NUEVA SOLICITUD DE COTIZACIÓN</h2><p><strong>Empresa:</strong><br />${safeCompanyName}</p><p><strong>Contacto:</strong><br />${safeFullName}</p><p><strong>Email:</strong><br />${safeEmail}</p><p><strong>Medida del pallet:</strong><br />${safePalletSize}</p><p><strong>Estado del pallet:</strong><br />${safePalletCondition}</p><p><strong>Tipo de pallet:</strong><br />${safePalletType}</p><p><strong>Exportación:</strong><br />${safeExportation}</p><p><strong>Capacidad de carga:</strong><br />${safeLoadCapacity}</p><p><strong>Cantidad de pallets:</strong><br />${safeQuantity}</p><p><strong>Detalles:</strong><br />${safeDetails.replace(/\n/g, "<br />")}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "No pudimos enviar la consulta. Intentá nuevamente." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: "No pudimos enviar la consulta. Intentá nuevamente." }, { status: 500 });
  }
}
