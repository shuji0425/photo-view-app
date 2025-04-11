import { FaMapMarkerAlt, FaMapMarkedAlt, FaLink } from "react-icons/fa";

type Props = {
  website?: string | null;
  location?: string | null;
  birthPlace?: string | null;
};

export const ProfileInfo = ({ website, location, birthPlace }: Props) => {
  const items = [
    {
      label: "Webサイト",
      value: website,
      isLink: true,
      icon: <FaLink className="text-gray-500" />,
    },
    {
      label: "所在地",
      value: location,
      icon: <FaMapMarkerAlt className="text-gray-500" />,
    },
    {
      label: "出身地",
      value: birthPlace,
      icon: <FaMapMarkedAlt className="text-gray-500" />,
    },
  ];

  const filteredItems = items.filter((item) => item.value);

  // 情報がないときは返却
  if (filteredItems.length === 0) return null;

  return (
    <div className="mt-6 space-y-2">
      {filteredItems.map(({ label, value, isLink, icon }) => (
        <div key={label} className="flex gap-2">
          {icon}
          <span className="font-semibold text-gray-600 min-w-[100px]">
            {label}:
          </span>
          {isLink ? (
            <a
              href={value as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {value}
            </a>
          ) : (
            <span className="text-gray-800">{value}</span>
          )}
        </div>
      ))}
    </div>
  );
};
