/**
 * ローカル時間に変換
 * - <input type="datetime-local" /> は必須
 * @param date 日付
 * @returns 変換後の日付
 */
export const toLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
};
