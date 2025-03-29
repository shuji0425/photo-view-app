type Props = {
  website?: string | null;
  location?: string | null;
  birthPlace?: string | null;
};

export const ProfileInfo = ({ website, location, birthPlace }: Props) => {
  const items = [
    { label: "Website", value: website, isLink: true },
    { label: "Location", value: location },
    { label: "Birth Place", value: birthPlace },
  ];

  const filteredItems = items.filter((item) => item.value);

  // 情報がないときは返却
  if (filteredItems.length === 0) return null;

  return (
    <div className="mt-6 space-y-2">
      {filteredItems.map(({ label, value, isLink }) => (
        <div key={label} className="flex gap-2">
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
