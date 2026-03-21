"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, HelpCircle, CheckCircle2, Loader2 } from "lucide-react";
import { submitBooking } from "./actions";

const staff = ["Maysam", "Matthew", "Arvin", "Blair", "Colin", "Andy"];

const weekdaySlots = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"];
const weekendSlots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"];

function getAvailableSlots(dateStr: string): string[] {
  if (!dateStr) return [];
  const date = new Date(dateStr + "T12:00:00");
  const day = date.getDay();
  if (day === 0 || day === 6) return weekendSlots;
  return weekdaySlots;
}

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const slots = getAvailableSlots(date);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await submitBooking(formData);
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
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Session Booked!</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for booking a session with TechWiseTutors. We&apos;ll send you a confirmation email with all the details.
        </p>
      </motion.div>
    );
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <form action={handleSubmit} className="card">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="label flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Your Name
          </label>
          <input name="name" type="text" required className="input-field" placeholder="Full name" />
        </div>

        {/* Email */}
        <div>
          <label className="label flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> Email Address
          </label>
          <input name="email" type="email" required className="input-field" placeholder="you@example.com" />
        </div>

        {/* Staff */}
        <div>
          <label className="label flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Select Staff Member
          </label>
          <select name="staffMember" required className="input-field">
            <option value="">Choose a tutor...</option>
            {staff.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="label flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" /> Preferred Date
          </label>
          <input
            name="date"
            type="date"
            required
            min={today}
            className="input-field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time Slot */}
        <div>
          <label className="label flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> Time Slot
          </label>
          <select name="timeSlot" required className="input-field" disabled={!date}>
            <option value="">{date ? "Choose a time..." : "Select a date first"}</option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {date && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(date + "T12:00:00").getDay() === 0 || new Date(date + "T12:00:00").getDay() === 6
                ? "Weekend: 12:00 PM - 7:00 PM"
                : "Weekday: After 5:00 PM"}
            </p>
          )}
        </div>

        {/* Help Needed */}
        <div className="md:col-span-2">
          <label className="label flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-gray-400" /> What do you need help with?
          </label>
          <textarea
            name="helpNeeded"
            required
            rows={4}
            className="input-field resize-none"
            placeholder="Describe what you'd like help with (e.g., setting up email, learning to use a smartphone, internet safety...)"
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
          <><Loader2 className="w-5 h-5 animate-spin" /> Booking...</>
        ) : (
          <><Calendar className="w-5 h-5" /> Book Session</>
        )}
      </button>
    </form>
  );
}
