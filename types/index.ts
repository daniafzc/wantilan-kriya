export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  category_slug: string;
  community?: string;
  community_slug?: string;
  author: string;
  author_initial: string;
  author_role: string;
  author_location: string;
  read_time: string;
  imageColor: string;
  badge: string;
  content: string;
}

export interface Community {
  id: string;
  slug: string;
  name: string;
  members: number;
  description: string;
  moderator: string;
  color: string;
  rules: readonly string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  articleCount: string;
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  color: string;
}

export interface TeamMember {
  id: string;
  name: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface CalculatorInput {
  jenisKriya: string;
  bahanUtama: string;
  targetPasar: string;
  tingkatKerumitan: string;
  dimensi?: string;
}

export interface CalculatorResult {
  priceRangeUSD: string;
  priceRangeIDR: string;
  insights: Insight[];
}

export interface Insight {
  title: string;
  content: string;
}

export interface SubmitFormData {
  type: "story" | "question" | "";
  category: string;
  name: string;
  location: string;
  title: string;
  content: string;
}
