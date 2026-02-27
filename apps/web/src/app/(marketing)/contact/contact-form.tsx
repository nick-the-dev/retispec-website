"use client";

import { useState } from "react";
import { Send, CheckCircle, User, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white px-8 py-20 text-center shadow-sm">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/10">
          <CheckCircle className="h-8 w-8 text-[#10B981]" />
        </div>
        <h3
          className="text-[#0A1628] mb-2"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          Message Sent!
        </h3>
        <p
          className="text-[#475569] max-w-sm"
          style={{ fontSize: "14px", lineHeight: 1.7 }}
        >
          Thank you for reaching out. Our team will review your message and get
          back to you within 1-2 business days.
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
      className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm"
    >
      {/* Form Header */}
      <div className="border-b border-[#E2E8F0] px-8 py-6">
        <h2
          className="text-[#0A1628]"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Send Us a Message
        </h2>
        <p
          className="mt-1 text-[#475569]"
          style={{ fontSize: "14px", lineHeight: 1.6 }}
        >
          Fill out the form below and we&apos;ll get back to you shortly.
        </p>
      </div>

      <div className="space-y-6 px-8 py-8">
        {/* Role Selection */}
        <div className="space-y-2.5">
          <Label className="text-[13px] font-medium uppercase tracking-wider text-[#475569]">
            I am a...
          </Label>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-medium transition-all cursor-pointer",
                  selectedRole === role
                    ? "bg-[#0369A1] text-white shadow-sm shadow-[#0369A1]/25"
                    : "border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0369A1]/30 hover:bg-[#F8FBFF] hover:text-[#0369A1]"
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Name + Email Row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <AtSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Phone + Country Row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone{" "}
              <span className="font-normal text-[#94A3B8]">(optional)</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select id="country" name="country" defaultValue="">
              <option value="" disabled>
                Select your country
              </option>
              <option value="CA">Canada</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
              <option value="other">Other</option>
            </Select>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help you?"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us more about your inquiry..."
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[#E2E8F0] px-8 py-5">
        <p className="hidden text-[12px] text-[#94A3B8] sm:block">
          We typically respond within 1-2 business days.
        </p>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Send Message
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
