"use client";

type ToggleProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

/**
 * トグルコンポーネント（完全動作・アニメあり）
 */
export const Toggle = ({ id, checked, onChange }: ToggleProps) => {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-sm text-gray-600">OFF</span>

      <div className="relative inline-block w-11 h-5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer appearance-none w-11 h-5 bg-gray-300 rounded-full checked:bg-blue-500 cursor-pointer transition-colors duration-300"
        />
        <label
          htmlFor={id}
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-600 cursor-pointer"
        />
      </div>

      <span className="text-sm text-gray-600">ON</span>
    </div>
  );
};
