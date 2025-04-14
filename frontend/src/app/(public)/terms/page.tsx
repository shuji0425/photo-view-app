// src/app/terms/page.tsx

export { termsMetadata as metadata } from "./metadata";

export default function TermsPage() {
  return (
    <main className="min-h-full p-6 space-y-6 max-w-2xl mx-auto bg-gray-100 text-gray-700">
      <h1 className="text-2xl font-bold">利用規約</h1>

      <section>
        <h2 className="text-lg font-semibold">1. 著作権について</h2>
        <p>
          当サイトに掲載されている写真・画像・文章などの著作物は、すべて著作権により保護されています。無断転載・無断使用は固くお断りいたします。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">2. 禁止事項</h2>
        <p>以下の行為を禁止します：</p>
        <ul className="list-disc list-inside ml-4">
          <li>当サイトのコンテンツの無断転載・転用</li>
          <li>営利目的での画像の使用</li>
          <li>当サイトに対する不正アクセスや妨害行為</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">3. 免責事項</h2>
        <p>
          当サイトの情報は予告なく変更・削除される場合があります。掲載内容の正確性や完全性について保証するものではなく、利用によって生じたいかなる損害にも責任を負いかねます。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">4. お問い合わせ</h2>
        <p>
          本利用規約に関するお問い合わせは、
          <a
            href="https://forms.gle/6gDN5BrrNHn8GCp99"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせページ
          </a>
          よりご連絡ください。
        </p>
      </section>

      <p className="text-sm text-gray-500">制定日：2025年3月</p>
    </main>
  );
}
