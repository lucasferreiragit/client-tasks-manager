import { PRIORITY_OPTIONS } from "../constants/taskConstants";

export function getPriorityByValue(value: string): string {
  return PRIORITY_OPTIONS[value as keyof typeof PRIORITY_OPTIONS] || "None";
}
