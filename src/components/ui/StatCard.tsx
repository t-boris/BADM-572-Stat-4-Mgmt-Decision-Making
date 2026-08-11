import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: number;
  /** When true, animates from 0 to value. */
  animateCount?: boolean;
  suffix?: string;
  icon?: LucideIcon;
  accentVar?: string; /* e.g. "var(--m1)" — defaults to accent. */
}

export default function StatCard({
  label,
  value,
  animateCount = true,
  suffix,
  icon: Icon,
  accentVar = "var(--accent)",
}: Props) {
  const mv = useMotionValue(animateCount ? 0 : value);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!animateCount) return;
    const controls = animate(mv, value, { duration: 1.1, ease: "easeOut" });
    return controls.stop;
  }, [mv, value, animateCount]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card card-hover relative overflow-hidden p-5"
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl"
        style={{ background: `rgb(${accentVar})` }}
      />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-ink-dim">
            {label}
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <motion.span className="text-3xl font-bold tracking-tight">
              {rounded}
            </motion.span>
            {suffix ? (
              <span className="text-sm font-medium text-ink-dim">{suffix}</span>
            ) : null}
          </div>
        </div>
        {Icon ? (
          <div
            className="grid h-10 w-10 place-items-center rounded-xl text-white"
            style={{ background: `rgb(${accentVar})` }}
          >
            <Icon size={18} />
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
