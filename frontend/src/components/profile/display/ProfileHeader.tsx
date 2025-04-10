import Image from "next/image";
import { Profile } from "@/types/profile";

type Props = {
  profile: Profile;
};

/**
 * プロフィールのヘッダ部分
 * @param Props プロフィール情報
 */
export const ProfileHeader = ({ profile }: Props) => (
  <div className="mt-1">
    {/* カバー画像 */}
    {/* {profile.coverImage && (
      <Image
        src={profile.coverImage}
        alt="カバー画像"
        width={800}
        height={300}
        className="w-full h-48 object-cover rounded-xl mb-6"
        priority
      />
    )} */}

    {/* アバター　表示名　肩書き */}
    <div className="flex items-center gap-4">
      {profile.avatar && (
        <Image
          src={profile.avatar}
          alt="プロフィール画像"
          width={80}
          height={80}
          className="rounded-full object-cover border-2 border-white shadow-md"
        />
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {profile.displayName}
        </h1>
        {profile.jobTitle && (
          <p className="text-sm text-gray-500 mt-1">{profile.jobTitle}</p>
        )}
      </div>
    </div>
  </div>
);
