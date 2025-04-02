/**
 * "YYYY-MM-DD" の日付文字列を
 * 日本時間（UTC+9）の 00:00:00 を起点とした ISO文字列に変換
 *
 * @param val - "YYYY-MM-DD" 形式の文字列
 * @returns ISO 8601 形式の文字列（UTC） or null
 */
export function toJSTMidnightISOString(
  val: string | null | undefined
): string | null {
  if (!val) return null;

  // ISO 8601 形式: 例 "2025-04-02T00:00:00+09:00" や "2025-04-01T15:00:00.000Z"
  const isoPattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?([+-]\d{2}:\d{2}|Z)?$/;

  // 変換ずみなら返却
  if (isoPattern.test(val)) return val;

  // "YYYY-MM-DD" 形式でなければエラー
  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(val);
  if (!isValidFormat) return null;

  // 明示的に日本時間で解釈
  const date = new Date(`${val}T00:00:00+09:00`);
  return isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * 日本時間を文字列に変換
 * @param iso 日時
 * @returns string | null
 */
export function formatToDateJST(iso?: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
