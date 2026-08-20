/**
 * Progress ring for a construction metric. Previously rendered the entire
 * SVG twice (`md:hidden` + `hidden md:block`) just to get two sizes — one
 * responsive SVG sized with Tailwind utilities does the same job.
 *
 * @param {string} label
 * @param {number} completed
 * @param {number} total
 */
export default function AvancesDisplay({ label, completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-4">
      <div className="relative size-28 md:size-40">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90 drop-shadow-sm">
          <circle cx="50" cy="50" r={radius} stroke="var(--line)" strokeWidth="8" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="var(--accent-600)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-slow ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-h2 text-ink-900">{percentage}%</span>
        </div>
      </div>
      <p className="mt-3 max-w-40 text-center text-caption font-medium text-ink-700 md:max-w-48 md:text-body">
        {label}
      </p>
    </div>
  );
}
