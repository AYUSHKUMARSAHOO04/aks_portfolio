export interface ContactChannel {
  id: 'linkedin' | 'github' | 'email' | 'phone';
  number: string;
  label: string;
  sublabel: string;
  href: string;
  type: 'external' | 'email' | 'phone';
  icon: string;
  hoverBadge: string;
  detail: string;
}

export interface Profile {
  name: string;
  shortName: string;
  monogram: string;
  role: string;
  secondaryRole: string;
  tagline: string;
  heroHeadline: string[];
  editorialStatement: {
    primary: string;
    secondary: string;
    description: string;
  };
  location: string;
  timezone: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  availability: {
    status: 'available' | 'busy' | 'selective';
    label: string;
    roles: string[];
  };
  contacts: ContactChannel[];
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export type ProjectCategory = 
  | 'ALL'
  | 'PRODUCT ANALYTICS'
  | 'DATA ANALYTICS'
  | 'BUSINESS INTELLIGENCE'
  | 'AI & PRODUCT';

export interface MetricHighlight {
  label: string;
  value: string;
  trend?: string;
  isPositive?: boolean;
  context: string;
}

export interface SqlSnippet {
  title: string;
  query: string;
  explanation: string;
}

export interface CohortDataRow {
  cohort: string;
  users: number;
  retention: number[]; // percentage retention per month/week
}

export interface FunnelStep {
  step: string;
  users: number;
  conversionRate: number;
  dropOffRate: number;
  insight: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  tagline: string;
  shortDescription: string;
  tools: string[];
  
  // Case Study In-Depth Fields
  problem: {
    statement: string;
    context: string;
    businessImpact: string;
  };
  data: {
    sources: string[];
    volume: string;
    dimensions: string[];
  };
  approach: {
    step: string;
    description: string;
  }[];
  analysis: {
    summary: string;
    keyFindings: string[];
  };
  insights: {
    title: string;
    description: string;
    badge?: string;
  }[];
  recommendations: {
    title: string;
    action: string;
    expectedImpact: string;
  }[];

  // Visual & Technical Assets
  metrics: MetricHighlight[];
  sqlSnippets?: SqlSnippet[];
  architectureSteps?: {
    step: string;
    title: string;
    description: string;
  }[];
  cohortData?: {
    headers: string[];
    rows: CohortDataRow[];
  };
  funnelData?: FunnelStep[];
  
  thumbnail: string;
  previewGradient?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  role: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Project' | 'Apprentice' | 'Independent';
  description: string;
  responsibilities: string[];
  achievements?: string[];
  tools: string[];
  link?: string;
}

export interface EducationItem {
  id: string;
  period: string;
  institution: string;
  degree: string;
  field?: string;
  location: string;
  grade?: string;
  description: string;
  highlights?: string[];
  relevantCoursework?: string[];
}

export interface SkillCategory {
  title: string;
  categoryKey: string;
  subtitle: string;
  skills: {
    name: string;
    proficiency: 'ADVANCED' | 'WORKING' | 'FOUNDATIONAL';
    highlight?: boolean;
    description?: string;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  question: string;
  description: string;
  deliverables: string[];
  iconName: string;
}
