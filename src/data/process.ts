import { ProcessStep } from '../types/portfolio';

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "QUESTION",
    question: "What am I actually trying to solve?",
    description: "Every meaningful analysis begins with reframing ambiguous business symptoms into crisp, testable analytical hypotheses. I establish the business context, align on core success metrics, and define the scope before writing a single query.",
    deliverables: [
      "Hypothesis Definition Document",
      "Core Success Metric Alignment",
      "Decision Boundary Framing"
    ],
    iconName: "HelpCircle"
  },
  {
    number: "02",
    title: "DATA",
    question: "What data exists, and can I trust it?",
    description: "I identify relevant data sources across transactional logs, event clickstreams, and CRM records. I validate data integrity, handle missing values, normalize timestamps, and structure reliable tables for high-confidence analysis.",
    deliverables: [
      "Clickstream & Event Normalization",
      "Data Quality & Anomaly Audits",
      "Sanitized Dimensional Schemas"
    ],
    iconName: "Database"
  },
  {
    number: "03",
    title: "ANALYSIS",
    question: "What patterns and behaviors emerge?",
    description: "Using SQL, BigQuery, and analytical modeling, I segment populations, compute longitudinal cohort retention matrices, map drop-off funnels, and test for statistical patterns rather than relying on intuition.",
    deliverables: [
      "Behavioral Cohort Matrices",
      "Multi-Stage Funnel Decomposition",
      "Statistical Hypothesis Testing"
    ],
    iconName: "Activity"
  },
  {
    number: "04",
    title: "INSIGHT",
    question: "What actually matters for the business?",
    description: "Raw numbers are not insights. I isolate the root causes behind metric fluctuations, distinguishing transient noise from genuine behavioral shifts and identifying high-leverage product bottlenecks.",
    deliverables: [
      "Root Cause Attribution",
      "Executive Signal Synthesis",
      "Behavioral Anomaly Breakdowns"
    ],
    iconName: "Lightbulb"
  },
  {
    number: "05",
    title: "ACTION",
    question: "What specific decisions should happen next?",
    description: "An analysis without recommendations is incomplete. I translate findings into prioritized, executable product and business interventions with expected impact, risk factors, and measurement plans.",
    deliverables: [
      "Prioritized Product Recommendations",
      "Projected Business Impact",
      "Measurement Guardrails"
    ],
    iconName: "TrendingUp"
  }
];
