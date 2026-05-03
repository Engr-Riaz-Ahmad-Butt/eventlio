"use client";

import { useEffect, useRef, MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGsapFadeUp — fades children up into view on scroll
 */
export function useGsapFadeUp<T extends HTMLElement>(
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    y?: number;
    start?: string;
  } = {}
): MutableRefObject<T | null> {
  const containerRef = useRef<T | null>(null);
  const { stagger = 0.12, delay = 0, duration = 0.85, y = 30, start = "top 85%" } = options;

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(".gsap-reveal", containerRef.current!);
      if (targets.length === 0) return;
      gsap.fromTo(
        targets,
        { opacity: 0, y, willChange: "transform, opacity" },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [stagger, delay, duration, y, start]);

  return containerRef;
}

/**
 * useGsapHeroTimeline — orchestrates the hero section entrance
 */
export function useGsapHeroTimeline<T extends HTMLElement>(): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(".hero-heading", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-cta", { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-image", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=0.5");
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * useGsapCounter — animates a number from 0 to target
 */
export function useGsapCounter(
  target: number,
  suffix = "",
  duration = 1.8
): MutableRefObject<HTMLSpanElement | null> {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString() + suffix;
        },
      });
    });
    return () => ctx.revert();
  }, [target, suffix, duration]);
  return ref;
}

/**
 * useGsapParallax — subtle parallax on scroll
 */
export function useGsapParallax<T extends HTMLElement>(speed = 0.3): MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -20 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });
    return () => ctx.revert();
  }, [speed]);
  return ref;
}

export default gsap;
