"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Loader2, UserPlus } from "lucide-react";
import { registerVolunteer } from "./actions";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await registerVolunteer(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <form action={handleSubmit} className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create Your Account</h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        Use the email from your approved volunteer application.
      </p>

      <div className="space-y-5">
        <div>
          <label className="label flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> Email (from your application)
          </label>
          <input name="email" type="email" required className="input-field" placeholder="you@example.com" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" /> Password
          </label>
          <input name="password" type="password" required minLength={6} className="input-field" placeholder="At least 6 characters" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" /> Confirm Password
          </label>
          <input name="confirmPassword" type="password" required minLength={6} className="input-field" placeholder="Confirm your password" />
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-4 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-6 !py-3 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Creating account...</>
        ) : (
          <><UserPlus className="w-5 h-5" /> Create Account</>
        )}
      </button>

      <p className="mt-6 text-center text-gray-500 text-sm">
        Already have an account?{" "}
        <Link href="/volunteer/login" className="text-primary-600 font-semibold hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
