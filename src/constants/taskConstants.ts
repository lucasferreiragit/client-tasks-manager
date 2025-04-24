export const PRIORITY_OPTIONS = {
  "0": "Critical",
  "1": "High",
  "2": "Medium",
  "3": "Low",
  "4": "None",
} as const;

export const PRIORITY_COLORS = {
  "0": {
    bg: "#DC2626",
    text: "#FFFFFF",
  },
  "1": {
    bg: "#DB2777",
    text: "#FFFFFF",
  },
  "2": {
    bg: "#CA8A04",
    text: "#FFFFFF",
  },
  "3": {
    bg: "#0D9488",
    text: "#FFFFFF",
  },
  "4": {
    bg: "#16A34A",
    text: "#FFFFFF",
  },
  P5: {
    bg: "#2563EB",
    text: "#FFFFFF",
  },
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

export const DEFAULT_TASK_FORM_VALUES = {
  title: "",
  description: "",
  priority: "4", // Default to "None"
  completed: false,
} as const;

export const TASK_HEADERS = [
  "Task",
  "Description",
  "Priority",
  "Status",
  "Created At",
];
