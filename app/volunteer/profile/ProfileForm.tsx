"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Clock, Loader2, Save, CheckCircle2 } from "lucide-react";
import { updateVolunteerProfile } from "./actions";

interface ProfileData {
  fullName: string;
  email: string;
  school: string;
  grade: string;
  availability: string;
}

export default function ProfileForm({ profile }: { profile: ProfileData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setSuccess(false);
    const result = await updateVolunteerProfile(formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form action={handleSubmit} className="card">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Edit Profile</h3>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="label flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Full Name
          </label>
          <input name="fullName" type="text" required defaultValue={profile.fullName} className="input-field" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> Email
          </label>
          <input name="email" type="email" required defaultValue={profile.email} className="input-field" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-400" /> School
          </label>
          <input name="school" type="text" required defaultValue={profile.school} className="input-field" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> Availability
          </label>
          <select name="availability" required defaultValue={profile.availability} className="input-field">
            {["Weekday evenings", "Weekend afternoons", "Both weekday & weekend", "Flexible"].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-400" /> Grade
          </label>
          <input type="text" disabled value={profile.grade} className="input-field bg-gray-50 text-gray-500 cursor-not-allowed" />
          <p className="text-xs text-gray-400 mt-1">Contact admin to update grade.</p>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-4 bg-red-50 p-3 rounded-lg">{error}</p>}

      {success && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-600 text-sm mt-4 bg-green-50 p-3 rounded-lg flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-6 !py-2.5 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
        ) : (
          <><Save className="w-4 h-4" /> Save Changes</>
        )}
      </button>
    </form>
  );
}
