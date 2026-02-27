"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const ROLES = [
  "Clinician / Eye Care Professional",
  "Researcher / Academic",
  "Investor / Partner",
  "Healthcare Organization",
  "Patient / Caregiver",
  "Media / Press",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-800">
          Thank you for reaching out!
        </h3>
        <p className="mt-2 text-sm text-green-700">
          We&apos;ll get back to you as soon as possible.
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
      className="space-y-5"
    >
      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="mb-1.5 block text-sm font-medium text-heading"
        >
          I am a...
        </label>
        <select
          id="role"
          name="role"
          required
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Select your role</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Name row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1.5 block text-sm font-medium text-heading"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-1.5 block text-sm font-medium text-heading"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-heading"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-heading"
          >
            Phone (optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-heading"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-heading outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        Send Message <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
