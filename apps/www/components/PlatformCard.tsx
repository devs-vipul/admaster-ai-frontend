"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformLogo } from "./PlatformLogo";

interface PlatformCardProps {
  platform: {
    name: string;
    description: string;
  };
  index: number;
}

export function PlatformCard({ platform, index }: PlatformCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border-purple-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
        <CardContent className="p-6 text-center">
          <div className="mb-4 h-16 w-16 mx-auto rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform p-3">
            <PlatformLogo
              name={platform.name.split(" ")[0]}
              className="h-full w-full"
            />
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-1">
            {platform.name}
          </h3>
          <p className="text-xs text-gray-400">{platform.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
