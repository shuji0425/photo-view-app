import { useCombinedRef } from "@/hooks/useCombinedRef";
import { inputBaseClass } from "@/lib/styles/input";
import { cn } from "@/lib/utils/cn";
import React, {
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useEffect,
} from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * テキストエリア（自動高さ調整）
 */
export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  function TextareaBase({ className, ...props }, ref) {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = useCombinedRef(ref, innerRef);

    // テキストエリアの高さを入力に応じて自動調整
    const resizeHeight = () => {
      const textarea = innerRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    };

    // 初期状態
    useEffect(() => {
      resizeHeight();
    }, []);

    return (
      <textarea
        ref={combinedRef}
        className={cn(inputBaseClass, "resize-none overflow-hidden", className)}
        onInput={resizeHeight}
        {...props}
      />
    );
  }
);
