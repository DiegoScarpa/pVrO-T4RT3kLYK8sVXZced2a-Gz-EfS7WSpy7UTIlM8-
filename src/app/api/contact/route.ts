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
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const need = typeof body.need === "string" ? body.need.trim() : "";
    const quantity = typeof body.quantity === "string" ? body.quantity.trim() : "";

    if (!name || !email || !need) {
      return NextResponse.json({ error: "Completá nombre, email y qué necesitás." }, { status: 400 });
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
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeNeed = escapeHtml(need);
    const safeQuantity = escapeHtml(quantity || "No indicada");

    const { error } = await resend.emails.send({
      from: "Pallets Argentina <ventas@palletsargentina.com>",
      to: ["ventas@palletsargentina.com"],
      replyTo: email,
      subject: "Nueva solicitud de cotización - Pallets Argentina",
      text: [
        "Nueva solicitud de cotización - Pallets Argentina",
        `Nombre / Empresa: ${name}`,
        `Email: ${email}`,
        `Qué necesita: ${need}`,
        `Cantidad estimada: ${quantity || "No indicada"}`,
      ].join("\n"),
      html: `<h2>Nueva solicitud de cotización</h2><p><strong>Nombre / Empresa:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Qué necesita:</strong><br />${safeNeed.replace(/\n/g, "<br />")}</p><p><strong>Cantidad estimada:</strong> ${safeQuantity}</p>`,
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
