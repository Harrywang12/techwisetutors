"use client";

import Link from "next/link";
import {
  Users, Smartphone, Laptop, Mail, Shield, Tablet,
  Building2, Globe, Calendar,
  Settings
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

const services = [
  {
    icon: Users,
    title: "1-on-1 Tech Tutoring",
    desc: "Our signature program pairs a volunteer tutor with a learner for personalized sessions. We cover everything from turning on a device to navigating complex apps — all at your pace.",
    features: ["Personalized learning plan", "Patient & supportive environment", "Follow-up sessions available"],
  },
  {
    icon: Smartphone,
    title: "Smartphone Support",
    desc: "Learn to use your smartphone with confidence. We help with making calls, texting, taking photos, downloading apps, and understanding settings.",
    features: ["iPhone & Android support", "App installation & management", "Camera & photo basics"],
  },
  {
    icon: Laptop,
    title: "Computer Basics",
    desc: "From using a mouse and keyboard to managing files and browsing the internet, we make computers accessible and easy to understand.",
    features: ["Mouse & keyboard skills", "File management", "Web browsing & search"],
  },
  {
    icon: Mail,
    title: "Email & Messaging",
    desc: "Stay connected with family and friends. We teach you how to set up email, send messages, make video calls, and use social media safely.",
    features: ["Email setup & management", "Video calling (Zoom, FaceTime)", "Messaging apps"],
  },
  {
    icon: Shield,
    title: "Internet Safety & Scam Awareness",
    desc: "Protect yourself online. We teach how to recognize scams, create strong passwords, and practice safe browsing habits.",
    features: ["Scam identification", "Password security", "Privacy settings"],
  },
  {
    icon: Tablet,
    title: "App Assistance",
    desc: "Need help with a specific app? Whether it's banking, healthcare portals, grocery delivery, or social media — we'll walk you through it.",
    features: ["Banking & finance apps", "Healthcare portals", "Everyday utility apps"],
  },
  {
    icon: Building2,
    title: "Retirement Home Workshops",
    desc: "We bring our programs directly to retirement homes and long-term care facilities, offering group workshops tailored to residents' needs.",
    features: ["On-site group sessions", "Customized for residents", "Regular scheduled visits"],
  },
  {
    icon: Globe,
    title: "Community Outreach Sessions",
    desc: "Open sessions at community centres, libraries, and partner locations where anyone can drop in for tech help and digital literacy support.",
    features: ["Drop-in format", "Multiple locations", "All skill levels welcome"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Settings className="w-4 h-4 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Our Programs</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Programs & Services</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            From one-on-one tutoring to community workshops, we have a program that fits your needs.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={0.05}>
                <div className={`card flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center shrink-0">
                    <service.icon className="w-10 h-10 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span key={f} className="bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Need Tech Help?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Book a free session with one of our volunteers and start building your digital confidence today.
            </p>
            <Link href="/book" className="btn-primary text-lg !py-3.5 !px-8 inline-flex items-center gap-2">
              Book a Session <Calendar className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
