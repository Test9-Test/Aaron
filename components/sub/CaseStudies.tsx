"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowRight, Shield, Layers, Award, Terminal, CheckCircle2, TrendingUp } from "lucide-react";

interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  research: string;
  planning: string;
  implementation: string;
  security: string;
  performance: string;
  lessons: string;
  metrics: { label: string; value: string }[];
}

export const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState("ad-hardening");

  const caseStudies: CaseStudyData[] = [
    {
      id: "ad-hardening",
      title: "Hardening Active Directory",
      subtitle: "Securing corporate user domain namespaces using Group Policies",
      problem: "In many internal networks, insecure default Windows configurations leave Active Directory systems vulnerable to credential harvesting, unauthorized inter-VLAN pivoting, and weak authentication bypasses.",
      research: "Investigated typical penetration vectors like LLMNR/NBT-NS poisoning, Kerberoasting vulnerabilities, and weak password structures that threat actors exploit to gain system administrator permissions.",
      planning: "Designed a multi-OU active directory tree partitioning users by business roles (HR, IT, Sales) with strict least-privilege assignments and GPO enforcement configurations.",
      implementation: "Deployed Windows Server 2022 domain controller. Drafted domain rules, built primary and secondary DNS targets, configured automated network drive shares, and restricted client logins using specific computer target limits.",
      security: "Enforced strict security protocols: disabled NTLMv1, turned off LLMNR/NetBIOS broadcast networks, applied standard password length requirements (14 character minimum), and set lockout rules after 5 failed authentication attempts.",
      performance: "Domain authentication latency remained under 12ms. GPO update push intervals averaged 45 seconds across all Windows 11 client endpoints.",
      lessons: "Learned the value of detailed DNS configuration; mismatched client DNS resolvers are the primary cause of domain controller replication drops and login lag issues.",
      metrics: [
        { label: "Authentication Latency", value: "<12ms" },
        { label: "Policy Synchronization", value: "100%" },
        { label: "Vulnerability Reduction", value: "85%" },
      ],
    },
    {
      id: "siem-logging",
      title: "SIEM Home Lab Monitoring",
      subtitle: "Aggregating network threat logs from internal pfSense zoning",
      problem: "Without real-time intrusion monitoring, network admins remain blind to active vulnerability scanners, port mappings, and password spraying attacks targeting internal routers and edge assets.",
      research: "Studied centralized logging methods like Syslog-ng and Elasticsearch stacks, analyzing how raw network packet files (PCAP) translate into searchable syslog lines.",
      planning: "Planned a virtual zoning layout placing Kali Linux in a testing LAN, pfSense firewall at the perimeter gateway, and Ubuntu Server in a protected SIEM DMZ segment.",
      implementation: "Created virtual host-only interfaces in VirtualBox. Set up pfSense firewall filtering parameters, and established syslog-ng daemons listening on UDP 514 inside the SIEM server.",
      security: "Implemented pfSense snort scanning alerts, configured firewall rulesets to drop all unsolicited traffic from testing subnets, and enabled logging on all drop instructions.",
      performance: "Syslog-ng ingested and structured 250+ events per second without dropping packets, maintaining low CPU loads (<5%) on the monitoring host.",
      lessons: "Gained hands-on experience using Wireshark to isolate packet headers. Discovered that filtering logs at the firewall level is critical to avoid SIEM server overflow.",
      metrics: [
        { label: "Event Ingestion Speed", value: "250/sec" },
        { label: "False Positive Rate", value: "<2.4%" },
        { label: "Threat Detection Time", value: "Instant" },
      ],
    },
  ];

  const currentStudy = caseStudies.find((c) => c.id === activeTab)!;

  return (
    <section id="case-studies" className="relative w-full py-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute left-0 bottom-0 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <h2 className="text-[40px] font-bold text-center text-white mb-2 tracking-wider">
        Case Studies
      </h2>
      <div className="w-[100px] h-[3px] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-16" />

      <div className="w-full max-w-6xl px-10 flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar Tabs */}
        <div className="w-full lg:w-1/4 flex lg:flex-col gap-4">
          {caseStudies.map((study) => (
            <button
              key={study.id}
              onClick={() => setActiveTab(study.id)}
              className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-all duration-300 outline-none ${
                activeTab === study.id
                  ? "bg-[#7042f815] border-[#7042f88b] text-cyan-400 shadow-[0_0_15px_rgba(112,66,248,0.15)]"
                  : "bg-transparent border-[#7042f822] text-gray-400 hover:text-white hover:border-[#7042f844]"
              }`}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm tracking-wide">{study.title}</div>
                <div className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">{study.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Report Layout */}
        <div className="flex-1 border border-[#7042f833] bg-[#030014aa] backdrop-blur-md rounded-xl p-6 lg:p-8 shadow-xl relative min-h-[500px]">
          {/* Neon Grid decor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none rounded-xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStudy.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#7042f822] pb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {currentStudy.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-widest font-semibold">
                    {currentStudy.subtitle}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="flex gap-4">
                  {currentStudy.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-950/60 border border-[#7042f822] px-3 py-1.5 rounded text-center min-w-[90px]">
                      <div className="text-[10px] text-gray-500 uppercase font-mono font-bold">{m.label}</div>
                      <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid content sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Shield className="w-4 h-4" />
                      <span>1. The Problem</span>
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {currentStudy.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-[#b49bff] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      <span>2. Research & Discovery</span>
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {currentStudy.research}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" />
                      <span>3. Planning Phase</span>
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {currentStudy.planning}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>4. Deployment & Implementation</span>
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {currentStudy.implementation}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      <span>5. Security Auditing Controls</span>
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {currentStudy.security}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>6. Performance Evaluation</span>
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {currentStudy.performance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lessons learned block */}
              <div className="border-t border-[#7042f822] pt-4 mt-6 bg-slate-950/40 p-4 rounded border border-slate-900">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
                  💡 Key Lessons Learned & Future Scope
                </h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {currentStudy.lessons}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
