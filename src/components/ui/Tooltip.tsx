import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
  id: string;
  content: string;
  children: React.ReactNode;
  place?: "top" | "right" | "bottom" | "left";
  className?: string;
  delayShow?: number;
}

export default function Tooltip({
  id,
  content,
  children,
  place = "top",
  className = "",
  delayShow = 100,
}: TooltipProps) {
  return (
    <>
      <div
        data-tooltip-id={id}
        data-tooltip-content={content}
        data-tooltip-place={place}
        className={className}
      >
        {children}
      </div>
      <ReactTooltip
        id={id}
        delayShow={delayShow}
        style={{
          backgroundColor: "#374151",
          color: "white",
          padding: "0.5rem",
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
          zIndex: 50,
          maxWidth: "200px",
        }}
      />
    </>
  );
}
