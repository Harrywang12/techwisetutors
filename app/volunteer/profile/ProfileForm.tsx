"use client";

import { useActionState } from "react";
import type { ProfileState } from "@/app/volunteer/profile/actions";
import { updateProfile } from "@/app/volunteer/profile/actions";

export function ProfileForm(props: {
  name: string;
  email: string;
  school: string;
  availability: string;
}) {
  const [state, formAction, isPending] = useActionState<
    ProfileState | null,
    FormData
  >(updateProfile, null);

  return (
    <form action={formAction} className="grid gap-4">
      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">Name</span>
        <input
          name="name"
          required
          defaultValue={props.name}
          className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <input
          name="email"
          readOnly
          value={props.email}
          className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-slate-700"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">School</span>
        <input
          name="school"
          defaultValue={props.school}
          className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">Availability</span>
        <textarea
          name="availability"
          rows={4}
          defaultValue={props.availability}
          className="rounded-2xl border border-blue-100 bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>

      <button
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save changes"}
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

