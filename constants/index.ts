import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { basePath } from "@/lib/basePath";

export const SKILL_DATA = [
  {
    skill_name: "TCP/IP",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "DNS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "DHCP",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "VLANs",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Routing",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Switching",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "LAN/WAN",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "VPN",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Cisco CLI",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const SOCIALS = [
  {
    name: "Github",
    icon: RxGithubLogo,
    link: "https://github.com/Aaron-2705",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/dhwanit-sukhadiya",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "Windows 10/11",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Windows Server 2022",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Linux",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Kali Linux",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Active Directory",
    image: "mui.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Wireshark",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Nmap",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Burp Suite",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Metasploit",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "Vulnerability Assessment",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "OSINT",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "Python",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "SQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Cisco Packet Tracer",
    image: "go.png",
    width: 60,
    height: 60,
  },
  {
    skill_name: "VirtualBox",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Microsoft Office",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const PROJECTS = [
  {
    title: "Cybersecurity Home Lab",
    description:
      "Built a virtualized enterprise lab for security testing and network troubleshooting with Kali Linux and Windows Server.",
    image: `${basePath}/projects/project-1.png`,
    link: "https://github.com/Aaron-2705",
  },
  {
    title: "Active Directory Enterprise Lab",
    description:
      "Deployed a domain environment with users, groups, OUs, Group Policy, DNS, and DHCP for enterprise-style management.",
    image: `${basePath}/projects/project-2.png`,
    link: "https://github.com/Aaron-2705",
  },
  {
    title: "Network Monitoring & Troubleshooting Lab",
    description:
      "Designed and troubleshot a multi-VLAN enterprise network simulation with structured connectivity diagnostics.",
    image: `${basePath}/projects/project-3.png`,
    link: "https://github.com/Aaron-2705",
  },
  {
    title: "Secure E-Commerce Website",
    description:
      "Developed a secure web app with authentication, session controls, input validation, and protections against XSS/SQLi.",
    image: `${basePath}/projects/project-1.png`,
    link: "https://github.com/Aaron-2705",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/Aaron-2705",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/dhwanit-sukhadiya",
      },
    ],
  },
  {
    title: "Contact",
    data: [
      {
        name: "Email",
        icon: null,
        link: "mailto:dhwanitsukhadiya685@gmail.com",
      },
      {
        name: "Phone",
        icon: null,
        link: "tel:+19162023698",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Download Resume",
        icon: null,
        link: `${basePath}/resume/dhwanit-sukhadiya-resume.txt`,
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:dhwanitsukhadiya685@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/Aaron-2705",
};
