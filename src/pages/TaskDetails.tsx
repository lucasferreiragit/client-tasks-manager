import { useParams } from "react-router-dom";
import tasks from "../mockupTasks";

export default function TaskDetails({}) {
  const { id } = useParams();

  if (!id) {
    return <h1>Task not found</h1>;
  }

  return <h1>Task Details {id}</h1>;
}
