export default function ProgressBar({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  if (total < 1) {
    console.error("Total must be at least 1");
  }

  if (page > total || page < 1) {
    console.error(`Page number must be between 1 and ${total}`);
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-[#D9D9D9] p-[5px]">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-[10px] h-[10px] rounded-full ${
            i + 1 === page
              ? "bg-gradient-to-b from-[#262633] to-[#727299]"
              : "bg-[#D9D9D9]"
          }`}
        />
      ))}
    </div>
  );
}