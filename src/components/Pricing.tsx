// components/Pricing.tsx
import { BuyBlueprintButton } from "@/components/BuyBlueprintButton";

export default function Pricing() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 font-mono text-xs text-emerald-300">
        FULL PRODUCTION ACCESS
      </div>

      <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl">
        The Agentic Architecture Blueprint
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
        Everything you need to design, evaluate, and ship reliable multi-agent
        systems to production without hallucination loops.
      </p>

      <div className="mt-6 flex items-baseline justify-center gap-2">
        <span className="font-mono text-5xl font-extrabold text-white">
          $39
        </span>
        <span className="text-sm font-medium text-slate-400">one-time</span>
      </div>

      <div className="mt-8">
        <BuyBlueprintButton />
      </div>

      <p className="mt-3 font-mono text-xs text-slate-500">
        Direct .zip download + receipt via email · Instant access
      </p>
    </section>
  );
}
