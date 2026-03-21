"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen, Heart, Shield, Users, GraduationCap,
  Lightbulb, HandHeart, Target, Eye
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-400/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <BookOpen className="w-4 h-4 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">About TechWiseTutors</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Who We Are</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            A youth-led movement dedicated to empowering seniors through technology education and compassionate support.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80"
                  alt="Young volunteers working together"
                  width={700}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                TechWiseTutors was founded by students who noticed that many seniors in their community struggled with everyday
                technology — from making video calls to their families to spotting online scams. What began as a small initiative
                has grown into a 50+ volunteer organization partnering with retirement homes, cities, and community groups.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We believe the digital divide shouldn&apos;t leave anyone behind. Our volunteers bring patience, compassion, and
                technical knowledge directly to the people who need it most — meeting them where they are, at their pace.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "Mission-Driven" },
                  { icon: Heart, label: "Compassionate" },
                  { icon: Users, label: "Community-Based" },
                  { icon: Shield, label: "Safety-Focused" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-primary-50 rounded-xl p-3">
                    <item.icon className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0}>
              <div className="card h-full">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To bridge the digital divide for seniors and community members by providing free, accessible, and compassionate
                  technology education through youth-led volunteer tutoring.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="card h-full">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  A world where every senior feels confident, connected, and safe using technology — supported by a community
                  of young people who care.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="section-title">What We Do</h2>
              <p className="section-subtitle">
                Our approach is simple — meet people where they are, with patience and compassion.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "1-on-1 Tech Support", desc: "Personalized tutoring sessions adapted to each learner's pace and needs." },
              { icon: Shield, title: "Online Safety Education", desc: "Helping seniors recognize scams, protect passwords, and stay safe online." },
              { icon: HandHeart, title: "Community Workshops", desc: "Group sessions at retirement homes, community centres, and partner facilities." },
              { icon: Lightbulb, title: "Digital Literacy", desc: "Teaching the fundamentals of using smartphones, tablets, and computers." },
              { icon: GraduationCap, title: "Youth Development", desc: "Building leadership, communication, and teaching skills in young volunteers." },
              { icon: Heart, title: "Compassionate Approach", desc: "Every interaction is grounded in patience, respect, and genuine care." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="card h-full">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-white mb-4">Join Our Mission</h2>
            <p className="text-primary-100 text-lg mb-8">
              Whether you want to help or need tech support, we&apos;re here for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/volunteer" className="btn-primary !bg-white !text-primary-700 hover:!bg-gray-50">
                Become a Volunteer
              </Link>
              <Link href="/book" className="btn-secondary !text-white !border-white/30 hover:!bg-white/10">
                Book a Session
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
