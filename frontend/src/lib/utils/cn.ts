/**
 * 複数のクラス名を結合するユーティリティ
 * falsy（undefined / null / false / 空文字）は自動で除外
 *
 * 例: cn("text-sm", isError && "text-red-500") => "text-sm text-red-500"
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join("");
}
