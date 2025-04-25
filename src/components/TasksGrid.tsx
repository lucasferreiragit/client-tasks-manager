import { Task } from "../types";
import TaskGridCard from "./TaskGridCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

const TaskColumn = ({ title, tasks }: TaskColumnProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 pl-1">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
        {tasks.length}
      </span>
    </div>
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskGridCard key={task.id} task={task} />
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No {title.toLowerCase()} tasks
        </div>
      )}
    </div>
  </div>
);

export default function TasksGrid({ tasks }: { tasks: Task[] }) {
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="mx-auto w-[90%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <TaskColumn title="Completed" tasks={completedTasks} />
        <TaskColumn title="Pending" tasks={pendingTasks} />
      </div>
    </div>
  );
}
