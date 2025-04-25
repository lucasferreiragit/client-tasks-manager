import { Pencil } from "lucide-react";
import Tooltip from "./ui/Tooltip";

type Option = {
  value: string;
  label: string;
};

export default function DetailItem({
  label,
  value,
  icon,
  onDoubleClick,
  isEditing,
  onBlur,
  onChange,
  type = "text",
  options,
  name,
  error,
  isEditable = true,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  onDoubleClick?: () => void;
  isEditing?: boolean;
  onBlur?: () => void;
  onChange?: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => void;
  type?: "text" | "select" | "input";
  options?: readonly Option[];
  name?: string;
  error?: string | false;
  isEditable?: boolean;
}) {
  return (
    <div className="grid gap-2 w-full">
      <div className="flex items-center gap-1">
        <h2 className="text-md font-semibold">{label}</h2>
        {isEditable && !isEditing ? (
          <button
            onClick={onDoubleClick}
            className="p-1 pb-1.5 text-gray-600 rounded-full hover:bg-gray-100 "
          >
            <Pencil size={12} />
          </button>
        ) : null}
      </div>
      <div className="flex items-center gap-2 pl-2 w-full">
        {icon}
        {isEditing ? (
          type === "select" ? (
            <select
              className="w-full p-2 pr-8 border rounded-md text-gray-500 text-sm bg-white"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              autoFocus
              name={name}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : type === "input" ? (
            <input
              className="w-full rounded-md text-gray-500 text-sm py-1 outline-none"
              type="text"
              value={value as string}
              onChange={onChange}
              placeholder={"Enter " + label}
              onBlur={onBlur}
              autoFocus
              name={name}
            />
          ) : (
            <textarea
              className="w-full p-2 border rounded-md text-gray-500 text-sm resize-none"
              value={value as string}
              onChange={onChange}
              onBlur={onBlur}
              autoFocus
              rows={3}
              name={name}
            />
          )
        ) : isEditable ? (
          <Tooltip id={`tooltip-${name}`} content="Double click to edit">
            <p
              className="text-gray-500 text-sm cursor-pointer"
              onDoubleClick={onDoubleClick}
            >
              {value || "Enter " + label}
            </p>
          </Tooltip>
        ) : (
          <p className="text-gray-500 text-sm">{value}</p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
