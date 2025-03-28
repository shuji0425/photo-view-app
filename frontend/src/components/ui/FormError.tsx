import { cn } from "@/lib/utils/cn";

type Props = {
  message?: string;
  className?: string;
};

/**
 * フォーム用バリデーションエラー表示
 */
export const FormError = ({ message, className }: Props) => {
  if (!message) return null;

  return (
    <p
      className={cn("text-sm text-red-500 mt-1", className)}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </p>
  );
};
