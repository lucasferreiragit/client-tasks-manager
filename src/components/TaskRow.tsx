import { Info, Trash } from "lucide-react";
import { Task } from "../types";
import { Link } from "react-router-dom";
import { PRIORITY_OPTIONS, TASK_STATUS } from "../constants/taskConstants";
import Dialog from "./Dialog";
import { useState } from "react";
import TaskDetailsCard from "./TaskDetailsCard";
export default function TaskRow({ task }: { task: Task }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-2 px-2 w-[90%] shadow-md rounded-md">
        <button
          className="text-gray-500 p-2 hover:bg-gray-50 transition-all duration-200 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <Info className="w-4 h-4" />
        </button>
        <div className="text-sm grid rounded-md py-4 gap-2 grid-cols-5 items-center px-4">
          <div className="flex items-center gap-2">
            <h2>{task.title}</h2>
          </div>
          <p className="text-ellipsis overflow-hidden text-nowrap">
            {task.description}
          </p>
          <p className="text-center">
            {PRIORITY_OPTIONS[task.priority as keyof typeof PRIORITY_OPTIONS]}
          </p>
          <p className="text-center">
            {task.completed ? "Completed" : "Pending"}
          </p>
          <p className="text-center">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>{" "}
        <button className="text-red-500 p-3 hover:bg-gray-50 transition-all duration-200 rounded-full">
          <Trash className="w-4 h-4" />
        </button>
      </div>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={task.title}
      >
        <TaskDetailsCard task={task} />
      </Dialog>
    </>
  );
}
