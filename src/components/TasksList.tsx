import TaskRow from "./TaskRow";
import { Task } from "../types";
import AddTaskButton from "./AddTaskButton";
import { TASK_HEADERS } from "../constants/taskConstants";
import { useState, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import FilterPopover from "./ui/FilterPopover";
import { useSearchParams } from "react-router-dom";

export default function TasksList({ tasks }: { tasks: Task[] }) {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">(
    (searchParams.get("status") as "all" | "completed" | "pending") || "all"
  );

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        return !task.completed;
      }),
    [tasks, filter]
  );

  return (
    <div className="grid w-full gap-3 py-4">
      <div className="mx-auto flex flex-grow w-[90%] bg-white items-center ">
        <div className="text-sm grid w-full rounded-md py-4 gap-8 grid-cols-5 items-center px-4">
          {TASK_HEADERS.map((header) => (
            <h2
              key={header}
              className={twMerge(
                "text-xs md:text-sm font-semibold text-gray-700 text-center"
              )}
            >
              {header}
            </h2>
          ))}
        </div>
        <div className="pr-4">
          <FilterPopover currentFilter={filter} onFilterChange={setFilter} />
        </div>
      </div>
      <ul className="w-full flex flex-col items-center gap-y-1">
        <AddTaskButton />
        {filteredTasks.map((task) => (
          <TaskRow task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}
