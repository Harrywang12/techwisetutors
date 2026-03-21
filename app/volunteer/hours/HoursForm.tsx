"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, FileText, CheckCircle2, Loader2, Plus } from "lucide-react";
import { submitHourLog } from "./actions";

const activityTypes = [
  "1-on-1 Tutoring",
  "Group Workshop",
  "Community Outreach",
  "Retirement Home Visit",
  "Event Support",
  "Training / Meeting",
  "Administrative",
  "Other",
];

export default function HoursForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setSuccess(false);
    const result = await submitHourLog(formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSubmitted();
      }, 2000);
    }
  }

  return (
    <form action={handleSubmit} className="card">
      <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary-600" /> Log Volunteer Hours
      </h3>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" /> Date *
          </label>
          <input name="date" type="date" required className="input-field" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> Hours *
          </label>
          <input name="hours" type="number" step="0.5" min="0.5" max="24" required className="input-field" placeholder="e.g. 2" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" /> Activity Type *
          </label>
          <select name="activityType" required className="input-field">
            <option value="">Select type...</option>
            {activityTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" /> Location *
          </label>
          <input name="location" type="text" required className="input-field" placeholder="Where did you volunteer?" />
        </div>

        <div className="sm:col-span-2">
          <label className="label flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" /> Notes / Description
          </label>
          <textarea
            name="notes"
            rows={3}
            className="input-field resize-none"
            placeholder="Describe what you did..."
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-4 bg-red-50 p-3 rounded-lg">{error}</p>}

      {success && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-600 text-sm mt-4 bg-green-50 p-3 rounded-lg flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" /> Hours submitted successfully! Awaiting admin approval.
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-5 !py-2.5 flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
        ) : (
          <><Plus className="w-4 h-4" /> Submit Hours</>
        )}
      </button>
    </form>
  );
}
