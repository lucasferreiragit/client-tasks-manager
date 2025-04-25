import { twMerge } from "tailwind-merge";
import { Clock, CheckCircle2, Loader2, ChevronDown } from "lucide-react";

interface StatusChipProps {
  completed: "true" | "false";
  className?: string;
  onChange?: (completed: boolean) => void;
  isLoading?: boolean;
  readonly?: boolean;
}

export function StatusChip({
  completed,
  className = "",
  onChange,
  isLoading = false,
  readonly = false,
}: StatusChipProps) {
  const status = completed === "true" ? "Completed" : "Pending";

  const bgColor = completed ? "#F0FDF4" : "#F3F4F6";
  const textColor = completed ? "#15803D" : "#4B5563";

  const icon = isLoading ? (
    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
  ) : completed ? (
    <CheckCircle2 className="w-3 h-3 mr-1" />
  ) : (
    <Clock className="w-3 h-3 mr-1" />
  );

  if (readonly) {
    return (
      <div
        className={twMerge(
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
          className
        )}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        {icon}
        {status}
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "inline-flex gap-0.5 sm:gap-1 items-center px-1 sm:px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200 hover:opacity-80 ",
        className
      )}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {icon}
      <select
        value={String(completed)}
        onChange={(e) => onChange?.(e.target.value === "true")}
        className="appearance-none bg-transparent text-center border-none outline-none cursor-pointer"
        disabled={isLoading}
      >
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>

      <ChevronDown className="w-3 h-3" />
    </div>
  );
}
