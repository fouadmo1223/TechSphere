
import { Article,Comment,User } from "@/generated/prisma";


export type plan = {
  name: string;
  price: string;
  features: string[]
}


export type PaginationType = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page:number;
  totalCount:number;
  totalPages:number;
}
export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension?: number;
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
}

export interface Articlee {
  id: number;
  title: string;
  views: number;
  comments: number;
}

export interface SystemStatus {
  cpu: number;
  memory: number;
  storage: number;
  uptime: string;
}

export interface Stats {
  articleCount: number;
  commentCount: number;
  userCount: number;
}
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: number;
  title: string;
  assignee: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
}
export type CommentWithUser = Comment &{user:User}
export type SingleArticle = Article & {user:User,comments:CommentWithUser[]}
export type CommentWithUserAndArticle = Comment & {
  creator: {
    username: string;
  };
  article: {
    title: string;
  };
};

export type CommentWithArticle = {
  id: number;
  body: string;
  updatedAt: Date;
  article: {
    title: string;
    creator: {
      username: string;
    };
  };
};