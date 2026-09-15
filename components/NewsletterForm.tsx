"use client";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
export function NewsletterForm({
  configured,
  testing,
}: {
  configured: boolean;
  testing: boolean;
}) {
  const id = useId();
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "pending") return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setState("pending");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fields.get("email"),
          website: fields.get("website") || "",
          consent: fields.get("consent") === "on",
        }),
      });
      const data = await response.json();
      if (typeof data.message !== "string") throw new Error("Invalid response");
      setMessage(data.message);
      setState(response.ok ? "success" : "error");
      if (response.ok) form.reset();
    } catch {
      setState("error");
      setMessage("The request couldn't be sent. Please try again later.");
    }
  }
  return (
    <form
      className="newsletter-form"
      onSubmit={submit}
      aria-describedby={`${id}-note`}
    >
      <label className="meta" htmlFor={`${id}-email`}>
        Your email address
      </label>
      <div className="email-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          maxLength={254}
          required
          disabled={state === "pending"}
        />
        <button type="submit" disabled={state === "pending"}>
          {state === "pending" ? "Sending…" : "Let me know"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input
          id={`${id}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="consent" htmlFor={`${id}-consent`}>
        <input type="checkbox" id={`${id}-consent`} name="consent" required />
        <span>
          Yes, send me new chapters and important book updates. I can
          unsubscribe at any time. <Link href="/privacy">Privacy</Link>.
        </span>
      </label>
      <p id={`${id}-note`} className="form-note">
        {testing
          ? "Local preview. No email is stored or sent."
          : configured
            ? "Confirm by email to join. No fixed schedule; just when there's something to share."
            : "Email signup opens soon. For now, follow on X or subscribe by RSS."}
      </p>
      <p
        className={`form-result ${state}`}
        role={state === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message}
      </p>
      <noscript>
        <p>
          Email signup needs JavaScript. You can still follow the{" "}
          <a href="/feed.xml">RSS feed</a>.
        </p>
      </noscript>
    </form>
  );
}
