"use client";

import { FormEvent, useState } from "react";

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const need = String(data.get("need") ?? "").trim();
    const quantity = String(data.get("quantity") ?? "").trim();

    if (!name || !email || !need) {
      setError("Completá nombre, email y qué necesitás para enviar la consulta.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, need, quantity }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "No pudimos enviar la consulta.");

      event.currentTarget.reset();
      setSent(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "No pudimos enviar la consulta. Intentá nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }
  return <form className="quote-form" onSubmit={submit} noValidate>
    <label>Nombre / Empresa<input required name="name" placeholder="¿Con quién hablamos?" /></label>
    <label>Email<input required type="email" name="email" placeholder="Tu email de contacto" /></label>
    <label>¿Qué necesitás?<textarea required name="need" placeholder="Contanos medida, cantidad o tipo de carga" rows={3} /></label>
    <label>Cantidad estimada<input name="quantity" placeholder="Ej: 100 unidades" /></label>
    <button className="button button-lime" type="submit" disabled={submitting}>{submitting ? "Enviando..." : "Solicitar cotización"} <span>↗</span></button>
    {sent ? <p className="form-success" role="status" aria-live="polite">¡Listo! Recibimos tu consulta y te responderemos a la brevedad.</p> : error ? <p className="form-error" role="alert">{error}</p> : <p className="form-footnote">Te respondemos directo, sin formularios eternos.</p>}
  </form>;
}
