"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface UseCaseCardProps {
  useCase: {
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
  };
  index: number;
}

export function UseCaseCard({ useCase, index }: UseCaseCardProps) {
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
      <Card className="group relative overflow-hidden border-purple-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <useCase.icon className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {useCase.title}
            </h3>
          </div>
          <p className="text-gray-400 mb-4 leading-relaxed">
            {useCase.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {useCase.features.map((feature, j) => (
              <Badge
                key={j}
                className="bg-purple-500/10 text-purple-300 border-purple-500/30"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
