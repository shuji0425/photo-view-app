"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import { inputBaseClass } from "@/lib/styles/input";
import { useCombinedRef } from "@/hooks/useCombinedRef";
import { getTagsByQuery } from "@/lib/api/tag/getTags";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
};

/**
 * タグ入力コンポーネント
 */
export const TagInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onChange }, ref) => {
    const [input, setInput] = useState("");
    const internalRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRef(ref, internalRef);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

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

      // 候補があるときの処理
      if (suggestions.length > 0) {
        // 上下矢印で候補を移動
        if (key == "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % suggestions.length);
          return;
        }
        if (key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev <= 0 ? suggestions.length - 1 : prev - 1
          );
        }
        // EnterとTabで確定
        if (key === "Enter" || key === "Tab") {
          if (selectedIndex >= 0) {
            e.preventDefault();
            handleAddTag(suggestions[selectedIndex]);
            return;
          }
        }
      }

      // 直接入力したとき
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

    // 入力が変わるたびに予測候補を取得
    useEffect(() => {
      const fetchSuggestions = async () => {
        if (!input.trim()) {
          setSuggestions([]);
          setSelectedIndex(-1);
          return;
        }

        try {
          const res = await getTagsByQuery(input);
          setSuggestions(res.filter((s) => !value.includes(s)));
          setSelectedIndex(-1);
        } catch (err) {
          console.error("予測候補の取得に失敗", err);
        }
      };

      fetchSuggestions();
    }, [input, value]);

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
                onClick={() => handleAddTag(s)}
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
