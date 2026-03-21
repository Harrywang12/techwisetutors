"use client";

import { Mail, MessageCircle, MapPin } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <MessageCircle className="w-4 h-4 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Contact Us</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Have questions, want to partner with us, or need tech support? We&apos;d love to hear from you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <h2 className="text-3xl font-black text-gray-900 mb-6">Let&apos;s Connect</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you&apos;re a senior looking for tech help, a student interested in volunteering, or an organization
                  wanting to partner — we&apos;re here.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:matthewsingh291@gmail.com" className="text-primary-600 hover:text-primary-700 transition-colors">
                        matthewsingh291@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Serving</h3>
                      <p className="text-gray-600">Richmond Hill, Markham & surrounding communities</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right">
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
