import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export default function Divider({
  className,
  orientation = "horizontal",
}: DividerProps) {
  return (
    <div
      className={twMerge(
        "bg-gray-200",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
}
