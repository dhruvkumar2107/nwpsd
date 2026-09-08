"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  springConfig?: { stiffness: number; damping: number; mass: number };
  direction?: "y" | "x" | "both" | "rotate" | "scale";
  as?: keyof React.JSX.IntrinsicElements;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
  springConfig = { stiffness: 100, damping: 30, mass: 0.5 },
  direction = "y",
  as: Tag = "div",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const transforms: Record<string, MotionValue> = {
    y: useSpring(useTransform(scrollYProgress, [0, 1], [speed * -60, speed * 60]), springConfig),
    x: useSpring(useTransform(scrollYProgress, [0, 1], [speed * -40, speed * 40]), springConfig),
    rotate: useSpring(useTransform(scrollYProgress, [0, 1], [speed * -5, speed * 5]), springConfig),
    scale: useSpring(useTransform(scrollYProgress, [0, 1], [1 - speed * 0.05, 1 + speed * 0.05]), springConfig),
  };

  let transformStyle = {};
  if (direction === "both") {
    transformStyle = {
      x: transforms.x,
      y: transforms.y,
    };
  } else {
    transformStyle = {
      [direction]: transforms[direction],
    };
  }

  const MotionTag = motion.create(Tag as never) as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={transformStyle}
    >
      {children}
    </MotionTag>
  );
}
