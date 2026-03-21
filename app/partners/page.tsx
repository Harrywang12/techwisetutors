"use client";

import Link from "next/link";
import { Building2, Heart, ArrowRight, Handshake } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

const partners = [
  { name: "Senior Sunrise Retirement Home", type: "Retirement Home", desc: "Regular tech workshops for residents to stay connected with family." },
  { name: "Annex Retirement Home", type: "Retirement Home", desc: "Weekly drop-in sessions helping seniors with smartphones and tablets." },
  { name: "City of Richmond Hill", type: "Municipal Partner", desc: "Community outreach programs at city facilities and senior centres." },
  { name: "City of Markham", type: "Municipal Partner", desc: "Collaborative digital literacy initiatives for senior residents." },
  { name: "Mackenzie Long Term Care Home", type: "Long Term Care", desc: "Dedicated volunteers providing ongoing tech support for residents." },
  { name: "Hand in Hand NGO", type: "Nonprofit Partner", desc: "Joint programs supporting vulnerable community members with technology." },
  { name: "Holy Trinity School (HTS)", type: "School Partner", desc: "Student volunteer pipeline and collaborative community service initiatives." },
  { name: "L'Arche Daybreak", type: "Community Partner", desc: "Inclusive technology education for adults with intellectual disabilities." },
];

export default function PartnersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-primary-800 to-primary-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Handshake className="w-4 h-4 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Community Partnerships</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Our Partners</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            We work alongside schools, nonprofits, cities, and care homes to bring technology education directly to the community.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, i) => (
              <AnimatedSection key={partner.name} delay={i * 0.08}>
                <div className="card h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{partner.name}</h3>
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                        {partner.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{partner.desc}</p>
                </div>
              </AnimatedSection>
            ))}

            {/* More Coming Soon */}
            <AnimatedSection delay={partners.length * 0.08}>
              <div className="card h-full border-2 border-dashed border-primary-200 bg-primary-50/30 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="font-bold text-primary-700 text-lg mb-2">More Coming Soon</h3>
                <p className="text-gray-500 text-sm">
                  Interested in partnering with us? Get in touch!
                </p>
                <Link href="/contact" className="mt-4 text-primary-600 font-semibold text-sm inline-flex items-center gap-1 hover:text-primary-700">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Become a Partner</h2>
            <p className="text-gray-600 text-lg mb-8">
              We&apos;re always looking for new partnerships to expand our reach. If your organization serves seniors or community
              members who could benefit from tech support, let&apos;s connect.
            </p>
            <Link href="/contact" className="btn-primary text-lg !py-3.5 !px-8 inline-flex items-center gap-2">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
