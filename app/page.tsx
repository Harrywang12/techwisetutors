"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Monitor, Smartphone, Shield, Users, Heart, BookOpen,
  Calendar, MessageCircle, Laptop, Mail, Globe, HandHeart,
  ChevronRight, Star, ArrowRight, Wifi,
  Tablet, HelpCircle, Building2, Quote
} from "lucide-react";
import AnimatedSection from "./components/AnimatedSection";
import CountUp from "./components/CountUp";

const partners = [
  "Senior Sunrise Retirement Home",
  "Annex Retirement Home",
  "City of Richmond Hill",
  "City of Markham",
  "Mackenzie Long Term Care Home",
  "Hand in Hand NGO",
  "Holy Trinity School (HTS)",
  "L'Arche Daybreak",
];

const services = [
  { icon: Users, title: "1-on-1 Tech Tutoring", desc: "Personalized sessions tailored to individual learning needs" },
  { icon: Smartphone, title: "Smartphone Support", desc: "Help with phone setup, apps, calls, and messaging" },
  { icon: Laptop, title: "Computer Basics", desc: "Mouse, keyboard, files, folders, and internet browsing" },
  { icon: Mail, title: "Email & Messaging", desc: "Setting up and using email, texting, and video calls" },
  { icon: Shield, title: "Internet Safety", desc: "Scam awareness, passwords, and online privacy" },
  { icon: Tablet, title: "App Assistance", desc: "Downloading, using, and managing everyday apps" },
  { icon: Building2, title: "Retirement Home Workshops", desc: "Group sessions at partner care facilities" },
  { icon: Globe, title: "Community Outreach", desc: "Events and sessions across local communities" },
];

export default function HomePage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 -left-20 w-72 h-72 bg-primary-400/15 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-blue-300/10 rounded-full blur-3xl animate-float" />
        </div>

        {/* Floating tech icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[15%] left-[8%] w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Smartphone className="w-7 h-7 text-primary-200" />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute top-[25%] right-[12%] w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Wifi className="w-6 h-6 text-primary-200" />
          </motion.div>
          <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 5.5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-[30%] left-[15%] w-11 h-11 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Monitor className="w-5 h-5 text-primary-200" />
          </motion.div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, delay: 2 }} className="absolute bottom-[20%] right-[8%] w-13 h-13 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-200" />
          </motion.div>
          <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 1.5 }} className="absolute top-[60%] right-[25%] w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary-200" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
              >
                <HandHeart className="w-4 h-4 text-primary-200" />
                <span className="text-primary-100 text-sm font-medium">Youth-Led Nonprofit Organization</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1]">
                TechWise
                <span className="block text-primary-300">Tutors</span>
              </h1>

              <p className="text-xl text-primary-100 mb-8 leading-relaxed max-w-lg">
                A youth-led nonprofit helping seniors build digital confidence through compassionate tech support.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { label: "Active Volunteers", value: "50+" },
                  { label: "Community Partners", value: "8+" },
                  { label: "Senior Support", value: "100%" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-primary-200 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="btn-primary text-lg !py-3.5 !px-8 flex items-center gap-2">
                  Book a Session <Calendar className="w-5 h-5" />
                </Link>
                <Link href="/volunteer" className="btn-secondary !text-white !border-white/30 hover:!bg-white/10 text-lg !py-3.5 !px-8 flex items-center gap-2">
                  Become a Volunteer <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-primary-600/30 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                    alt="Team collaborating on technology"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
                </div>

                {/* Floating card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">50+ Volunteers</div>
                      <div className="text-xs text-gray-500">Making a difference</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,70 1440,60 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=700&q=80"
                    alt="People learning technology together"
                    width={700}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-2xl p-6 shadow-xl">
                  <div className="text-3xl font-black">50+</div>
                  <div className="text-sm font-medium text-primary-100">Active Volunteers</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-1.5 mb-4">
                <BookOpen className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700 text-sm font-semibold">About Us</span>
              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                Bridging the <span className="gradient-text">Digital Divide</span> for Seniors
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                TechWiseTutors is a youth-led nonprofit organization dedicated to helping seniors and community members navigate
                the digital world with confidence and ease. We believe everyone deserves access to technology and the knowledge to use it safely.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "1-on-1 personalized tech support sessions",
                  "Help with phones, tablets, laptops, apps, email, and digital tools",
                  "Online safety education and scam awareness",
                  "In-person and community-based support",
                  "A compassionate, patient, and accessible approach",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-1.5 mb-4">
                <HelpCircle className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700 text-sm font-semibold">What We Offer</span>
              </div>
              <h2 className="section-title">Programs & Services</h2>
              <p className="section-subtitle">
                From one-on-one tutoring to community workshops, we offer a range of programs designed
                to help seniors feel confident and safe using technology.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <div className="card h-full group">
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                    <service.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== IMPACT STATS ==================== */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-3">Our Impact</h2>
              <p className="text-primary-200 text-lg">Making a real difference in our community</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 50, suffix: "+", label: "Active Volunteers" },
              { value: 8, suffix: "+", label: "Community Partners" },
              { value: 200, suffix: "+", label: "Sessions Held" },
              { value: 500, suffix: "+", label: "Seniors Helped" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.15}>
                <div className="text-center">
                  <div className="text-5xl font-black text-white mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-primary-200 font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PARTNERS ==================== */}
      <section id="partners" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-1.5 mb-4">
                <Building2 className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700 text-sm font-semibold">Our Partners</span>
              </div>
              <h2 className="section-title">Trusted Partners</h2>
              <p className="section-subtitle">
                We work alongside schools, nonprofits, cities, and care homes to bring technology education directly to the community.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partners.map((partner, i) => (
              <AnimatedSection key={partner} delay={i * 0.08}>
                <div className="card text-center group cursor-default">
                  <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <Building2 className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{partner}</h3>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={partners.length * 0.08}>
              <div className="card text-center border-2 border-dashed border-primary-200 bg-primary-50/30 flex flex-col items-center justify-center cursor-default">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-semibold text-primary-700 text-sm">More Coming Soon</h3>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-1.5 mb-4">
                <Star className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700 text-sm font-semibold">Testimonials</span>
              </div>
              <h2 className="section-title">What People Say</h2>
              <p className="section-subtitle">
                Hear from our community partners and the people we serve.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The residents loved it. The TechWiseTutors volunteers were patient, kind, and incredibly helpful with our seniors.",
                name: "Tara Singh",
                role: "Mackenzie Long Term Care Home",
              },
              {
                quote: "A wonderful initiative by young people making technology accessible and less intimidating for our senior community members.",
                name: "Community Member",
                role: "City of Richmond Hill",
              },
              {
                quote: "The students showed great leadership and compassion. Their workshops have been a highlight for our residents.",
                name: "Activity Coordinator",
                role: "Senior Sunrise Retirement Home",
              },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="card h-full flex flex-col">
                  <Quote className="w-10 h-10 text-primary-200 mb-4" />
                  <p className="text-gray-700 leading-relaxed flex-1 mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 md:p-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary-300/20 rounded-full blur-3xl" />
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-black text-white mb-4">Ready to Make a Difference?</h2>
                <p className="text-primary-100 text-lg mb-8">
                  Whether you need tech help or want to volunteer, we&apos;re here for you. Join our growing community of volunteers and learners.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/book" className="btn-primary !bg-white !text-primary-700 hover:!bg-gray-50 text-lg !py-3.5 !px-8 flex items-center gap-2">
                    Book a Session <Calendar className="w-5 h-5" />
                  </Link>
                  <Link href="/volunteer" className="btn-secondary !text-white !border-white/30 hover:!bg-white/10 text-lg !py-3.5 !px-8 flex items-center gap-2">
                    Join Our Team <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== CONTACT PREVIEW ==================== */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-1.5 mb-4">
                <MessageCircle className="w-4 h-4 text-primary-600" />
                <span className="text-primary-700 text-sm font-semibold">Get in Touch</span>
              </div>
              <h2 className="section-title">Contact Us</h2>
              <p className="section-subtitle">
                Have questions? Want to partner with us? We&apos;d love to hear from you.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-xl mx-auto text-center">
              <div className="card">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <a href="mailto:matthewsingh291@gmail.com" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                  matthewsingh291@gmail.com
                </a>
                <div className="mt-6">
                  <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                    Send a Message <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
