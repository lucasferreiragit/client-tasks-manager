export const PRIORITY_OPTIONS = {
  "0": "Critical",
  "1": "High",
  "2": "Medium",
  "3": "Low",
  "4": "None",
} as const;

export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export const TASK_STATUS_OPTIONS = [
  { value: TASK_STATUS.PENDING, label: "Pending" },
  { value: TASK_STATUS.IN_PROGRESS, label: "In Progress" },
  { value: TASK_STATUS.COMPLETED, label: "Completed" },
] as const;

// Default form values
export const DEFAULT_TASK_FORM_VALUES = {
  title: "",
  description: "",
  priority: "4", // Default to "None"
  completed: false,
} as const;
