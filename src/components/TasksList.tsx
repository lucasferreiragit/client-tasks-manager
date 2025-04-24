import TaskRow from "./TaskRow";
import { Task } from "../types";
import AddTaskButton from "./AddTaskButton";

const TASK_HEADERS = [
  "Task",
  "Description",
  "Priority",
  "Completed",
  "Created At",
];

export default function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid w-full gap-3 ">
      <h1 className="text-2xl font-bold">Tasks List</h1>
      {/* header */}
      <div className="w-full border-2 p-4 grid grid-cols-5 items-center justify-center place-content-center ">
        {TASK_HEADERS.map((header) => (
          <h2 key={header} className="text-md text-center">
            {header}
          </h2>
        ))}
      </div>
      <ul className="w-full flex flex-col items-center gap-y-1">
        <AddTaskButton />
        {tasks.map((task) => (
          <TaskRow task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}
