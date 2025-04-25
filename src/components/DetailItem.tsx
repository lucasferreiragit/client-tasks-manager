import { Pencil } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Option } from "../types";
import InputField from "./InputField";
import DisplayValue from "./DisplayValue";
import Tooltip from "./ui/Tooltip";
interface DetailItemProps {
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
  rawValue?: string;
  className?: string;
}

const EditButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="p-1 pb-1.5 text-gray-600 rounded-full hover:bg-gray-100"
  >
    <Pencil size={12} />
  </button>
);

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
  rawValue,
  className = "",
}: DetailItemProps) {
  return (
    <div className={twMerge("grid gap-2 w-full", className)}>
      <div className="flex items-center gap-1">
        <h2 className="text-md font-semibold">{label}</h2>
        {isEditable && !isEditing && <EditButton onClick={onDoubleClick} />}
      </div>

      <div className="flex items-center gap-2 pl-2 w-full">
        {icon}
        {isEditing ? (
          <InputField
            type={type}
            rawValue={rawValue}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            options={options}
            label={label}
          />
        ) : isEditable ? (
          <Tooltip id={`tooltip-${name}`} content="Double click to edit">
            <DisplayValue
              value={value}
              label={label}
              onDoubleClick={onDoubleClick}
            />
          </Tooltip>
        ) : (
          <p className="text-gray-500 text-sm">{value}</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
