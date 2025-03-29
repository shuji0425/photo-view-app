type Props = {
  bio?: string | null;
};

/**
 * 自己紹介を表示
 * @param Props 自己紹介情報
 */
export const ProfileBio = ({ bio }: Props) => {
  if (!bio) return null;

  return (
    <div className="mt-6 whitespace-pre-wrap text-gray-800 leading-relaxed">
      {bio}
    </div>
  );
};
