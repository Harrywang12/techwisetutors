"use client";

import { useActionState } from "react";
import type { HourSubmitState } from "@/app/volunteer/hours/actions";
import { submitHours } from "@/app/volunteer/hours/actions";

export function HoursForm() {
  const [state, formAction, isPending] = useActionState<
    HourSubmitState | null,
    FormData
  >(submitHours, null);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Date</span>
          <input
            type="date"
            name="date"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">
            Number of hours
          </span>
          <input
            type="number"
            step="0.25"
            min="0.25"
            name="hours"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="e.g., 2"
          />
        </label>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">
            Activity type
          </span>
          <input
            name="activityType"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Tutoring / workshop / outreach"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Location</span>
          <input
            name="location"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="In-person / online / partner site"
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">
          Notes / description
        </span>
        <textarea
          name="notes"
          required
          rows={4}
          className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>

      <button
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Submit hours for approval"}
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

