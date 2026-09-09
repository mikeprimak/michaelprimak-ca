/**
 * Contact-form rules, shared by the browser (live feedback) and the server action
 * (the check that counts). Keep them identical so the two never disagree.
 */

export type ContactFields = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;

export function validateContact(f: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(f.email.trim())) errors.email = "Please enter a valid email address.";
  const msg = f.message.trim();
  if (msg.length < MESSAGE_MIN) errors.message = "Tell me a little more — at least a sentence.";
  else if (msg.length > MESSAGE_MAX) errors.message = `That's a bit long — please keep it under ${MESSAGE_MAX} characters.`;
  return errors;
}
