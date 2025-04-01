"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { inputBaseClass } from "@/lib/styles/input";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

/**
 * タグ入力コンポーネント
 */
export const TagInput = ({ value, onChange }: Props) => {
  const [input, setInput] = useState("");

  // タグ追加処理
  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();

    // 空・重複・空白含みタグを無効化（全角含む）
    if (!trimmed || /[\s　]/.test(trimmed) || value.includes(trimmed)) return;

    onChange([...value, trimmed]);
    setInput("");
  };

  // タグ確定（全角スペースも対応）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isComposing = e.nativeEvent.isComposing;
    if (isComposing) return;

    const key = e.key;
    const keys = ["Enter", ",", " ", "　"];
    if (keys.includes(key)) {
      e.preventDefault();
      handleAddTag(input);
    }
  };

  // タグ削除
  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="space-2">
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

      <input
        type="text"
        className={inputBaseClass}
        placeholder="タグを入力（Enter / カンマ / 空白）"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
