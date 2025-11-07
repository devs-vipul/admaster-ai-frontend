"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CounterAnimation } from "./CounterAnimation";

interface StatItemProps {
  stat: {
    value: number;
    suffix: string;
    label: string;
  };
  index: number;
}

export function StatItem({ stat, index }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="mb-3 text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent transition-transform inline-block"
      >
        <CounterAnimation
          value={stat.value}
          suffix={stat.suffix}
          duration={2000}
          decimals={stat.value >= 1000 ? 1 : 0}
        />
      </motion.div>
      <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
}
