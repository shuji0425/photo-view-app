export const baseButtonClass =
  "text-white font-semibold py-2 px-4 rounded transition active:scale-95 duration-150";

export const colorClasses = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  red: "bg-red-500 hover:bg-red-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  gray: "bg-gray-500 hover:bg-gray-700",
} as const;

export type ButtonColor = keyof typeof colorClasses;
