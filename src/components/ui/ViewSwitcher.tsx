import { List, Grid } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ViewSwitcherProps {
  currentView: "list" | "grid";
  onViewChange: (view: "list" | "grid") => void;
  className?: string;
}

export default function ViewSwitcher({
  currentView,
  onViewChange,
  className = "",
}: ViewSwitcherProps) {
  return (
    <div className={twMerge("flex items-center gap-4", className)}>
      <button
        onClick={() => onViewChange("list")}
        className={twMerge(
          "p-1 rounded-md transition-colors",
          currentView === "list"
            ? " text-gray-900 bg-white"
            : "text-gray-500 hover:bg-gray-50"
        )}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange("grid")}
        className={twMerge(
          "p-1 rounded-md transition-colors",
          currentView === "grid"
            ? " text-gray-900 bg-white"
            : "text-gray-500 hover:bg-gray-50"
        )}
        aria-label="Grid view"
      >
        <Grid className="w-5 h-5" />
      </button>
    </div>
  );
}
