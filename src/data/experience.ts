import { ExperienceItem } from '../types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: "pearthoughts-pm-intern",
    period: "Jun 2025 - Jul 2025",
    startDate: "2025-06",
    endDate: "2025-07",
    current: false,
    role: "PROJECT MANAGEMENT INTERN",
    company: "PearThoughts",
    location: "Remote",
    type: "Full-time",
    description: "Supported cross-functional Agile teams by tracking delivery velocity, diagnosing process bottlenecks, and aligning execution metrics with overarching business objectives.",
    responsibilities: [
      "Monitored Agile sprint execution, delivery metrics, and workflow performance to identify process bottlenecks and improve alignment between execution and business requirements.",
      "Applied 5-Why root-cause analysis and stakeholder coordination to diagnose process issues, improve requirement clarity, and support process optimization.",
      "Facilitated sprint retrospectives, coordinated quantitative workflow performance measures, and supported project planning and product execution."
    ],
    tools: ["Jira", "Agile Sprints", "Root Cause Analysis (5-Why)", "Process Optimization", "Delivery Metrics"]
  },
  {
    id: "innovations-data-analytics-intern",
    period: "Jan 2025 - Feb 2025",
    startDate: "2025-01",
    endDate: "2025-02",
    current: false,
    role: "DATA ANALYTICS INTERN",
    company: "Innovations Research Lab",
    location: "Remote",
    type: "Full-time",
    description: "Performed exploratory data analysis and built dynamic executive KPI dashboards to uncover actionable trends and support data-driven decision-making.",
    responsibilities: [
      "Performed exploratory data analysis (EDA) using Excel and analytical techniques to identify business trends, uncover actionable insights, and support data-driven decision-making.",
      "Developed dynamic executive KPI dashboards to communicate business performance and improve visibility into analytical metrics.",
      "Applied structured problem-solving and Python workflows for data cleaning, analysis, visualization, and business reporting."
    ],
    tools: ["Excel", "Python", "Exploratory Data Analysis (EDA)", "KPI Dashboards", "Data Cleaning", "Business Reporting"]
  }
];
