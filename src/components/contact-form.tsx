"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { contact, site } from "@/content/site";
import { Button } from "./ui";

const initial: ContactState = { status: "idle" };

const inputCls =
  "w-full min-h-[52px] rounded-xl border border-line bg-transparent px-4 text-ink placeholder:text-ink3 focus:border-ink focus:outline-none aria-invalid:border-accent";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  // When the form was first shown; used server-side to reject instant (bot) submissions.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);
  const submit = (formData: FormData) => {
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

  const err = state.errors ?? {};

  return (
    <form action={submit} noValidate className="flex flex-col gap-[18px]">
      {/* Spam controls: bots fill the hidden field or submit instantly. */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <Field label="Name" id="name" error={err.name}>
          <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" aria-invalid={!!err.name} className={inputCls} />
        </Field>
        <Field label="Email" id="email" error={err.email}>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" aria-invalid={!!err.email} className={inputCls} />
        </Field>
      </div>

      <Field label="Message" id="message" error={err.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={contact.messagePlaceholder}
          aria-invalid={!!err.message}
          className={`${inputCls} min-h-[150px] resize-y py-3.5`}
        />
      </Field>

      {state.status === "error" && (
        <p className="text-[15px] text-accent" role="alert">
          {state.message}
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
        <p id={`${id}-error`} className="text-[13px] text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
