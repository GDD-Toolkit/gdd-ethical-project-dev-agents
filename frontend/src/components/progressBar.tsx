export default function ProgressBar({ page, total }: { page: number; total: number }) {
  return (
    <div className="flex items-center gap-2 text-[#D9D9D9]">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`w-[10px] h-[10px] rounded-full ${
            i + 1 === page ? 'bg-blue-600' : 'bg-[#D9D9D9]'
          }`}
        />
      ))}
    </div>
  );
}