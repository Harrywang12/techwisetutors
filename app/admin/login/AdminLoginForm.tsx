"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AdminLoginState } from "@/app/admin/login/actions";
import { adminLogin } from "@/app/admin/login/actions";

export function AdminLoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    AdminLoginState | null,
    FormData
  >(adminLogin, null);

  useEffect(() => {
    if (state?.ok) router.push("/admin");
  }, [state, router]);

  return (
    <form action={formAction} className="grid gap-4">
      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">Admin email</span>
        <input
          type="email"
          name="email"
          required
          className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-semibold text-slate-700">Password</span>
        <input
          type="password"
          name="password"
          required
          className="h-11 rounded-2xl border border-blue-100 bg-white px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </label>
      <button
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
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

