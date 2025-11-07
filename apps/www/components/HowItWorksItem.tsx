"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface HowItWorksItemProps {
  item: {
    step: string;
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
  isLast: boolean;
}

export function HowItWorksItem({ item, index, isLast }: HowItWorksItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      key={index}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <Card className="relative border-purple-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent opacity-20">
              {item.step}
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center transition-transform"
            >
              <item.icon className="h-6 w-6 text-purple-400" />
            </motion.div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">{item.description}</p>
        </CardContent>
      </Card>
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          className="hidden md:block absolute top-1/2 -right-6 z-10"
        >
          <ArrowRight className="h-6 w-6 text-purple-400/50" />
        </motion.div>
      )}
    </motion.div>
  );
}
