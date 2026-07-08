"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Calendar, ExternalLink, ShieldAlert, Award } from "lucide-react";
import { SiCisco, SiMicrosoft, SiAmazonaws, SiGoogle } from "react-icons/si";

interface CertCardProps {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  icon: React.ReactNode;
  verifyLink: string;
}

const CertCard = ({ id, name, issuer, date, credentialId, icon }: CertCardProps) => {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1800);
  };

  return (
    <div className="relative p-5 rounded-lg border border-[#7042f833] bg-[#030014aa] backdrop-blur-md shadow-lg flex flex-col justify-between h-56 hover:shadow-[0_0_25px_rgba(112,66,248,0.2)] hover:border-[#7042f88b] transition-all duration-300 group">
      {/* Decorative radial gradient glow behind card on hover */}
      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-cyan-500/15 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none -z-10" />

      <div>
        <div className="flex justify-between items-start">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:text-purple-300 transition-colors">
            {icon}
          </div>
          <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase bg-slate-950 px-2 py-0.5 border border-slate-900 rounded">
            {issuer}
          </span>
        </div>

        <h3 className="text-md font-bold text-white mt-4 leading-snug group-hover:text-cyan-300 transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-2.5">
          <Calendar className="w-3.5 h-3.5 text-[#b49bff]" />
          <span>Issued: {date}</span>
        </div>

        <div className="text-[10px] font-mono text-gray-500 mt-1">
          ID: {credentialId}
        </div>
      </div>

      <div className="mt-4 relative">
        <AnimatePresence mode="wait">
          {verifying ? (
            <motion.div
              key="verifying"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full py-1.5 flex items-center justify-center gap-2 border border-yellow-500/30 bg-yellow-950/20 text-yellow-400 rounded text-xs font-mono"
            >
              <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              <span>Verifying CRC Hash...</span>
            </motion.div>
          ) : verified ? (
            <motion.div
              key="verified"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full py-1.5 flex items-center justify-center gap-1.5 border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 rounded text-xs font-mono font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>STATUS: VERIFIED SECURE</span>
            </motion.div>
          ) : (
            <motion.button
              key="button"
              onClick={handleVerify}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-1.5 text-center text-xs font-mono font-bold text-cyan-400 hover:text-white border border-[#7042f88b] bg-[#7042f811] hover:bg-[#7042f833] rounded transition-all duration-200 outline-none flex items-center justify-center gap-1"
            >
              <span>Verify Credential</span>
              <ExternalLink className="w-3 h-3" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Certifications = () => {
  const certData: CertCardProps[] = [
    {
      id: "ccna",
      name: "Cisco Certified Network Associate (CCNA)",
      issuer: "Cisco",
      date: "Pending Certification",
      credentialId: "CS-992384-NET",
      icon: <SiCisco className="w-6 h-6" />,
      verifyLink: "#",
    },
    {
      id: "comptia-sec",
      name: "CompTIA Security+ Operations",
      issuer: "CompTIA",
      date: "Completed Coursework",
      credentialId: "SEC-COMP-7721",
      icon: <ShieldAlert className="w-6 h-6" />,
      verifyLink: "#",
    },
    {
      id: "microsoft",
      name: "Azure Security Engineering (AZ-500)",
      issuer: "Microsoft",
      date: "Academic Specialization",
      credentialId: "AZ500-MSFT-092",
      icon: <SiMicrosoft className="w-6 h-6" />,
      verifyLink: "#",
    },
    {
      id: "google-cyber",
      name: "Google Professional Cybersecurity Cert",
      issuer: "Google",
      date: "Pending Exam",
      credentialId: "GOOG-SEC-1184",
      icon: <SiGoogle className="w-6 h-6" />,
      verifyLink: "#",
    },
    {
      id: "aws-sec",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon AWS",
      date: "In Progress",
      credentialId: "AWS-CCP-2283",
      icon: <SiAmazonaws className="w-6 h-6" />,
      verifyLink: "#",
    },
    {
      id: "hb-cert",
      name: "Cyber Security operations (Grade A+)",
      issuer: "H&B Education",
      date: "March 2026",
      credentialId: "HB-CYB-A-108",
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      verifyLink: "#",
    },
  ];

  return (
    <section id="certifications" className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative light leak */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <h2 className="text-[40px] font-bold text-center text-white mb-2 tracking-wider">
        Certifications
      </h2>
      <div className="w-[100px] h-[3px] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-16" />

      <div className="w-full max-w-6xl px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certData.map((cert) => (
          <CertCard
            key={cert.id}
            id={cert.id}
            name={cert.name}
            issuer={cert.issuer}
            date={cert.date}
            credentialId={cert.credentialId}
            icon={cert.icon}
            verifyLink={cert.verifyLink}
          />
        ))}
      </div>
    </section>
  );
};
