import TaskRow from "./TaskRow";
import { Task } from "../types";
import AddTaskButton from "./AddTaskButton";
import { TASK_HEADERS } from "../constants/taskConstants";
import { twMerge } from "tailwind-merge";

export default function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid w-full gap-3 -4">
      <div className="mx-auto flex w-full bg-wite px-4 items-center ">
        <div className="hidden text-sm sm:grid w-full rounded-md py-4 gap-8 grid-cols-5 items-center px-4">
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
