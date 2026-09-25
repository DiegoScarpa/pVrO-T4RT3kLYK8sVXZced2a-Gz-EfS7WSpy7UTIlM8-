"use client";

import { FormEvent, useState } from "react";

const palletSizes = [
  "1200 × 1000 mm (Tipo Arlog)",
  "1200 × 1000 mm (Descartable)",
  "1200 × 1200mm",
  "800 x 1200 mm (Tipo Euro)",
  "1000 × 1000 mm",
  "Otra Medidas",
];

const palletTypes = [
  "Pallet de 9 tacos de madera (4 entradas)",
  "Pallet de 3 Tirantes/Largueros (2 entradas)",
  "Pallet de 4 Tirantes/Largueros (2 entradas)",
];

const loadCapacities = [
  "Hasta 500 Kg (Liviano)",
  "Entre 500 a 800 Kg (Normal)",
  "800 a 1.000 Kg (Fuerte)",
  "1.000 a 1.200 Kg (Fuerte y Pesado)",
  "Mas de 1.200 Kg (Especial)",
];

const requiredFields = [
  "palletSize",
  "palletCondition",
  "palletType",
  "exportation",
  "loadCapacity",
  "quantity",
  "companyName",
  "fullName",
  "email",
] as const;

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const missing = requiredFields.some((field) => !String(values[field] ?? "").trim());
    const email = String(values.email ?? "").trim();

    if (missing) {
      setError("Completá todos los campos obligatorios para enviar la consulta.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Ingresá un email válido.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "No pudimos enviar la consulta.");

      form.reset();
      setSent(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "No pudimos enviar la consulta. Intentá nuevamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return <form className="quote-form" onSubmit={submit} noValidate>
    {sent ? <div className="form-success" role="status" aria-live="polite">
      <span>✓</span>
      <h3>¡Listo! Recibimos tu consulta.</h3>
      <p>Te vamos a responder a la brevedad para ayudarte con tu próximo movimiento.</p>
      <button type="button" onClick={() => setSent(false)}>Enviar otra consulta</button>
    </div> : <>
      <label>Medida del Pallet <b>*</b>
        <select required name="palletSize" defaultValue="">
          <option value="" disabled>Escoja la medida del pallet.</option>
          {palletSizes.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>

      <fieldset className="quote-fieldset">
        <legend>Estado del Pallet <b>*</b></legend>
        <div className="quote-options">
          {[
            "Pallet Nuevo",
            "Pallet Usado/Reciclado",
            "Pallet Reciclado Seleccionado",
          ].map((label) => <label className="quote-option" key={label}>
            <input required type="radio" name="palletCondition" value={label} />
            <span>{label}</span>
          </label>)}
        </div>
      </fieldset>

      <label>Tipo de Pallet <b>*</b>
        <select required name="palletType" defaultValue="">
          <option value="" disabled>Seleccione el tipo de pallet.</option>
          {palletTypes.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>

      <fieldset className="quote-fieldset">
        <legend>Exportación <b>*</b></legend>
        <div className="quote-options quote-options-inline">
          <label className="quote-option"><input required type="radio" name="exportation" value="para Exportacion (Catem)" /><span>para Exportacion (Catem)</span></label>
          <label className="quote-option"><input required type="radio" name="exportation" value="No Exportacion (Uso Nacional)" /><span>No Exportacion (Uso Nacional)</span></label>
        </div>
      </fieldset>

      <label>Capacidad de Carga <b>*</b>
        <select required name="loadCapacity" defaultValue="">
          <option value="" disabled>Seleccione la capacidad de carga.</option>
          {loadCapacities.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>

      <div className="quote-form-grid">
        <label>Cantidad de Pallets <b>*</b><input required name="quantity" placeholder="Cant de Pallets" /></label>
        <label>Nombre Empresa <b>*</b><input required name="companyName" placeholder="Nombre de la Empresa" /></label>
        <label>Nombre y Apellido <b>*</b><input required name="fullName" placeholder="Nombre y Apellido" /></label>
        <label>Email <b>*</b><input required type="email" name="email" placeholder="Email" /></label>
      </div>

      <label>Detalles<textarea name="details" placeholder="Detalles que desee comentarnos" rows={3} /></label>

      <div className="quote-honeypot" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" name="website" /></label>
      </div>

      <button className="button button-submit" type="submit" disabled={submitting}>{submitting ? "Enviando..." : "Enviar"} <span>↗</span></button>
      {error ? <p className="form-error" role="alert">{error}</p> : <p className="form-footnote">Te respondemos directo, sin formularios eternos.</p>}
    </>}
  </form>;
}
