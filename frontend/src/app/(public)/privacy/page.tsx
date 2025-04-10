// src/app/privacy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-full p-6 space-y-6 max-w-2xl mx-auto bg-gray-100 text-gray-700">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>

      <section>
        <h2 className="text-lg font-semibold">1. 個人情報の取得について</h2>
        <p>
          当サイトでは、お問い合わせフォームを通じて、名前・メールアドレスなどの個人情報を取得することがあります。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">2. 個人情報の利用目的</h2>
        <p>
          取得した個人情報は、お問い合わせ内容への対応・確認のためにのみ利用し、それ以外の目的では使用いたしません。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">
          3. 個人情報の第三者提供について
        </h2>
        <p>
          ご本人の同意がある場合、または法令に基づく場合を除き、第三者に個人情報を提供することはありません。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">4. 個人情報の管理</h2>
        <p>
          お預かりした個人情報は、適切に管理し、漏洩・改ざん・不正アクセス等の防止に努めます。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">5. お問い合わせ</h2>
        <p>
          プライバシーポリシーに関するお問い合わせは、
          <a
            href="https://forms.gle/6gDN5BrrNHn8GCp99"
            className="text-blue-600 underline"
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
