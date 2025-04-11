// src/app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        404 - ページが見つかりません
      </h1>
      <p className="text-gray-600">
        指定されたページは存在しないか、削除された可能性があります。
      </p>
    </div>
  );
}
