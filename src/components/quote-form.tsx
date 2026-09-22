"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/src/lib/site";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hola, soy ${data.get("name")}. Necesito cotizar: ${data.get("need")}. Cantidad estimada: ${data.get("quantity")}.`;
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }
  return <form className="quote-form" onSubmit={submit}><label>Nombre / Empresa<input required name="name" placeholder="¿Con quién hablamos?" /></label><label>¿Qué necesitás?<textarea required name="need" placeholder="Contanos medida, cantidad o tipo de carga" rows={3} /></label><label>Cantidad estimada<input name="quantity" placeholder="Ej: 100 unidades" /></label><button className="button button-lime" type="submit">Solicitar cotización <span>↗</span></button>{sent ? <p className="form-success">Se abrió WhatsApp con tu consulta lista para enviar.</p> : <p className="form-footnote">Te respondemos directo, sin formularios eternos.</p>}</form>;
}
