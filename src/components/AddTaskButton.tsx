import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddTaskButton() {
  return (
    <div className="flex text-sm border-dotted border-[3px] py-1 border-gray-300 rounded-md items-center  hover:bg-gray-100 hover:shadow-sm w-[90%] transition-all duration-200 mb-1">
      <Link to="/new" className="flex-1 flex items-center gap-x-2 px-4 ">
        <Plus className="w-5 font-bold" />
        <button className="text-gray-800 py-2">Create New Task</button>
      </Link>
    </div>
  );
}
