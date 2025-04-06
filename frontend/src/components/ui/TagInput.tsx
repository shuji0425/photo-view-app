"use client";

import React, { forwardRef } from "react";
import { X } from "lucide-react";
import { inputBaseClass } from "@/lib/styles/input";
import { useCombinedRef } from "@/hooks/useCombinedRef";
import { getTagsByQuery } from "@/lib/api/tag/getTags";
import { useTagInput } from "@/hooks/tag/useTagInput";
import { useTagInputKeyEvents } from "@/hooks/tag/useTagInputKeyEvents";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

/**
 * タグ入力コンポーネント
 */
export const TagInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange }, ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRef(ref, internalRef);

    const {
      input,
      setInput,
      suggestions,
      selectedIndex,
      setSelectedIndex,
      addTag,
      removeTag,
    } = useTagInput({ value, onChange, api: getTagsByQuery });

    const { handleKeyDown } = useTagInputKeyEvents({
      suggestions,
      selectedIndex,
      input,
      addTag,
      setSelectedIndex,
    });

    return (
      <div className="space-2">
        {/* 選択済みタグ */}
        <div className="flex flex-wrap gap-2">
          {value.map((tag) => (
            <span
              key={tag}
              className="mb-2 px-2 py-1 bg-blue-100 rounded-full text-sm flex items-center"
            >
              <span className="mr-1">{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="text-red-500 hover:text-red-700"
                aria-label={`${tag}を解除`}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </span>
          ))}
        </div>

        {/* 入力欄 */}
        <input
          type="text"
          ref={combinedRef}
          className={inputBaseClass}
          placeholder="タグを入力（Enter / カンマ / 空白）"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* サジェスト候補 */}
        {suggestions.length > 0 && (
          <ul className="mt-1 bg-white border border-gray-200 rounded shadow-md max-h-40 overflow-y-auto">
            {suggestions.map((s, i) => (
              <li
                key={s}
                className={`px-4 py-2 hover:bg-blue-100 cursor-pointer ${
                  i === selectedIndex ? "bg-blue-200" : ""
                }`}
                onClick={() => addTag(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

TagInput.displayName = "TagInput";
