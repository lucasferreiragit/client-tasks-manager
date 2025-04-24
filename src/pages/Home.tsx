import { Link } from "react-router-dom";
import TasksList from "../components/TasksList";
import { Task } from "../types";
import { taskService } from "../api/taskService";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
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
