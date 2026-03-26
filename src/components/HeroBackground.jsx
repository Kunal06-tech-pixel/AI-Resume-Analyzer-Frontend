import { motion as Motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/10",
}) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <Motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-white/20",
            "shadow-lg"
          )}
        />
      </Motion.div>
    </Motion.div>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* ✅ FIXED HERE */}

      <ElegantShape
        delay={0.3}
        width={600}
        height={140}
        rotate={12}
        gradient="from-indigo-500/20"
        className="left-[-10%] top-[20%]"
      />

      <ElegantShape
        delay={0.5}
        width={500}
        height={120}
        rotate={-15}
        gradient="from-pink-500/20"
        className="right-[-5%] top-[75%]"
      />

      <ElegantShape
        delay={0.4}
        width={300}
        height={80}
        rotate={-8}
        gradient="from-purple-500/20"
        className="left-[10%] bottom-[10%]"
      />

      <ElegantShape
        delay={0.6}
        width={200}
        height={60}
        rotate={20}
        gradient="from-yellow-500/20"
        className="right-[20%] top-[15%]"
      />

    </div>
  );
}