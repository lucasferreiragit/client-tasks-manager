import { Option } from "../types";

interface InputFieldProps {
  type: "text" | "select" | "input";
  value: React.ReactNode;
  onChange?: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => void;
  onBlur?: () => void;
  name?: string;
  options?: readonly Option[];
  label: string;
  rawValue?: string;
}

export default function InputField({
  type,
  value,
  onChange,
  onBlur,
  name,
  options,
  label,
  rawValue,
}: InputFieldProps) {
  switch (type) {
    case "select":
      return (
        <select
          className="w-full p-2 pr-8 border rounded-md text-gray-500 text-sm bg-white"
          value={rawValue}
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
      );
    case "input":
      return (
        <input
          className="w-full rounded-md text-gray-500 text-sm py-1 outline-none"
          type="text"
          value={value as string}
          onChange={onChange}
          placeholder={`Enter ${label}`}
          onBlur={onBlur}
          autoFocus
          name={name}
        />
      );
    default:
      return (
        <textarea
          className="w-full p-2 border rounded-md text-gray-500 text-sm resize-none"
          value={value as string}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus
          rows={3}
          name={name}
        />
      );
  }
}
