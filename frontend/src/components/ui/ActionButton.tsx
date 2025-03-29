import { cn } from "@/lib/utils/cn";
import {
  baseButtonClass,
  colorClasses,
  ButtonColor,
} from "@/lib/styles/button";
import { Spinner } from "./Spinner";

type ActionButtonProps = {
  label: string;
  color: ButtonColor;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
};

/**
 * アクションボタン
 */
export const ActionButton = ({
  label,
  color,
  type = "button",
  disabled,
  isLoading = false,
  onClick,
  className,
}: ActionButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      baseButtonClass,
      colorClasses[color],
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
  >
    {isLoading ? <Spinner /> : label}
  </button>
);
