import Tooltip from "./ui/Tooltip";

export default function DisplayValue({
  value,
  label,
  onDoubleClick,
  name,
}: {
  value: React.ReactNode;
  label: string;
  onDoubleClick?: () => void;
  name?: string;
}) {
  return (
    <Tooltip id={`tooltip-${name}`} content="Double click to edit">
      <div
        className="text-gray-500 text-sm cursor-pointer"
        onDoubleClick={onDoubleClick}
      >
        {value || `Enter ${label}`}
      </div>
    </Tooltip>
  );
}
