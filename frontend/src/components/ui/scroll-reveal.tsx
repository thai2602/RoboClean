"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  delay?: number;
  distance?: number;
}

export const ScrollReveal = ({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  distance = 30,
  className = "",
  ...props
}: ScrollRevealProps) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.215, 0.61, 0.355, 1] as const, // easeOutCubic
    },
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px 0px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
