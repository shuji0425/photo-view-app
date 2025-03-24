import Link from "next/link";

type Props = {
  onClickLink: () => void;
};

export function NavLinks({ onClickLink }: Props) {
  return (
    <>
      <Link href="/" onClick={onClickLink}>
        ホーム
      </Link>
      <Link href="/profile" onClick={onClickLink}>
        プロフィール
      </Link>
      {/* 別タブ */}
      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClickLink}
      >
        利用規約
      </a>
      <a
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClickLink}
      >
        プライバシーポリシー
      </a>
      <a
        href="https://forms.gle/6gDN5BrrNHn8GCp99"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClickLink}
      >
        お問い合わせ
      </a>
    </>
  );
}
