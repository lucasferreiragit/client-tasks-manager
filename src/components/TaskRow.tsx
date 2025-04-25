import { Info } from "lucide-react";
import { Task } from "../types";
import Dialog from "./Dialog";
import { useState, useCallback } from "react";
import TaskDetailsCard from "./TaskDetailsCard";
import { PriorityChip } from "./ui/PriorityChip";
import { StatusChip } from "./ui/StatusChip";
import { useDeleteTask, useUpdateTask } from "../hooks/useTasks";
import { toast } from "react-toastify";
import Tooltip from "./ui/Tooltip";
import { twMerge } from "tailwind-merge";
import { Trash2 } from "lucide-react";

interface TaskRowProps {
  task: Task;
}

const TaskInfoButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="text-gray-500 p-2 hover:bg-gray-50 transition-all duration-200 rounded-full"
    onClick={onClick}
  >
    <Info className="w-5 h-5" />
  </button>
);

export default function TaskRow({ task }: TaskRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteTask, isPending: isDeletePending } = useDeleteTask();
  const { mutate: updateTask, isPending: isUpdatePending } = useUpdateTask();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id, {
        onSuccess: () => {
          toast.success("Task deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete task");
        },
      });
    }
  };

  const handleStatusChange = useCallback(
    (completed: boolean) => {
      updateTask(
        { ...task, completed },
        {
          onSuccess: () => {
            toast.success(
              `Task marked as ${completed ? "completed" : "pending"}`
            );
          },
          onError: () => {
            toast.error("Failed to update task status");
          },
        }
      );
    },
    [task, updateTask]
  );

  const isPending = isDeletePending || isUpdatePending;

  return (
    <>
      <div
        className={twMerge(
          "flex items-center gap-2 px-2 w-[90%] bg-slate-50/50 shadow-md rounded-md ",
          isPending && "opacity-50"
        )}
      >
        <Tooltip content="View Details" id={`view-task-${task.id}`}>
          <TaskInfoButton onClick={() => setIsOpen(true)} />
        </Tooltip>
        {/* Main content row */}
        <div className="flex-1 text-xs md:text-sm grid rounded-md py-4 gap-4 sm:gap-8 grid-cols-[100px_1fr_1fr] sm:grid-cols-5 items-center px-4 ">
          <Tooltip
            content={task.description}
            id={`task-title-${task.id}`}
            delayShow={200}
          >
            <div
              className="flex items-center gap-2 cursor-pointer min-w-[100px]"
              onClick={() => setIsOpen(true)}
            >
              <h2 className="text-ellipsis overflow-hidden text-nowrap">
                {task.title}
              </h2>
            </div>
          </Tooltip>
          <div className="hidden sm:block ">
            <Tooltip
              content={task.description}
              id={`task-description-${task.id}`}
              delayShow={200}
            >
              <p className="text-ellipsis overflow-hidden text-nowrap">
                {task.description}
              </p>
            </Tooltip>
          </div>
          <div className="text-center">
            <PriorityChip priority={task.priority} />
          </div>
          <div className="text-center sm:text-end">
            <StatusChip
              completed={task.completed ? "true" : "false"}
              onChange={handleStatusChange}
              isLoading={isUpdatePending}
            />
          </div>
          <div className="hidden sm:block text-center sm:text-end">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>

        <Tooltip content="Delete Task" id={`delete-task-${task.id}`}>
          <button
            onClick={handleDelete}
            className="hidden sm:block p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
            disabled={isPending}
          >
            <Trash2 size={16} />
          </button>
        </Tooltip>
      </div>

      <Dialog size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TaskDetailsCard task={task} />
      </Dialog>
    </>
  );
}
