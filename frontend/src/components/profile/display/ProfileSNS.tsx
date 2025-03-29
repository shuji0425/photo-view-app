import { SNSLink } from "@/types/profile";

type Props = {
  links: SNSLink[];
};

export const ProfileSNS = ({ links }: Props) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-2 text-lg">SNS</h2>
      <ul className="flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {link.platform === "other" ? link.platform_name : link.platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
