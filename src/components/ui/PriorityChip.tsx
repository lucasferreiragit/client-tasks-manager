import {
  PRIORITY_OPTIONS,
  PRIORITY_COLORS,
} from "../../constants/taskConstants";
import { twMerge } from "tailwind-merge";

type PriorityChipProps = {
  priority: string;
  className?: string;
  alwaysShowLabel?: boolean;
};

export function PriorityChip({
  priority,
  className = "",
  alwaysShowLabel = false,
}: PriorityChipProps) {
  const priorityLabel =
    PRIORITY_OPTIONS[priority as keyof typeof PRIORITY_OPTIONS] || "None";

  const colors =
    PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] ||
    PRIORITY_COLORS["4"];

  return (
    <div
      className={twMerge("flex justify-center items-center gap-1.5", className)}
    >
      {!alwaysShowLabel && (
        <div
          className="sm:hidden w-4 h-4 rounded-full"
          style={{ backgroundColor: colors.bg }}
        />
      )}

      <span
        className={twMerge(
          "text-xs font-medium px-2 py-1 rounded-full",
          alwaysShowLabel ? "" : "hidden sm:inline"
        )}
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
        }}
      >
        {priorityLabel}
      </span>
    </div>
  );
}
