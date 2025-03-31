"use client";

import { inputBaseClass } from "@/lib/styles/input";
import { cn } from "@/lib/utils/cn";

type DateTimeInputProps = {
  id?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * 日付入力コンポーネント
 */
export const DateTimeInput = ({
  id,
  value,
  onChange,
  className,
}: DateTimeInputProps) => {
  return (
    <input
      type="datetime-local"
      id={id}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={cn(inputBaseClass, className)}
    />
  );
};
