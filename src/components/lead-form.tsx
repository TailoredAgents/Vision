"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { trackEvent } from "./analytics-tracker";

type Props = { source: string; propertySlug?: string; compact?: boolean };

export function LeadForm({ source, propertySlug, compact = false }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, source, propertySlug }) });
      const body = await response.json() as { message?: string };
      if (!response.ok) throw new Error(body.message || "We could not send your message.");
      form.reset();
      setState("success");
      setMessage("Thank you. Your note has been received and the Vision team will follow up.");
      trackEvent("lead_submitted", { source, property: propertySlug ?? "none" });
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "We could not send your message. Please call or email us directly.");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate>
      <div className={compact ? "grid gap-5" : "grid gap-5 sm:grid-cols-2"}>
        <label><span className="field-label">Name *</span><input className="field" name="name" autoComplete="name" required minLength={2} /></label>
        <label><span className="field-label">Email *</span><input className="field" type="email" name="email" autoComplete="email" required /></label>
        <label><span className="field-label">Phone</span><input className="field" type="tel" name="phone" autoComplete="tel" /></label>
        <label><span className="field-label">Company</span><input className="field" name="company" autoComplete="organization" /></label>
      </div>
      <label><span className="field-label">How can we help? *</span><textarea className="field" name="message" required minLength={10} defaultValue={propertySlug ? "I would like to discuss this property and my requirements." : undefined} /></label>
      <label className="absolute left-[-9999px]" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="text-xs leading-5 text-muted">By submitting, you agree that Vision Commercial Advisors may contact you about your inquiry. See our <a className="underline" href="/privacy">privacy notice</a>.</p>
      <button className="button w-fit disabled:opacity-60" disabled={state === "sending"}>{state === "sending" && <LoaderCircle className="animate-spin" size={16} />}{state === "sending" ? "Sending…" : "Send inquiry"}</button>
      {message && <p role="status" className={`border-l-2 px-4 py-2 text-sm ${state === "success" ? "border-moss bg-moss/8 text-forest" : "border-red-700 bg-red-50 text-red-800"}`}>{message}</p>}
    </form>
  );
}
