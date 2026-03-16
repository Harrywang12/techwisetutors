"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Name</span>
          <input
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>
      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">Message</span>
        <textarea
          required
          rows={5}
          className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>
      <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-700">
        Send message
      </button>
      {sent ? (
        <div
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-900"
          role="status"
          aria-live="polite"
        >
          Thanks! Please email us at <span className="font-extrabold">matthewsingh291@gmail.com</span>{" "}
          and we’ll respond as soon as possible.
        </div>
      ) : null}
    </form>
  );
}

