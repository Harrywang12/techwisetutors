"use client";

import { useActionState } from "react";
import type { BookingActionState } from "@/app/book/actions";
import { createBooking } from "@/app/book/actions";

export function BookingForm(props: {
  staffMembers: string[];
  slots: { value: string; label: string }[];
}) {
  const [state, formAction, isPending] = useActionState<
    BookingActionState | null,
    FormData
  >(createBooking, null);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">
            Select a staff member
          </span>
          <select
            name="staffMember"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            defaultValue={props.staffMembers[0] ?? ""}
          >
            {props.staffMembers.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">
            Choose a time slot
          </span>
          <select
            name="scheduledAt"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {props.slots.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Your name</span>
          <input
            name="requesterName"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Full name"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            name="requesterEmail"
            type="email"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">
          What do you need help with?
        </span>
        <textarea
          name="helpWith"
          required
          rows={5}
          className="rounded-2xl border border-blue-100 bg-white p-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Example: setting up email, learning video calls, scam awareness, installing apps..."
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Booking..." : "Confirm booking"}
      </button>

      {state?.message ? (
        <div
          className={`rounded-2xl border p-4 text-sm font-semibold ${
            state.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-rose-200 bg-rose-50 text-rose-900"
          }`}
          role="status"
          aria-live="polite"
        >
          {state.message}
        </div>
      ) : null}
    </form>
  );
}

