import TasksList from "../components/TasksList";
import { Task } from "../types";
import { taskService } from "../api/taskService";
import { useQuery } from "@tanstack/react-query";
import { taskKeys } from "../hooks/useTasks";

export default function Home() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: taskKeys.lists(),
    queryFn: () => taskService.getTasks(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <TasksList tasks={tasks as Task[]} />
    </div>
  );
}
