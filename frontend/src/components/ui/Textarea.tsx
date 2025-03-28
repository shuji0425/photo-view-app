import { inputBaseClass } from "@/lib/styles/input";
import { cn } from "@/lib/utils/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * テキストエリア
 */
export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  function TextareaBase({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(inputBaseClass, className)}
        {...props}
      />
    );
  }
);
