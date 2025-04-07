"use client";

import { useRouter } from "next/navigation";
import { ActionButton } from "./ActionButton";
import { ButtonColor } from "@/lib/styles/button";

type Props = {
  label?: string;
  color?: ButtonColor;
  className?: string;
};

/**
 * 戻るボタン
 */
export const BackButton = ({
  label = "戻る",
  color = "gray",
  className,
}: Props) => {
  const router = useRouter();

  return (
    <ActionButton
      type="button"
      label={label}
      color={color}
      onClick={() => router.back()}
      className={className}
    />
  );
};
