import { Link } from "react-router-dom";
import TaskRow from "./TaskRow";
import { Task } from "../types";

export default function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid w-full gap-4">
      <h1 className="text-2xl font-bold">Tasks List</h1>
      <ul>
        {tasks.map((task) => (
          <Link to={`/task/${task.id}`} key={task.id}>
            <TaskRow task={task} />
          </Link>
        ))}
      </ul>
    </div>
  );
}
