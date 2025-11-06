"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export function CounterAnimation({
  value,
  suffix = "",
  duration = 2000,
  decimals = 0,
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (value - startValue) * easeOutQuart;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatValue = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(decimals) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(decimals) + "K";
    }
    return num.toFixed(decimals);
  };

  return (
    <span ref={ref}>
      {formatValue(count)}
      {suffix}
    </span>
  );
}
