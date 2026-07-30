"use client";

import { useRef, Children, isValidElement, cloneElement } from "react";
import { useInView } from "framer-motion";

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
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const distance = 40;
  const directionOffset = () => {
    switch (direction) {
      case "up": return distance;
      case "down": return -distance;
      case "left": return distance;
      case "right": return -distance;
      default: return 0;
    }
  };

  const xOffset = direction === "left" || direction === "right" ? directionOffset() : 0;
  const yOffset = direction === "up" || direction === "down" ? directionOffset() : 0;

  return (
    <Component ref={ref} className={className} style={{ opacity: isInView ? 1 : 0, transform: isInView ? "none" : `translate(${xOffset}px, ${yOffset}px)`, transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`, willChange: "transform, opacity" }}>
      {children}
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
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as any, {
          style: {
            opacity: isInView ? 1 : 0,
            transform: isInView ? "none" : "translateY(20px)",
            transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${(i + 1) * gap}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${(i + 1) * gap}s`,
            willChange: "transform, opacity",
            ...(child.props.style || {}),
          } as React.CSSProperties,
        });
      })}
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
    <div
      ref={ref}
      className={`h-[2px] bg-gradient-to-r from-gold-400 via-gold-300 to-transparent ${className}`}
      style={{
        width: isInView ? "60px" : "0px",
        opacity: isInView ? 1 : 0,
        transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.5s ease ${delay}s`,
        willChange: "width, opacity",
      }}
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
