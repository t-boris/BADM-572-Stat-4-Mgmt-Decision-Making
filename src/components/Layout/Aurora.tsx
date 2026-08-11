import { motion } from "framer-motion";

/**
 * Slow, animated, theme-aware background — a wash of color blobs behind the
 * page. Sits at z-0 with pointer-events:none so it never blocks interaction.
 */
export default function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* dotted grid */}
      <div
        className="absolute inset-0 bg-grid-dots opacity-60"
        style={{ backgroundSize: "24px 24px" }}
      />

      {/* blob 1 */}
      <motion.div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--accent) / 0.30), transparent 60%)",
        }}
        animate={{ x: [0, 60, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* blob 2 */}
      <motion.div
        className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--m3) / 0.25), transparent 60%)",
        }}
        animate={{ x: [0, -40, 20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* blob 3 */}
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--m6) / 0.22), transparent 60%)",
        }}
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
