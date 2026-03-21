import Link from "next/link";
import { Monitor, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                TechWise<span className="text-primary-400">Tutors</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A youth-led nonprofit helping seniors build digital confidence through compassionate tech support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/partners", label: "Partners" },
                { href: "/book", label: "Book a Session" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Get Involved</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/volunteer", label: "Become a Volunteer" },
                { href: "/volunteer/login", label: "Volunteer Portal" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Contact</h4>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail className="w-4 h-4 shrink-0" />
              <a href="mailto:matthewsingh291@gmail.com" className="hover:text-white transition-colors">
                matthewsingh291@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TechWiseTutors. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> by youth volunteers
          </p>
        </div>
      </div>
    </footer>
  );
}
