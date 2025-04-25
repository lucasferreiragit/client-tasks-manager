import { Filter, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Popover } from "./Popover";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PRIORITY_OPTIONS } from "../../constants/taskConstants";

interface FilterPopoverProps {
  onFilterChange: (filter: "all" | "completed" | "pending") => void;
  currentFilter: "all" | "completed" | "pending";
  currentPriority: string[];
}

const statusOptions = [
  { value: "all", label: "All Tasks" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
] as const;

const priorityOptions = Object.entries(PRIORITY_OPTIONS).map(
  ([value, label]) => ({
    value,
    label,
  })
);
const Badge = ({ label }: { label: string }) => {
  return (
    <span
      className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center
    
    "
    >
      {label}
    </span>
  );
};

export default function FilterPopover({
  onFilterChange,
  currentFilter,
  currentPriority,
}: FilterPopoverProps) {
  const [, setSearchParams] = useSearchParams();

  const selectedPrioritiesLabels = useMemo(
    () =>
      currentPriority
        .map((p) => PRIORITY_OPTIONS[p as keyof typeof PRIORITY_OPTIONS])
        .join(", "),
    [currentPriority]
  );

  const updateSearchParams = useCallback(
    (updates: { status?: string; priority?: string | null }) => {
      setSearchParams((params) => {
        if (updates.status !== undefined) {
          params.set("status", updates.status);
        }

        if (updates.priority === null) {
          params.delete("priority");
        } else if (updates.priority !== undefined) {
          params.set("priority", updates.priority);
        }

        return params;
      });
    },
    [setSearchParams]
  );

  const handleFilterChange = useCallback(
    (value: "all" | "completed" | "pending") => {
      onFilterChange(value);
      updateSearchParams({ status: value });
      closePopover();
    },
    [onFilterChange, updateSearchParams]
  );

  const handlePriorityChange = useCallback(
    (value: string) => {
      const newPriorities = currentPriority.includes(value)
        ? currentPriority.filter((p) => p !== value)
        : [...currentPriority, value];

      updateSearchParams({
        priority: newPriorities.length > 0 ? newPriorities.join(",") : null,
      });
      closePopover();
    },
    [currentPriority, updateSearchParams]
  );

  const handleClearPriorities = useCallback(() => {
    updateSearchParams({ priority: null });
  }, [updateSearchParams]);

  const closePopover = useCallback(() => {
    const clickEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    document.dispatchEvent(clickEvent);
  }, []);

  return (
    <Popover
      trigger={
        <button className="p-1.5 hover:bg-gray-100 rounded relative">
          <Filter size={18} className="text-gray-500" />
          {currentPriority.length > 0 && (
            <Badge label={currentPriority.length.toString()} />
          )}
        </button>
      }
    >
      <div className="py-1">
        <div className="px-3 py-2 text-xs font-semibold text-gray-500">
          Status
        </div>
        {statusOptions.map((option) => (
          <button
            key={option.value}
            className={twMerge(
              "w-full px-3 py-1.5 text-sm text-left",
              currentFilter === option.value
                ? "bg-sky-50 font-semibold"
                : "hover:bg-gray-50 text-gray-600"
            )}
            onClick={() => handleFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
        <div className="h-px my-1 bg-gray-100" />
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500">Priority</span>
          {currentPriority.length > 0 && (
            <button
              onClick={handleClearPriorities}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X size={12} />
              Clear all
            </button>
          )}
        </div>
        {priorityOptions.map((option) => (
          <button
            key={option.value}
            className={twMerge(
              "w-full px-3 py-1.5 text-sm text-left flex items-center gap-2",
              currentPriority.includes(option.value)
                ? "bg-sky-50 font-semibold"
                : "hover:bg-gray-50 text-gray-600"
            )}
            onClick={() => handlePriorityChange(option.value)}
          >
            <span
              className={twMerge(
                "w-2 h-2 rounded-full",
                currentPriority.includes(option.value)
                  ? "bg-sky-500"
                  : "bg-gray-300"
              )}
            />
            {option.label}
          </button>
        ))}
      </div>
    </Popover>
  );
}
