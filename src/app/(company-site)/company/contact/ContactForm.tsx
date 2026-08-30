"use client";

import { useState } from "react";
import type { CompanyDictionary } from "@/lib/i18n";

export function ContactForm({ dict }: { dict: CompanyDictionary["contact"] }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0" }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--company-forest)",
            marginBottom: "1rem",
          }}
        >
          {dict.successTitle}
        </h3>
        <p style={{ color: "var(--company-muted)" }}>{dict.successDesc}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--company-ink)",
          }}
        >
          {dict.nameLabel}
        </label>
        <input
          type="text"
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid var(--company-line)",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--company-ink)",
          }}
        >
          {dict.emailInputLabel}
        </label>
        <input
          type="email"
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid var(--company-line)",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--company-ink)",
          }}
        >
          {dict.orgLabel}
        </label>
        <input
          type="text"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid var(--company-line)",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--company-ink)",
          }}
        >
          {dict.typeLabel}
        </label>
        <select
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid var(--company-line)",
            borderRadius: "0.5rem",
          }}
        >
          <option>{dict.typeOption1}</option>
          <option>{dict.typeOption2}</option>
          <option>{dict.typeOption3}</option>
          <option>{dict.typeOption4}</option>
        </select>
      </div>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--company-ink)",
          }}
        >
          {dict.contentLabel}
        </label>
        <textarea
          required
          rows={5}
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "1px solid var(--company-line)",
            borderRadius: "0.5rem",
            resize: "vertical",
          }}
        ></textarea>
      </div>
      <button
        type="submit"
        style={{
          background: "var(--company-forest)",
          color: "#fff",
          padding: "1rem",
          border: "none",
          borderRadius: "0.5rem",
          fontWeight: 600,
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        {dict.submitButton}
      </button>
    </form>
  );
}
