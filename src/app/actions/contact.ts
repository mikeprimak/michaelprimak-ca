"use server";

import { Resend } from "resend";
import { site } from "@/content/site";
import { validateContact, type ContactErrors } from "@/lib/contact-validation";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  /** Field-level errors keyed by input name. */
  errors?: ContactErrors;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const name = get("name");
  const email = get("email");
  const message = get("message");

  // --- Spam checks (silent): honeypot field and a minimum fill time. ---
  const honeypot = get("company");
  const startedAt = Number(get("startedAt") || 0);
  const tooFast = startedAt > 0 && Date.now() - startedAt < 3000;
  if (honeypot || tooFast) {
    // Pretend it worked so bots don't learn anything.
    return { status: "sent" };
  }

  // --- Validation ---
  const errors = validateContact({ name, email, message });
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors };
  }

  // --- Send ---
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY is not set; message not sent.", { name, email });
    return {
      status: "error",
      message: `The form isn't connected to email yet — please email me directly at ${site.email}.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from ${name} via michaelprimak.ca`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });
    if (error) throw new Error(error.message);
    return { status: "sent" };
  } catch (err) {
    console.error("[contact] send failed", err);
    return {
      status: "error",
      message: `Something went wrong sending that. Please email me directly at ${site.email}.`,
    };
  }
}
