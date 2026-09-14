import { Profile } from '../types/portfolio';

const email = "ayushgudu04@gmail.com";
const phone = "+91-9337753561";
const cleanPhone = "+919337753561";
const linkedin = "https://www.linkedin.com/in/ayush-kumar-sahoo-33b555253/";
const github = "https://github.com/AYUSHKUMARSAHOO04";
const resumeUrl = "https://drive.google.com/file/d/18O-a2p2lBNO9f2UcqWzM8RBLZaMFRd3n/view?usp=drivesdk";

export const profileData: Profile = {
  name: "Ayush Kumar Sahoo",
  shortName: "Ayush",
  monogram: "AKS",
  role: "PRODUCT, BUSINESS & DATA ANALYTICS",
  secondaryRole: "B.Tech Graduate from NIT Rourkela",
  tagline: "Recent B.Tech graduate from NIT Rourkela with hands-on experience in Product, Business, and Data Analytics. Proficient in SQL, Google BigQuery, GA4, Power BI, Zoho Analytics, and Excel.",
  heroHeadline: ["DATA", "INTO", "DECISIONS."],
  editorialStatement: {
    primary: "I DON'T JUST LOOK AT DATA.",
    secondary: "I ASK WHAT IT MEANS.",
    description: "I specialize in analyzing large-scale datasets, building KPI frameworks and executive dashboards, performing funnel and retention analysis, validating data quality, and delivering actionable insights that support strategic business and product decisions."
  },
  location: "Rourkela, Odisha, India",
  timezone: "IST (UTC+5:30)",
  email: email,
  phone: phone,
  linkedin: linkedin,
  github: github,
  resumeUrl: resumeUrl,
  availability: {
    status: 'available',
    label: "OPEN TO ROLES",
    roles: [
      "Data Analyst",
      "Product Analyst",
      "Business Analyst",
      "Business Intelligence"
    ]
  },
  contacts: [
    {
      id: "linkedin",
      number: "01",
      label: "LINKEDIN",
      sublabel: "Connect professionally and discuss relevant opportunities.",
      href: linkedin,
      type: "external",
      icon: "Linkedin",
      hoverBadge: "PROFESSIONAL NETWORK",
      detail: "in/ayush-kumar-sahoo-33b555253"
    },
    {
      id: "github",
      number: "02",
      label: "GITHUB",
      sublabel: "Explore my SQL, analytics, BI, and product projects.",
      href: github,
      type: "external",
      icon: "Github",
      hoverBadge: "PROJECTS & CODE",
      detail: "github.com/AYUSHKUMARSAHOO04"
    },
    {
      id: "email",
      number: "03",
      label: "EMAIL",
      sublabel: "Reach out for opportunities, collaboration, or a conversation.",
      href: `mailto:${email}`,
      type: "email",
      icon: "Mail",
      hoverBadge: "DIRECT INBOX",
      detail: email
    },
    {
      id: "phone",
      number: "04",
      label: "PHONE",
      sublabel: "Available for a direct conversation about relevant opportunities.",
      href: `tel:${cleanPhone}`,
      type: "phone",
      icon: "Phone",
      hoverBadge: "QUICK CONVERSATION",
      detail: phone
    }
  ],
  stats: [
    {
      label: "ALMA MATER",
      value: "NIT Rourkela",
      subtext: "B.Tech, Batch of 2026"
    },
    {
      label: "DATA SCALE",
      value: "4.3M+ Events",
      subtext: "GA4 BigQuery & SQL telemetry analyzed"
    },
    {
      label: "CORE STACK",
      value: "BigQuery · SQL · BI",
      subtext: "Power BI, GA4, Zoho Analytics & Excel"
    },
    {
      label: "LEADERSHIP",
      value: "Team Captain",
      subtext: "Institute Swimming Team (All India Level)"
    }
  ]
};
