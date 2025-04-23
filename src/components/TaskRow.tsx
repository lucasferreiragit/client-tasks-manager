import { Task } from "../types";

export default function TaskRow({ task }: { task: Task }) {
  return (
    <div className=" flex border-2 border-gray-300 rounded-md p-4 justify-evenly">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{task.assignee}</p>
      <p>{task.expirationDate?.toLocaleDateString()}</p>
      <p>{task.status}</p>
      <p>{task.createdAt.toLocaleDateString()}</p>
      <p>{task.updatedAt.toLocaleDateString()}</p>
    </div>
  );
}
