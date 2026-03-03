// User Types
export type UserType = 'founder' | 'investor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  type: UserType;
  picture?: string;
  googleId?: string;
  provider?: 'google' | 'email';
  createdAt: string;
  profile?: FounderProfile;
}

export interface FounderProfile {
  companyName?: string;
  website?: string;
  description?: string;
  stage?: string;
  sector?: string;
  monthlyRevenue?: string;
  momGrowth?: string;
  customers?: string;
  teamSize?: string;
  raisingAmount?: string;
  roundType?: string;
  useOfFunds?: string;
  sectors?: string[];
  geo?: string;
  onboarded?: boolean;
}

// Opportunity Types
export type OpportunityType = 'Accelerator' | 'Government Grant' | 'VC / Angel' | 'Foundation' | 'Competition' | 'Fellowship' | 'Loan / Revenue Share';
export type OpportunityStage = 'Pre-seed' | 'Seed' | 'Series A' | 'Series B+' | 'Any';
export type Geography = 'Global' | 'USA' | 'Europe' | 'UK' | 'Asia' | 'Africa' | 'Latin America' | 'Middle East';
export type OpportunityStatus = 'active' | 'closed' | 'closing-soon';

export interface EligibilityCriterion {
  ok: boolean;
  text: string;
}

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export interface Opportunity {
  id: string | number;
  logo: string;
  name: string;
  org: string;
  type: OpportunityType | string;
  stage: OpportunityStage[] | string[];
  geo: Geography | string;
  amount: string;
  deadline: string;
  urgent?: boolean;
  status: OpportunityStatus | string;
  verified: string;
  matchScore: number;
  communityRating?: number;
  reviewCount?: number;
  tags: string[];
  desc: string;
  fullDesc?: string;
  eligibility?: EligibilityCriterion[];
  reviews?: Review[];
  isNew?: boolean;
  applyUrl?: string;
  views?: number;
}

// Submission Types (Investor)
export type SubmissionStatus = 'pending' | 'live' | 'rejected' | 'flagged';

export interface Submission {
  id: string;
  userId: string;
  name: string;
  org: string;
  type: string;
  geo: string;
  amount: string;
  deadline: string;
  url: string;
  desc: string;
  fullDesc?: string;
  stage: string[];
  eligibility?: EligibilityCriterion[];
  tags?: string[];
  contact?: string;
  website?: string;
  status: SubmissionStatus;
  views: number;
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectReason?: string;
}

// Tracker Types
export type TrackerStatus = 'saved' | 'inprogress' | 'submitted' | 'decision';

export interface TrackerItem {
  oppId: string | number;
  name: string;
  org: string;
  amount: string;
  deadline: string;
  matchScore: number;
  logo: string;
  status: TrackerStatus;
  note?: string;
  addedAt: string;
}

// Activity Log
export interface ActivityItem {
  icon: string;
  text: string;
  type: 'green' | 'red' | 'gold' | 'blue';
  time: string;
}

// View Types
export type ViewName = 'landing' | 'directory' | 'detail' | 'profile' | 'tracker' | 'investor' | 'admin';

// Admin Panel Types
export type AdminPanel = 'overview' | 'queue' | 'live' | 'flagged' | 'rejected' | 'users' | 'activity';

// Onboarding
export interface OnboardingSelections {
  sector: string[];
  stage: string[];
  geo: string[];
}
