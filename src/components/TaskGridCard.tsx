import { Task } from "../types";
import { twMerge } from "tailwind-merge";
import { PriorityChip } from "./ui/PriorityChip";
import { StatusChip } from "./ui/StatusChip";
import { Calendar } from "lucide-react";

export default function TaskGridCard({ task }: { task: Task }) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {task.title}
        </h3>
        <PriorityChip priority={task.priority} />
      </div>
      <p className="text-sm text-gray-600 line-clamp-3 flex-1">
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
        <StatusChip completed={task.completed} />
      </div>
    </div>
  );
}
