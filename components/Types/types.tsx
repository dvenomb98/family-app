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
  choosed_tasks: Task[];
  completed_tasks: [];
}

export interface Members {
  id: string;
  name: string;
  completed_tasks: CompletedTasks[];
  points: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  deadline_date: Date;
  completed_date: Date | undefined;
  status: string;
}

export interface CompletedTasks {
  member_id: string;
  member_name: string;
  task: Task;
}
