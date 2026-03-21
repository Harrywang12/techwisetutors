"use client";

import { Calendar, Clock, User } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import BookingForm from "./BookingForm";

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Calendar className="w-4 h-4 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Schedule a Session</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Book a Session</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Schedule a free one-on-one tech support session with one of our friendly volunteer tutors.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg>
        </div>
      </section>

      {/* Info + Form */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Availability Info */}
          <AnimatedSection>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Clock, title: "Weekday Hours", desc: "Monday — Friday\nAfter 5:00 PM" },
                { icon: Calendar, title: "Weekend Hours", desc: "Saturday — Sunday\n12:00 PM — 7:00 PM" },
                { icon: User, title: "Our Tutors", desc: "Maysam, Matthew, Arvin,\nBlair, Colin, Andy" },
              ].map((item) => (
                <div key={item.title} className="card text-center">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm whitespace-pre-line">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.1}>
            <BookingForm />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
