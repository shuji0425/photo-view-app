import { ReactNode } from "react";

export default function PhotoCardFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="absolute inset-0 p-1">
      <div className={`relative w-full h-full bg-gray-100 ${className}`}>
        {children}
      </div>
    </div>
  );
}
