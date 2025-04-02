"use client";

import { inputBaseClass } from "@/lib/styles/input";
import { cn } from "@/lib/utils/cn";
import { forwardRef, SelectHTMLAttributes } from "react";

type Option = {
  label: string;
  value: string | number;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  placeholder?: string;
};

/**
 * セレクトボックスコンポーネント
 */
export const Select = forwardRef<HTMLSelectElement, Props>(function SelectBase(
  { className, options, placeholder = "選択してください", ...props },
  ref
) {
  return (
    <select ref={ref} className={cn(inputBaseClass, className)} {...props}>
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
});
