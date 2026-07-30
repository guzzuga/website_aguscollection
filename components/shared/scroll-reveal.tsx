"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const defaultTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

export function RevealItem({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const distance = 40;
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      default: return { opacity: 0 };
    }
  };

  return (
    <Component ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className={className}>
      <motion.div
        variants={{
          hidden: getInitial(),
          visible: { opacity: 1, y: 0, x: 0, transition: { ...defaultTransition, delay } },
        }}
      >
        {children}
      </motion.div>
    </Component>
  );
}

export function StaggerContainer({
  children,
  className = "",
  gap = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap } } }}
      className={className}
    >
      {children}
    </div>
  );
}

export function RevealLine({ className = "", delay = 0 }: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: "60px", opacity: 1 } : {}}
      transition={{ ...defaultTransition, duration: 1, delay }}
      className={`h-[2px] bg-gradient-to-r from-gold-400 via-gold-300 to-transparent ${className}`}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  eyebrowDelay = 0,
  titleDelay = 0.1,
  subtitleDelay = 0.2,
  dividerDelay = 0.05,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  eyebrowDelay?: number;
  titleDelay?: number;
  subtitleDelay?: number;
  dividerDelay?: number;
}) {
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  return (
    <div className={`mb-12 ${alignClass}`}>
      {eyebrow && (
        <RevealItem delay={eyebrowDelay}>
          <span className="label-eyebrow text-gold-600 dark:text-gold-300">{eyebrow}</span>
        </RevealItem>
      )}
      <div className="mt-1">
        <RevealLine delay={dividerDelay} />
      </div>
      <RevealItem delay={titleDelay}>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy dark:text-white sm:text-4xl">
          {title}
        </h2>
      </RevealItem>
      {subtitle && (
        <RevealItem delay={subtitleDelay}>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 dark:text-neutral-400 sm:text-lg">
            {subtitle}
          </p>
        </RevealItem>
      )}
    </div>
  );
}
