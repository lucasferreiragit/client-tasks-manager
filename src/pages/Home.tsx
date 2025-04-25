import { Task } from "../types";
import { useTasks } from "../hooks/useTasks";
import { TasksListSkeleton } from "../components/ui/TaskSkeleton";
import ErrorTemplate from "../components/ui/ErrorTemplate";
import TasksBoard from "../components/TasksBoard";

export default function Home() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <TasksListSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <ErrorTemplate message="Failed to load tasks" className="my-4" />
      </div>
    );
  }

  return <TasksBoard tasks={tasks as Task[]} />;
}
