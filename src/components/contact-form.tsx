"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { contact, site } from "@/content/site";
import { validateContact, type ContactErrors, type ContactFields } from "@/lib/contact-validation";
import { Button } from "./ui";

const initial: ContactState = { status: "idle" };

const inputCls =
  "w-full min-h-[52px] rounded-xl border border-line bg-transparent px-4 text-ink placeholder:text-ink3 focus:border-ink focus:outline-none aria-invalid:border-accent";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  // The inputs are controlled so a failed submit never wipes what was typed:
  // React resets a form's uncontrolled fields after any action completes.
  const [fields, setFields] = useState<ContactFields>({ name: "", email: "", message: "" });
  // Errors appear only after a send has been attempted, then update as you type.
  const [attempted, setAttempted] = useState(false);
  // Server-side errors are shown until the field they belong to is edited. `cleared`
  // lists fields edited since the last server response, and resets when a new one arrives.
  const [seenState, setSeenState] = useState(state);
  const [cleared, setCleared] = useState<ReadonlySet<keyof ContactFields>>(new Set());
  if (seenState !== state) {
    setSeenState(state);
    setCleared(new Set());
  }
  const serverErrors: ContactErrors = {};
  if (state.status === "error" && state.errors) {
    for (const k of Object.keys(state.errors) as (keyof ContactFields)[]) {
      if (!cleared.has(k)) serverErrors[k] = state.errors[k];
    }
  }

  // When the form was first shown; used server-side to reject instant (bot) submissions.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const liveErrors = attempted ? validateContact(fields) : {};
  const err: ContactErrors = { ...liveErrors, ...serverErrors };
  const hasErrors = Object.keys(err).length > 0;

  const update = (key: keyof ContactFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (serverErrors[key]) setCleared((c) => new Set(c).add(key));
  };

  const submit = (formData: FormData) => {
    setAttempted(true);
    // Check here first so an obviously incomplete form never leaves the browser.
    if (Object.keys(validateContact(fields)).length > 0) return;
    formData.set("startedAt", String(openedAt.current));
    action(formData);
  };

  if (state.status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-bg2 p-8" role="status" aria-live="polite">
        <h3 className="serif mb-2 text-3xl">Thanks — got it.</h3>
        <p className="text-ink2">I’ll reply within {site.replyTime}.</p>
      </div>
    );
  }

  return (
    <form action={submit} noValidate className="flex flex-col gap-[18px]">
      {/* Spam controls: bots fill the hidden field or submit instantly. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <Field label="Name" id="name" error={err.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            value={fields.name}
            onChange={update("name")}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-error" : undefined}
            className={inputCls}
          />
        </Field>
        <Field label="Email" id="email" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            value={fields.email}
            onChange={update("email")}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-error" : undefined}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Message" id="message" error={err.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={contact.messagePlaceholder}
          value={fields.message}
          onChange={update("message")}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-error" : undefined}
          className={`${inputCls} min-h-[150px] resize-y py-3.5`}
        />
      </Field>

      {/* A server-side failure that is not about a specific field (e.g. the email service is down). */}
      {state.status === "error" && !state.errors && (
        <p className="text-[15px] text-accent" role="alert">
          {state.message}
        </p>
      )}
      {attempted && hasErrors && (
        <p className="text-[15px] text-accent" role="alert">
          Please fix the highlighted fields.
        </p>
      )}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-ink2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-accent" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
