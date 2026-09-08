"use client";

import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

type TextRevealVariant = "words" | "chars" | "lines" | "fade-up" | "slide-up" | "clip";

interface TextRevealProps {
  children: string;
  variant?: TextRevealVariant;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const wordVariants: Record<TextRevealVariant, { hidden: Variant; visible: Variant }> = {
  words: {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  },
  chars: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  },
  lines: {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  "slide-up": {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  clip: {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
};

function splitText(text: string, variant: TextRevealVariant): string[] {
  if (variant === "chars") {
    return text.split("");
  }
  if (variant === "lines") {
    return text.split("\n").filter(Boolean);
  }
  return text.split(" ");
}

export function TextReveal({
  children,
  variant = "words",
  className = "",
  delay = 0,
  staggerChildren = variant === "chars" ? 0.02 : variant === "words" ? 0.08 : 0.15,
  as: Tag = "span",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const items = splitText(children, variant);
  const currentVariant = wordVariants[variant];

  const MotionTag = motion.create(Tag as never) as typeof motion.span;

  if (variant === "fade-up" || variant === "slide-up" || variant === "clip") {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: delay } },
        }}
        className={className}
      >
        <MotionTag variants={currentVariant}>
          {children}
        </MotionTag>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      custom={staggerChildren}
      className={className}
      aria-label={children}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={currentVariant}
          style={{ display: "inline-block", whiteSpace: variant === "words" ? "pre" : "normal" }}
          transition={{ delay: i * staggerChildren + delay }}
        >
          {item}
          {variant === "words" && i < items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.div>
  );
}
