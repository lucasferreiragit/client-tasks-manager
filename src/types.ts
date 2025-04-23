export interface Task {
  id: string;
  title: string;
  description?: string;
  expirationDate?: Date;
  assignee?: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
