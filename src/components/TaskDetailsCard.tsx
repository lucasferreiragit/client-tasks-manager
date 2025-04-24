import { Task } from "../types";
import Divider from "./ui/Divider";

const DetailItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="grid gap-2">
      <h2 className="text-md font-semibold">{label}</h2>
      <p className="text-gray-500 text-sm">{value}</p>
    </div>
  );
};
export default function TaskDetailsCard({ task }: { task: Task }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid gap-2">
        <DetailItem label="Description" value={task.description} />
        <Divider />
      </div>
      <div className="grid gap-2">
        <DetailItem label="Priority" value={task.priority} />
        <Divider />
      </div>
      <div className="grid gap-2">
        <DetailItem
          label="Status"
          value={task.completed ? "Completed" : "Pending"}
        />
        <Divider />
      </div>
      <div className="grid gap-2">
        <DetailItem
          label="Created At"
          value={new Date(task.createdAt).toLocaleString()}
        />
      </div>
    </div>
  );
}
