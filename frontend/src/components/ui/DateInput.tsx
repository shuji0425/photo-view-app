"use client";

import { inputBaseClass } from "@/lib/styles/input";
import { cn } from "@/lib/utils/cn";
import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

/**
 * 日付入力コンポーネント
 */
export const DateInput = forwardRef<HTMLInputElement, Props>(
  function DateInputBase({ className, ...props }, ref) {
    return (
      <input
        type="date"
        ref={ref}
        className={cn(inputBaseClass, className)}
        {...props}
      />
    );
  }
);
