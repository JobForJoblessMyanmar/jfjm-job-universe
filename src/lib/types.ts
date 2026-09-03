export type JobStatus = "pending" | "approved" | "rejected";

export type JobCard = {
  id: string;
  userId: string;
  title: string;
  companyName: string;
  gender: string | null;
  headcount: string | null;
  industry: string | null;
  location: string;
  salary: string | null;
  requirements: string | null;
  extra: string | null;
  address: string | null;
  phone: string | null;
  viber: string | null;
  email: string | null;
  status: JobStatus;
  pinned: boolean;
  featured: boolean;
  highlight: boolean;
  effectBg: string | null;
  effectFrame: string | null;
  effectTitle: string | null;
  likes: number;
  commentsCount: number;
  createdAt: string;
  liked: boolean;
  saved: boolean;
  applied: boolean;
};

export type Profile = {
  userId: string;
  displayName: string;
  isAdmin: boolean;
  isEmployer: boolean;
  companyName: string | null;
  phone: string | null;
  viber: string | null;
  email: string | null;
  cvName: string | null;
  headline: string | null;
  township: string | null;
  diamonds: number;
};

export type JobComment = {
  id: number;
  jobId: string;
  authorName: string;
  body: string;
  createdAt: string;
  mine: boolean;
};

export type TopupRequest = {
  id: number;
  userId: string;
  displayName: string;
  diamonds: number;
  mmk: number;
  note: string | null;
  status: string;
  createdAt: string;
};
