export interface Job {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface LinkedInProfile {
  name: string;
  headline: string;
  about: string;
  location: string;
  experience: Job[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}