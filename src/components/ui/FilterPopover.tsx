import { Filter } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Popover } from "./Popover";
import { useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterPopoverProps {
  onFilterChange: (filter: "all" | "completed" | "pending") => void;
  currentFilter: "all" | "completed" | "pending";
}

const options = [
  { value: "all", label: "All Tasks" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
] as const;

export default function FilterPopover({
  onFilterChange,
  currentFilter,
}: FilterPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();

  const handleFilterChange = useCallback(
    (value: "all" | "completed" | "pending") => {
      onFilterChange(value);

      setSearchParams({ status: value });

      const clickEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      document.dispatchEvent(clickEvent);
    },
    [onFilterChange, setSearchParams]
  );

  return (
    <div ref={popoverRef}>
      <Popover
        trigger={
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Filter size={18} className="text-gray-500" />
          </button>
        }
      >
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option.value}
              className={twMerge(
                "w-full px-3 py-1.5 text-sm text-left",
                currentFilter === option.value
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 text-gray-600"
              )}
              onClick={() => handleFilterChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Popover>
    </div>
  );
}
