import { useParams } from "react-router-dom";
import { useTask } from "../hooks/useTasks";

export default function TaskDetails() {
  const { id } = useParams();
  const { data: task, isLoading } = useTask(id as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid border-2 p-4 w-1/2 mx-auto">
      <h1>Task Details {id}</h1>
      <p>{task?.title}</p>
      <p>{task?.description}</p>
      <p>{task?.priority}</p>
    </div>
  );
}
