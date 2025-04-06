type Props = {
  suggestions: string[];
  selectedIndex: number;
  input: string;
  addTag: (tag: string) => void;
  setSelectedIndex: (fn: (prev: number) => number) => void;
};

export const useTagInputKeyEvents = ({
  suggestions,
  selectedIndex,
  input,
  addTag,
  setSelectedIndex,
}: Props) => {
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
          addTag(suggestions[selectedIndex]);
          return;
        }
      }
    }

    // 直接入力したとき
    const keys = ["Enter", ",", " ", "　"];
    if (keys.includes(key)) {
      e.preventDefault();
      addTag(input);
    }
  };

  return { handleKeyDown };
};
