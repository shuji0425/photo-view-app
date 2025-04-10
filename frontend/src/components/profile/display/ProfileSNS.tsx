import { SNSLink } from "@/types/profile";
import { getPlatformIcon } from "@/lib/icons/snsIcons";

type Props = {
  links: SNSLink[];
};

/**
 * SNSリンク表示
 */
export const ProfileSNS = ({ links }: Props) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2 text-lg">SNS</h2>
      <ul className="flex flex-wrap gap-3">
        {links.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
            >
              {getPlatformIcon(link.platform)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
