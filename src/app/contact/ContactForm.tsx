"use client";

import Script from "next/script";
import { useState, useRef, useCallback } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    type: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const turnstileRef = useRef("");

  const onTurnstileCallback = useCallback((token: string) => {
    turnstileRef.current = token;
  }, []);

  if (typeof window !== "undefined") {
    (window as any).onTurnstileContact = onTurnstileCallback;
  }

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, honeypot, turnstileToken: turnstileRef.current }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message.");
      }
      setSuccess("Your message has been sent successfully. We'll be in touch!");
      setForm({ firstName: "", lastName: "", email: "", phone: "", type: "", subject: "", message: "" });
      setHoneypot("");
      if (typeof window !== "undefined" && (window as any).turnstile) {
        (window as any).turnstile.reset();
      }
    } catch (err: any) {
      setError(err?.message || "Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input type="text" id="firstName" name="firstName" required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input type="text" id="lastName" name="lastName" required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input type="email" id="email" name="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">I am a... *</label>
            <select id="type" name="type" required value={form.type} onChange={(e) => update("type", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
              <option value="">Select one</option>
              <option value="advisor">Financial Advisor / RIA</option>
              <option value="investor">Individual Investor</option>
              <option value="institutional">Institutional Investor</option>
              <option value="media">Media / Press</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <select id="subject" name="subject" required value={form.subject} onChange={(e) => update("subject", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
              <option value="">Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="funds">Fund Information</option>
              <option value="advisor">Advisor Partnership</option>
              <option value="documents">Document Request</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Honeypot */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
            <textarea id="message" name="message" rows={5} required value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none" />
          </div>

          {error && <div className="rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">{error}</div>}
          {success && <div className="rounded-lg border border-green-300 bg-green-50 text-green-700 text-sm px-4 py-3">{success}</div>}

          {/* Cloudflare Turnstile */}
          <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-callback="onTurnstileContact" data-theme="light" data-size="flexible" />

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </>
  );
}
