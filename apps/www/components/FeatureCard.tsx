"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
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
    >
      <Card className="group relative overflow-hidden border-purple-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
        <CardContent className="p-6">
          <div className="mb-4 relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <feature.icon className="h-7 w-7" />
            </div>
            <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
