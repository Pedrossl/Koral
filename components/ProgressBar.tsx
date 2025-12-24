interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-purple-200 tracking-wide">
          PROGRESS: {current}/{total}
        </span>
        <span className="text-sm font-black text-purple-100">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-purple-950 rounded-full h-3 overflow-hidden border border-purple-700">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 shadow-lg shadow-purple-500/50"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
