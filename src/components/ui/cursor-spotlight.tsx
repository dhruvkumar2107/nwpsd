"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorSpotlight() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  const spotX = useSpring(cursorX, springConfig);
  const spotY = useSpring(cursorY, springConfig);

  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const update = () => {
      cursorX.set(posRef.current.x);
      cursorY.set(posRef.current.y);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, handleMouseMove]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998] hidden lg:block"
      aria-hidden="true"
    >
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full"
        style={{
          x: spotX,
          y: spotY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(200,164,78,0.06) 0%, rgba(200,164,78,0.02) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
