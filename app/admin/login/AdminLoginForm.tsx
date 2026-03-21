"use client";

import { useState } from "react";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { loginAdmin } from "./actions";

export default function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await loginAdmin(formData);
    setLoading(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={handleSubmit} className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>

      <div className="space-y-5">
        <div>
          <label className="label flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> Email
          </label>
          <input name="email" type="email" required className="input-field" placeholder="admin@techwisetutors.org" />
        </div>
        <div>
          <label className="label flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" /> Password
          </label>
          <input name="password" type="password" required className="input-field" placeholder="Your password" />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-4 bg-red-50 p-3 rounded-lg">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full mt-6 !py-3 flex items-center justify-center gap-2">
        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : <><LogIn className="w-5 h-5" /> Sign In</>}
      </button>
    </form>
  );
}
