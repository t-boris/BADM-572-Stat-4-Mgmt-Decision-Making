import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  action,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-10 text-center"
    >
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft/40 text-accent">
        <Icon size={26} />
      </div>
      <div className="text-lg font-semibold">{title}</div>
      {description ? (
        <div className="mx-auto mt-2 max-w-md text-sm text-ink-dim">
          {description}
        </div>
      ) : null}
      {action ? <div className="mt-6 inline-flex">{action}</div> : null}
    </motion.div>
  );
}
