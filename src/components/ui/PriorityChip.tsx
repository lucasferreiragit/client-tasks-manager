import {
  PRIORITY_OPTIONS,
  PRIORITY_COLORS,
} from "../../constants/taskConstants";
import { twMerge } from "tailwind-merge";

interface PriorityChipProps {
  priority: string;
  className?: string;
}

export function PriorityChip({ priority, className = "" }: PriorityChipProps) {
  const priorityLabel =
    PRIORITY_OPTIONS[priority as keyof typeof PRIORITY_OPTIONS] || "None";

  const colors =
    PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] ||
    PRIORITY_COLORS["4"];

  return (
    <span
      className={twMerge(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        className
      )}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {priorityLabel}
    </span>
  );
}
