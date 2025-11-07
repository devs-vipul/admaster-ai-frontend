"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface BenefitItemProps {
  benefit: {
    title: string;
    description: string;
  };
  index: number;
}

export function BenefitItem({ benefit, index }: BenefitItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 10 }}
      className="flex items-start gap-4 group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"
      >
        <CheckCircle2 className="h-5 w-5 text-purple-400" />
      </motion.div>
      <div>
        <motion.h3
          whileHover={{ scale: 1.05 }}
          className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors"
        >
          {benefit.title}
        </motion.h3>
        <p className="text-gray-400 mt-1">{benefit.description}</p>
      </div>
    </motion.div>
  );
}
