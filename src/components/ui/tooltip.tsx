import clsx from "clsx";

interface TooltipProps {
  message: string;
  visible: boolean;
  children: React.ReactNode;
  className?: string;
}

function Tooltip({ children, message, visible, className }: TooltipProps) {
  return (
    <div className="relative inline-block z-50">
      {visible && (
        <div
          className={clsx(`absolute left-1/2 transform -translate-x-1/2 px-4 py-2 bg-hover-button text-white text-sm rounded-xl shadow z-10 whitespace-nowrap`, className)}
          style={{ bottom: "calc(100% + 16px)" }}
        >
          {message}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-hover-button" />
        </div>
      )}
      {children}
    </div>
  );
}

export default Tooltip;