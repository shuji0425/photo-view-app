import React, { useCallback } from "react";

/**
 * 複数の ref を結合して1つの ref にまとめるためのフック
 *
 * @param refs 複数のref (forwardRef で渡されたものや、useRef で生成したもの)
 * @returns 全ての ref に割り当てることができる callback ref
 */
export function useCombinedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): (instance: T | null) => void {
  return useCallback(
    (instance: T | null) => {
      refs.forEach((ref) => {
        if (!ref) return;
        if (typeof ref === "function") {
          ref(instance);
        } else {
          try {
            (ref as React.MutableRefObject<T | null>).current = instance;
          } catch (e) {
            console.warn("refの割り当てに失敗しました", e);
          }
        }
      });
    },
    [refs]
  );
}
