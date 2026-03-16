"use client";

import { useActionState } from "react";
import type { VolunteerApplyState } from "@/app/volunteer/actions";
import { submitVolunteerApplication } from "@/app/volunteer/actions";

export function VolunteerApplicationForm() {
  const [state, formAction, isPending] = useActionState<
    VolunteerApplyState | null,
    FormData
  >(submitVolunteerApplication, null);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Full name</span>
          <input
            name="fullName"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">School</span>
          <input
            name="school"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-semibold text-slate-700">Grade</span>
          <input
            name="grade"
            required
            className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="e.g., 9"
          />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">
          Why do you want to volunteer?
        </span>
        <textarea
          name="whyVolunteer"
          required
          rows={4}
          className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">
          Experience with technology
        </span>
        <textarea
          name="techExperience"
          required
          rows={4}
          className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">Availability</span>
        <textarea
          name="availability"
          required
          rows={3}
          className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Days/times you can volunteer"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">
          Any past volunteer experience?
        </span>
        <textarea
          name="pastVolunteerExperience"
          required
          rows={3}
          className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>

      <button
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Submit application"}
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

