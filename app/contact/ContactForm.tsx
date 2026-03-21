"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContactMessage } from "./actions";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await submitContactMessage(formData);
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
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
        <p className="text-gray-600">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
      </motion.div>
    );
  }

  return (
    <form action={handleSubmit} className="card">
      <div className="space-y-6">
        <div>
          <label className="label flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Your Name
          </label>
          <input name="name" type="text" required className="input-field" placeholder="Full name" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> Email Address
          </label>
          <input name="email" type="email" required className="input-field" placeholder="you@example.com" />
        </div>

        <div>
          <label className="label flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-gray-400" /> Message
          </label>
          <textarea
            name="message"
            required
            rows={6}
            className="input-field resize-none"
            placeholder="How can we help you?"
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
          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-5 h-5" /> Send Message</>
        )}
      </button>
    </form>
  );
}
