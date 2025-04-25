import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Task } from "../types";

import FilterPopover from "./ui/FilterPopover";
import ViewSwitcher from "./ui/ViewSwitcher";
import TasksList from "./TasksList";
import TasksGrid from "./TasksGrid";

export default function TasksBoard({ tasks }: { tasks: Task[] }) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<"all" | "completed" | "pending">(
    (searchParams.get("status") as "all" | "completed" | "pending") || "all"
  );

  const priorities = useMemo(
    () => searchParams.get("priority")?.split(",").filter(Boolean) || [],
    [searchParams]
  );

  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((task) => {
          if (filter === "all") return true;
          if (filter === "completed") return task.completed;
          if (filter === "pending") return !task.completed;
          return true;
        })
        .filter((task) => {
          if (priorities.length === 0) return true;
          return priorities.includes(task.priority);
        }),
    [tasks, filter, priorities]
  );

  return (
    <div className="grid w-full gap-3 py-4">
      <div className="mx-auto flex flex-grow w-[90%] items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Tasks Board</h1>
        <div className="flex items-center gap-4 ">
          <ViewSwitcher currentView={view} onViewChange={setView} />
          <FilterPopover
            onFilterChange={setFilter}
            currentFilter={filter}
            currentPriority={priorities}
          />
        </div>
      </div>
      {view === "list" ? (
        <TasksList tasks={filteredTasks} />
      ) : (
        <TasksGrid tasks={filteredTasks} />
      )}
    </div>
  );
}
