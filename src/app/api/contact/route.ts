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
      subject: "Nueva solicitud de cotización - Pallets Argentina",
      text: [
        "Nueva solicitud de cotización - Pallets Argentina",
        `Medida del Pallet: ${palletSize}`,
        `Estado del Pallet: ${palletCondition}`,
        `Tipo de Pallet: ${palletType}`,
        `Exportación: ${exportation}`,
        `Capacidad de Carga: ${loadCapacity}`,
        `Cantidad de Pallets: ${quantity}`,
        `Nombre Empresa: ${companyName}`,
        `Nombre y Apellido: ${fullName}`,
        `Email: ${email}`,
        `Detalles: ${details || "Sin detalles adicionales"}`,
      ].join("\n"),
      html: `<h2>Nueva solicitud de cotización</h2><p><strong>Medida del Pallet:</strong> ${safePalletSize}</p><p><strong>Estado del Pallet:</strong> ${safePalletCondition}</p><p><strong>Tipo de Pallet:</strong> ${safePalletType}</p><p><strong>Exportación:</strong> ${safeExportation}</p><p><strong>Capacidad de Carga:</strong> ${safeLoadCapacity}</p><p><strong>Cantidad de Pallets:</strong> ${safeQuantity}</p><p><strong>Nombre Empresa:</strong> ${safeCompanyName}</p><p><strong>Nombre y Apellido:</strong> ${safeFullName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Detalles:</strong><br />${safeDetails.replace(/\n/g, "<br />")}</p>`,
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
