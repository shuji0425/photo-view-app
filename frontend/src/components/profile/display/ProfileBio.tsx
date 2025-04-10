type Props = {
  bio?: string | null;
};

/**
 * 自己紹介を表示
 * @param Props 自己紹介情報
 */
export const ProfileBio = ({ bio }: Props) => {
  if (!bio || bio.trim() === "") return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2 text-lg">自己紹介</h2>
      <p className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
        {bio}
      </p>
    </div>
  );
};
