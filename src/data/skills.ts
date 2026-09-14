import { SkillCategory } from '../types/portfolio';

export const skillsData: SkillCategory[] = [
  {
    title: "BUSINESS ANALYTICS & REPORTING",
    categoryKey: "analytics",
    subtitle: "KPI frameworks, business reporting, funnel analysis & operational problem solving",
    skills: [
      { name: "KPI Tracking & Frameworks", proficiency: "ADVANCED", highlight: true, description: "Defining business KPIs, metric hierarchies, reporting logic, and performance frameworks." },
      { name: "Business Intelligence & Dashboarding", proficiency: "ADVANCED", highlight: true, description: "Building decision-focused dashboards and KPI scorecards using Power BI and Zoho Analytics." },
      { name: "Funnel & Retention Analysis", proficiency: "ADVANCED", highlight: true, description: "Analyzing conversion funnels, cohorts, retention patterns, and customer journeys." },
      { name: "Root Cause Analysis (5-Why)", proficiency: "ADVANCED", highlight: true, description: "Diagnosing product and operational bottlenecks through structured root-cause analysis." },
      { name: "Process Optimization & Agile Workflow", proficiency: "WORKING", highlight: false, description: "Translating analytical findings into process improvements, prioritization, and actionable workflows." }
    ]
  },
  {
    title: "DATA ANALYTICS & PROGRAMMING",
    categoryKey: "product-analytics",
    subtitle: "SQL, analytical workflows, event data & exploratory analysis",
    skills: [
      { name: "SQL & GoogleSQL", proficiency: "ADVANCED", highlight: true, description: "CTEs, joins, window functions, aggregations, cohort analysis, RFM, and business KPI calculations." },
      { name: "Google BigQuery", proficiency: "WORKING", highlight: true, description: "Analytical querying, event-data exploration, cohort analysis, and business data workflows." },
      { name: "Google Analytics 4 (GA4)", proficiency: "WORKING", highlight: true, description: "Event analysis, funnel exploration, acquisition, user behaviour, and e-commerce analytics." },
      { name: "Data Validation & QA Testing", proficiency: "WORKING", highlight: true, description: "Duplicate checks, null validation, schema checks, funnel consistency, and analytical QA." },
      { name: "Exploratory Data Analysis (EDA)", proficiency: "WORKING", highlight: true, description: "Data cleaning, distribution analysis, anomaly detection, segmentation, and trend analysis." },
      { name: "Python", proficiency: "FOUNDATIONAL", highlight: false, description: "Basic data manipulation, analysis, and introductory modeling workflows using Pandas, NumPy, and scikit-learn." }
    ]
  },
  {
    title: "TOOLS & TECHNOLOGIES",
    categoryKey: "visualization",
    subtitle: "BI platforms, query engines, productivity tools & collaboration",
    skills: [
      { name: "Google BigQuery & MySQL", proficiency: "WORKING", highlight: true, description: "Relational querying, analytical SQL, joins, aggregation, and dimensional analysis." },
      { name: "Power BI & DAX", proficiency: "ADVANCED", highlight: true, description: "Interactive dashboards, KPI scorecards, calculated measures, geospatial analysis, and analytical storytelling." },
      { name: "Zoho Analytics", proficiency: "WORKING", highlight: false, description: "Interactive dashboards, reporting, operational slicing, and business intelligence analysis." },
      { name: "Advanced Microsoft Excel", proficiency: "ADVANCED", highlight: true, description: "PivotTables, XLOOKUP, analytical models, scenario analysis, and structured business reporting." },
      { name: "Git / GitHub & Jira", proficiency: "WORKING", highlight: false, description: "Version control, repository workflows, task tracking, sprint planning, and collaborative delivery." },
      { name: "Figma", proficiency: "WORKING", highlight: false, description: "Wireframing, dashboard mockups, presentation design, and basic interface planning." }
    ]
  },
  {
    title: "AI & PRODUCT BUILDING",
    categoryKey: "technology",
    subtitle: "AI-assisted application building, product interfaces & modern web workflows",
    skills: [
      { name: "React & TypeScript", proficiency: "FOUNDATIONAL", highlight: false, description: "Building and modifying interactive interfaces and reusable components through hands-on and AI-assisted development." },
      { name: "AI / LLM Integration", proficiency: "WORKING", highlight: true, description: "Working with LLM APIs, structured prompts, JSON outputs, and AI-assisted application workflows." },
      { name: "Supabase & PostgreSQL", proficiency: "FOUNDATIONAL", highlight: false, description: "Working with authentication, database persistence, tables, and application data through Supabase." },
      { name: "TailwindCSS & UI Development", proficiency: "FOUNDATIONAL", highlight: false, description: "Building and refining responsive interfaces using utility-based styling and AI-assisted development workflows." }
    ]
  }
];
