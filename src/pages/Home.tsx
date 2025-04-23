import { Link } from "react-router-dom";
import tasks from "../mockupTasks";
import TasksList from "../components/TasksList";
import { Task } from "../types";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <TasksList tasks={tasks as Task[]} />
      <Link to="/new">
        <button>Create New Task</button>
      </Link>
    </div>
  );
}
