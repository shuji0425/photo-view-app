/**
 * 管理画面の各ページ共通のレイアウト
 */
export default function AdminMainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-full px-4 sm:px-6">{children}</div>;
}
