import { cn } from "@/lib/utils/cn";
import {
  baseButtonClass,
  colorClasses,
  ButtonColor,
} from "@/lib/styles/button";

type ActionButtonProps = {
  label: string;
  color: ButtonColor;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * アクションボタン
 */
export const ActionButton = ({
  label,
  color,
  type = "button",
  disabled,
  onClick,
}: ActionButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      baseButtonClass,
      colorClasses[color],
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {label}
  </button>
);
