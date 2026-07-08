"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, Globe, Compass } from "lucide-react";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#030014aa] border-t border-[#7042f833] backdrop-blur-md text-gray-300 py-16 relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(112,66,248,0.1),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 font-mono text-xs md:text-sm">
        {/* Profile Card / Brief summary */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-white tracking-widest uppercase">
            Dhwanit Sukhadiya
          </h3>
          <p className="text-gray-400 leading-relaxed text-xs">
            Graduate Computer Engineer specializing in networking configurations, Active Directory Domain Services, desktop support troubleshooting, and cybersecurity operations.
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
              Available for Junior Roles
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-white tracking-widest uppercase flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Quick Links</span>
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="#about" className="hover:text-cyan-400 transition">
                {"// About Profile"}
              </Link>
            </li>
            <li>
              <Link href="#skills" className="hover:text-cyan-400 transition">
                {"// Technical Skills"}
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-cyan-400 transition">
                {"// Academic Labs"}
              </Link>
            </li>
            <li>
              <Link href="#certifications" className="hover:text-cyan-400 transition">
                {"// Certifications"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-white tracking-widest uppercase flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>Contact Information</span>
          </h3>
          <ul className="space-y-3 text-xs text-gray-400">
            <li className="flex items-center gap-2 hover:text-white transition">
              <Mail className="w-4 h-4 text-[#b49bff]" />
              <a href="mailto:dhwanitsukhadiya685@gmail.com">dhwanitsukhadiya685@gmail.com</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-4 h-4 text-[#b49bff]" />
              <a href="tel:+19162023698">+1 (916) 202-3698</a>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#b49bff]" />
              <span>Sacramento, CA</span>
            </li>
          </ul>
        </div>

        {/* Socials & Back To Top */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white tracking-widest uppercase">
              Social Links
            </h3>
            <div className="flex gap-4 mt-3">
              <a
                href="https://github.com/Aaron-2705"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-[#7042f88b] text-white hover:shadow-[0_0_10px_#7042f88b] transition duration-300"
              >
                <RxGithubLogo className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/dhwanit-sukhadiya"
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:border-[#7042f88b] text-white hover:shadow-[0_0_10px_#7042f88b] transition duration-300"
              >
                <RxLinkedinLogo className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Smooth Scroll Trigger */}
          <button
            onClick={scrollToTop}
            className="w-full md:w-max px-4 py-2 border border-[#7042f88b] bg-[#7042f811] hover:bg-[#7042f833] rounded-lg text-cyan-400 hover:text-white flex items-center justify-center gap-2 transition duration-200 outline-none mt-4 shadow-[0_0_10px_rgba(112,66,248,0.2)] hover:shadow-[0_0_15px_rgba(112,66,248,0.4)]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copy */}
      <div className="w-full max-w-6xl mx-auto px-10 mt-12 pt-6 border-t border-[#7042f811] text-center text-xs text-gray-500 font-mono">
        Secured with care | &copy; {new Date().getFullYear()} Dhwanit Sukhadiya. All rights reserved.
      </div>
    </footer>
  );
};
