"use client";

import Image from "next/image";
import { Heart, Clock, GraduationCap, Award, Users, HandHeart, Shield } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import VolunteerApplicationForm from "./VolunteerApplicationForm";

const benefits = [
  { icon: Clock, title: "Community Service Hours", desc: "Earn verified volunteer hours for your school and university applications." },
  { icon: GraduationCap, title: "Leadership Skills", desc: "Develop communication, teaching, and leadership abilities." },
  { icon: Heart, title: "Meaningful Impact", desc: "Make a real difference in the lives of seniors in your community." },
  { icon: Award, title: "Certificate & Reference", desc: "Receive official documentation of your volunteer contributions." },
  { icon: Users, title: "Team Experience", desc: "Work with a dedicated team of like-minded young volunteers." },
  { icon: Shield, title: "Tech Skills", desc: "Strengthen your own technology skills by teaching others." },
];

export default function VolunteerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-400/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <HandHeart className="w-4 h-4 text-primary-200" />
                <span className="text-primary-100 text-sm font-medium">Join Our Team</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Become a <span className="text-primary-300">Volunteer</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-lg">
                Join 50+ volunteers who are helping seniors navigate the digital world with confidence and compassion.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=80"
                  alt="Volunteers working together"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="section-title">Why Volunteer With Us?</h2>
              <p className="section-subtitle">
                Volunteering with TechWiseTutors is more than community service — it&apos;s an opportunity to grow, lead, and make a lasting impact.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <div className="card h-full">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="section-title">Apply Now</h2>
              <p className="section-subtitle">
                Fill out the form below to apply. Our team will review your application and get back to you.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <VolunteerApplicationForm />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
