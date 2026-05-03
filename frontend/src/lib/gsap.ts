"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function revealOnScroll(
  elements: string | Element | Element[] | NodeListOf<Element>,
  options: gsap.TweenVars = {},
) {
  const normalized =
    typeof elements === "string" || elements instanceof Element
      ? elements
      : Array.from(elements);
  const trigger = Array.isArray(normalized) ? normalized[0] : normalized;

  return gsap.from(normalized, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start: "top 80%",
      once: true,
    },
    ...options,
  });
}

export function countUp(
  element: Element,
  end: number,
  prefix = "",
  suffix = "",
) {
  const state = { value: 0 };

  return gsap.to(state, {
    value: end,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
    onUpdate: () => {
      element.textContent =
        prefix + Math.round(state.value).toLocaleString() + suffix;
    },
  });
}
