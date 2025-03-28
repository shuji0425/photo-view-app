import { inputBaseClass } from "@/lib/styles/input";
import { cn } from "@/lib/utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

/**
 * インプットエリア
 */
export const Input = forwardRef<HTMLInputElement, Props>(function InputBase(
  { className, type = "text", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(inputBaseClass, className)}
      {...props}
    />
  );
});
