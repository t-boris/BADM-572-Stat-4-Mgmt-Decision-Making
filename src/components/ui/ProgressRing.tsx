import { motion } from "framer-motion";

interface Props {
  /** 0..100 */
  value: number;
  size?: number;
  stroke?: number;
  trackColor?: string;
  fillColor?: string;
  label?: string;
  /** Render a centered number with optional suffix. */
  showValue?: boolean;
  suffix?: string;
}

export default function ProgressRing({
  value,
  size = 96,
  stroke = 10,
  trackColor = "rgb(var(--border))",
  fillColor = "rgb(var(--accent))",
  label,
  showValue = true,
  suffix = "%",
}: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = (clamped / 100) * circumference;

  return (
    <div
      className="relative inline-flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fillColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${dash} ${circumference - dash}` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        {showValue ? (
          <div>
            <div className="text-xl font-bold tracking-tight">
              {Math.round(clamped)}
              <span className="text-sm font-medium text-ink-dim">{suffix}</span>
            </div>
            {label ? <div className="mt-0.5 text-[10px] uppercase tracking-wider text-ink-dim">{label}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
