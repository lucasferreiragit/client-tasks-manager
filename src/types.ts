export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "0" | "1" | "2" | "3" | "4";
  createdAt: string;
  updatedAt: string;
}

export type Option = {
  value: string;
  label: string;
};
