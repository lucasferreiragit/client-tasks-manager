import { Info } from "lucide-react";
import { Task } from "../types";
import Dialog from "./Dialog";
import { useState } from "react";
import TaskDetailsCard from "./TaskDetailsCard";
import { PriorityChip } from "./ui/PriorityChip";
import { StatusChip } from "./ui/StatusChip";
import { useDeleteTask } from "../hooks/useTasks";
import { toast, ToastContainer } from "react-toastify";
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
    <Info className="w-4 h-4" />
  </button>
);

const TaskContent = ({
  task,
  setOpenDetails,
}: {
  task: Task;
  setOpenDetails: (open: boolean) => void;
}) => (
  <div className="flex-1 text-xs md:text-sm grid rounded-md py-4 gap-8 grid-cols-5 items-center px-4">
    <Tooltip
      content={task.description}
      id={`task-title-${task.id}`}
      delayShow={200}
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpenDetails(true)}
      >
        <h2 className="text-ellipsis overflow-hidden text-nowrap">
          {task.title}
        </h2>
      </div>
    </Tooltip>
    <Tooltip
      content={task.description}
      id={`task-description-${task.id}`}
      delayShow={200}
    >
      <p className="text-ellipsis overflow-hidden text-nowrap ">
        {task.description}
      </p>
    </Tooltip>
    <p className="text-center">
      <PriorityChip priority={task.priority} />
    </p>
    <p className="text-center">
      <StatusChip completed={task.completed} />
    </p>
    <p className="text-end">{new Date(task.createdAt).toLocaleDateString()}</p>
  </div>
);

export default function TaskRow({ task }: TaskRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteTask, isPending } = useDeleteTask();

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

  return (
    <>
      <div
        className={twMerge(
          "flex items-center gap-2 px-2 w-[90%]  bg-slate-50/50 shadow-md rounded-md",
          isPending && "opacity-50"
        )}
      >
        <Tooltip content="View Details" id={`view-task-${task.id}`}>
          <TaskInfoButton onClick={() => setIsOpen(true)} />
        </Tooltip>
        <TaskContent task={task} setOpenDetails={setIsOpen} />
        <Tooltip content="Delete Task" id={`delete-task-${task.id}`}>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
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
