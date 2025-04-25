import { AlertTriangle } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ErrorTemplateProps {
  message: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function ErrorTemplate({
  message,
  className = "",
  icon = <AlertTriangle className="w-6 h-6 text-red-500" />,
}: ErrorTemplateProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center gap-4 p-8 rounded-lg bg-red-50",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-medium text-red-800">Error</h3>
      </div>
      <p className="text-sm text-red-600 text-center">{message}</p>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <ErrorTemplate
      message={error.message || "Something went wrong"}
      className="min-h-[200px]"
    />
  );
}
