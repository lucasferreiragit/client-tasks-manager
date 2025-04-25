import { Pencil } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconSize?: number;
}

export default function EditButton({
  iconSize = 12,
  className,
  ...props
}: EditButtonProps) {
  return (
    <button
      className={twMerge(
        "p-1 pb-1.5 text-gray-600 rounded-full hover:bg-gray-100",
        className
      )}
      {...props}
    >
      <Pencil size={iconSize} />
    </button>
  );
}
