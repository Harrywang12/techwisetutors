"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, BookOpen, Clock, Heart, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitVolunteerApplication } from "./actions";

export default function VolunteerApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await submitVolunteerApplication(formData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center py-16"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for your interest in volunteering with TechWiseTutors! Our team will review your application and get back to you soon.
        </p>
        <p className="text-gray-500 text-sm mt-4">
          Once approved, you&apos;ll receive an email with instructions to create your volunteer account.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={handleSubmit} className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Volunteer Application Form</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Full Name *
          </label>
          <input name="fullName" type="text" required className="input-field" placeholder="Your full name" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> Email *
          </label>
          <input name="email" type="email" required className="input-field" placeholder="you@example.com" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-400" /> School *
          </label>
          <input name="school" type="text" required className="input-field" placeholder="Your school name" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400" /> Grade *
          </label>
          <select name="grade" required className="input-field">
            <option value="">Select grade...</option>
            {["Grade 9", "Grade 10", "Grade 11", "Grade 12", "Post-Secondary", "Other"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="label flex items-center gap-2">
            <Heart className="w-4 h-4 text-gray-400" /> Why do you want to volunteer? *
          </label>
          <textarea
            name="whyVolunteer"
            required
            rows={3}
            className="input-field resize-none"
            placeholder="Tell us why you're interested in volunteering with TechWiseTutors..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="label flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-400" /> Experience with technology *
          </label>
          <textarea
            name="techExperience"
            required
            rows={3}
            className="input-field resize-none"
            placeholder="Describe your experience with technology (e.g., devices, software, troubleshooting...)"
          />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> Availability *
          </label>
          <select name="availability" required className="input-field">
            <option value="">Select availability...</option>
            {[
              "Weekday evenings",
              "Weekend afternoons",
              "Both weekday & weekend",
              "Flexible",
            ].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400" /> Past Volunteer Experience
          </label>
          <input
            name="pastExperience"
            type="text"
            className="input-field"
            placeholder="Any previous volunteer experience (optional)"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-4 bg-red-50 p-3 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-6 !py-3.5 text-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
        ) : (
          <><Send className="w-5 h-5" /> Submit Application</>
        )}
      </button>
    </form>
  );
}
