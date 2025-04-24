import { twMerge } from "tailwind-merge";
import { Clock, CheckCircle2 } from "lucide-react";

interface StatusChipProps {
  completed: boolean;
  className?: string;
}

export function StatusChip({ completed, className = "" }: StatusChipProps) {
  const status = completed ? "Completed" : "Pending";

  const bgColor = completed ? "#F0FDF4" : "#F3F4F6";
  const textColor = completed ? "#15803D" : "#4B5563";

  return (
    <span
      className={twMerge(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        className
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {completed ? (
        <CheckCircle2 className="w-3 h-3 mr-1" />
      ) : (
        <Clock className="w-3 h-3 mr-1" />
      )}
      {status}
    </span>
  );
}
