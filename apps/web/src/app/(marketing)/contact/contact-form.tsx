"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const ROLES = [
  "Patient / Caregiver",
  "Clinician",
  "Researcher",
  "Investor",
  "Media",
  "Partner",
  "Other",
];

export function ContactForm() {
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white px-8 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/10">
          <CheckCircle className="h-7 w-7 text-[#10B981]" />
        </div>
        <h3
          className="text-[#0A1628] mb-2"
          style={{ fontSize: "20px", fontWeight: 700 }}
        >
          Thanks for submitting!
        </h3>
        <p
          className="text-[#475569] max-w-sm"
          style={{ fontSize: "14px", lineHeight: 1.6 }}
        >
          We&apos;ll review your message and get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-2xl border border-[#E2E8F0] bg-white p-8"
    >
      <h2
        className="font-heading text-[#0A1628] mb-1"
        style={{ fontSize: "20px", fontWeight: 700 }}
      >
        Send Us a Message
      </h2>
      <p
        className="text-[#475569] mb-8"
        style={{ fontSize: "14px", lineHeight: 1.6 }}
      >
        Fill out the form below and we&apos;ll get back to you shortly.
      </p>

      {/* Role Selection Pills */}
      <div className="mb-6">
        <label
          className="mb-3 block text-[#0A1628]"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          I am a...
        </label>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                selectedRole === role
                  ? "bg-[#0369A1] text-white"
                  : "border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0369A1]/30 hover:text-[#0369A1]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Name + Email Row */}
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-[#0A1628]"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-3 text-[14px] text-[#0A1628] placeholder-[#94A3B8] outline-none transition-all focus:border-[#0369A1] focus:ring-2 focus:ring-[#0369A1]/15"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-[#0A1628]"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-3 text-[14px] text-[#0A1628] placeholder-[#94A3B8] outline-none transition-all focus:border-[#0369A1] focus:ring-2 focus:ring-[#0369A1]/15"
          />
        </div>
      </div>

      {/* Phone + Country Row */}
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-[#0A1628]"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-3 text-[14px] text-[#0A1628] placeholder-[#94A3B8] outline-none transition-all focus:border-[#0369A1] focus:ring-2 focus:ring-[#0369A1]/15"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="mb-1.5 block text-[#0A1628]"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Your country"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-3 text-[14px] text-[#0A1628] placeholder-[#94A3B8] outline-none transition-all focus:border-[#0369A1] focus:ring-2 focus:ring-[#0369A1]/15"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="mb-1.5 block text-[#0A1628]"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us how we can help..."
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FBFF] px-4 py-3 text-[14px] text-[#0A1628] placeholder-[#94A3B8] outline-none transition-all focus:border-[#0369A1] focus:ring-2 focus:ring-[#0369A1]/15 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0369A1] px-8 py-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#075985] sm:w-auto sm:justify-start"
      >
        Send Message
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
