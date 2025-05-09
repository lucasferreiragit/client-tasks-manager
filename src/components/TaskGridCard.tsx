import { Task } from "../types";

import { PriorityChip } from "./ui/PriorityChip";
import { StatusChip } from "./ui/StatusChip";
import { Calendar } from "lucide-react";
import { useState } from "react";
import Dialog from "./Dialog";
import TaskDetailsCard from "./TaskDetailsCard";
import { useUpdateTask } from "../hooks/useTasks";
import { toast } from "react-toastify";

export default function TaskGridCard({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateTask, isPending: isUpdatePending } = useUpdateTask();

  const handleStatusChange = (completed: boolean) => {
    updateTask(
      { ...task, completed },
      {
        onSuccess: () => {
          toast.success("Task status updated successfully");
        },
        onError: () => {
          toast.error("Failed to update task status");
        },
      }
    );
  };

  return (
    <>
      <div
        className="flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 cursor-pointer">
            {task.title}
          </h3>
          <div onClick={(e) => e.stopPropagation()}>
            <StatusChip
              completed={task.completed ? "true" : "false"}
              onChange={handleStatusChange}
              isLoading={isUpdatePending}
            />
          </div>
        </div>
        <p
          className="text-sm text-gray-600 line-clamp-3 flex-1 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {task.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
          <PriorityChip priority={task.priority} alwaysShowLabel />
        </div>
      </div>

      <Dialog size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TaskDetailsCard task={task} />
      </Dialog>
    </>
  );
}
