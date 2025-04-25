import { twMerge } from "tailwind-merge";

export default function TaskSkeleton() {
  return (
    <div className="flex items-center gap-2 px-2 w-[90%] bg-slate-50/50 shadow-md rounded-md">
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex-1 text-sm grid rounded-md py-4 gap-8 grid-cols-5 items-center px-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    </div>
  );
}

export function TasksListSkeleton() {
  return (
    <div className="grid w-full gap-3 py-4">
      <div className="mx-auto flex flex-grow w-[90%] bg-white items-center">
        <div className="text-sm grid w-full rounded-md py-4 gap-8 grid-cols-5 items-center px-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-200 rounded animate-pulse"
              />
            ))}
        </div>
        <div className="pr-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
      <ul className="w-full flex flex-col items-center gap-y-1">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <TaskSkeleton key={index} />
          ))}
      </ul>
    </div>
  );
}
