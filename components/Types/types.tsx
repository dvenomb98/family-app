import { Difficulty } from './enums';

export interface LoginProps {
  password: string;
  email: string;
}

export interface RegisterProps {
  password: string;
  email: string;
  name: string;
}

export interface UserAccount {
  name: string;
  email: string;
  members: Members[];
  tasks: Task[];
  img: string;
}

export interface Members {
  id: string;
  name: string;
  points: number;
  img: string;
  completed_tasks: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  deadline_date: string;
  completed_date: string;
  assigned_to: string;
  status: string;
}

export interface CompletedTasks {
  member_id: string;
  member_name: string;
  task: Task;
}
