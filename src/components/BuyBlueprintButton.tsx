// components/BuyBlueprintButton.tsx
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

export function BuyBlueprintButton() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.createLemonSqueezy) {
      window.createLemonSqueezy();
    }
  }, []);

  // Update with your actual Lemon Squeezy product URL
  const checkoutUrl =
    "https://blueprintos.lemonsqueezy.com/buy/2105867?embed=1&media=0";

  return (
    <a
      href={checkoutUrl}
      className="lemonsqueezy-button inline-flex items-center justify-center rounded-lg bg-cyan-500 px-8 py-3.5 font-sans text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      Get the Blueprint →
    </a>
  );
}
