"use client";

import { useState } from "react";
import { faqs } from "@/src/lib/site";

export function FaqList() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{faqs.map((faq, index) => <div className={`faq-item ${open === index ? "is-open" : ""}`} key={faq.question}><button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{faq.question}</strong><i>{open === index ? "−" : "+"}</i></button>{open === index && <p>{faq.answer}</p>}</div>)}</div>;
}
