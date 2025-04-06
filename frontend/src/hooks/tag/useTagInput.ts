import { useEffect, useState } from "react";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  api: (query: string) => Promise<string[]>;
};

/**
 * タグの候補取得・状態を共通化するフック
 */
export const useTagInput = ({ value, onChange, api }: Props) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // タグ追加処理
  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    // 空・重複・空白含みタグを無効化（全角含む）
    if (!trimmed || /[\s　]/.test(trimmed) || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput("");
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
        const res = await api(input);
        setSuggestions(res.filter((s) => !value.includes(s)));
        setSelectedIndex(-1);
      } catch (err) {
        console.error("予測候補の取得に失敗", err);
      }
    };

    fetchSuggestions();
  }, [input, value, api]);

  return {
    input,
    setInput,
    suggestions,
    selectedIndex,
    setSelectedIndex,
    addTag,
    removeTag,
  };
};
