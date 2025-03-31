"use client";

import { inputBaseClass } from "@/lib/styles/input";
import { cn } from "@/lib/utils/cn";

type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  id?: string;
  value?: string | number | null;
  onChange: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

/**
 * セレクトボックスコンポーネント
 */
export const Select = ({
  id,
  value,
  onChange,
  options,
  placeholder = "選択してください",
  className,
}: SelectProps) => {
  return (
    <select
      id={id}
      value={value ?? ""}
      onChange={(e) => {
        const val = e.target.value;
        onChange(isNaN(Number(val)) ? val : Number(val));
      }}
      className={cn(inputBaseClass, className)}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
