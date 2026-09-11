"use client";

import { useRef, useState } from "react";
import { BuyBlueprintButton } from "@/components/BuyBlueprintButton";

const auditPoints = [
  {
    id: "01",
    title: "Structured Outputs",
    desc: "Can your application safely consume model output without trusting the model to get the format right?",
    risk: "Malformed output can break downstream application logic.",
  },
  {
    id: "02",
    title: "Tool Call Validation",
    desc: "Does every tool invocation pass schema, authorization, argument, and business-rule validation before execution?",
    risk: "An LLM should never be the final authority over what your system executes.",
  },
  {
    id: "03",
    title: "State Management",
    desc: "Can the agent recover from retries, interrupted runs, duplicate events, and partial execution without corrupting state?",
    risk: "Retries without state discipline can create duplicate or contradictory actions.",
  },
  {
    id: "04",
    title: "Context Control",
    desc: "Do you have explicit rules for what enters the context window, what gets summarized, what gets discarded, and what gets retrieved?",
    risk: "More context can increase cost, latency, and sometimes reduce reliability.",
  },
  {
    id: "05",
    title: "Failure & Retry Logic",
    desc: "What happens when a model call times out, a tool fails, a provider returns an error, or a workflow stops halfway through?",
    risk: "A production system needs defined failure paths—not just another model call.",
  },
  {
    id: "06",
    title: "Hallucination Boundaries",
    desc: "Which claims can the model generate freely—and which must be grounded in retrieved data, tool results, or application state?",
    risk: "The safest hallucination is often the one the architecture makes impossible.",
  },
  {
    id: "07",
    title: "Token Economics",
    desc: "Can you measure cost per task, identify expensive steps, and enforce context and output budgets?",
    risk: "AI cost problems are usually pipeline problems, not just model-selection problems.",
  },
  {
    id: "08",
    title: "Observability",
    desc: "Can you reconstruct what the model saw, what it decided, which tools it called, and where the run failed?",
    risk: "If you cannot reconstruct a failed run, debugging becomes guesswork.",
  },
  {
    id: "09",
    title: "Production Guardrails",
    desc: "Are authentication, authorization, rate limits, input validation, tool permissions, and execution limits enforced outside the prompt?",
    risk: "Prompts are instructions. They are not security boundaries.",
  },
  {
    id: "10",
    title: "End-to-End Testing",
    desc: "Do your tests cover malformed outputs, tool failures, retries, adversarial inputs, stale context, and partial execution—not just successful conversations?",
    risk: "Happy-path tests prove the demo works. Failure tests prove the system can survive.",
  },
];

const failureRows = [
  {
    trigger: "Model returns malformed output",
    result: "Parser throws → workflow stops",
  },
  {
    trigger: "Tool receives invalid arguments",
    result: "Bad request reaches your API",
  },
  {
    trigger: "Tool succeeds but response is wrong",
    result: "Agent continues from bad state",
  },
  {
    trigger: "Context grows without bounds",
    result: "Latency and token cost climb",
  },
  {
    trigger: "Model cannot answer confidently",
    result: "It fills the gap with an invented answer",
  },
  {
    trigger: "Workflow retries blindly",
    result: "Duplicate side effects occur",
  },
  {
    trigger: "Production run fails",
    result: "Nobody can reconstruct why",
  },
];

const blueprintFeatures = [
  "Reference agent architecture",
  "Structured-output implementation patterns",
  "Tool validation pipeline",
  "Retry and backoff decision tree",
  "Idempotency patterns for tool execution",
  "Context-budgeting framework",
  "Agent state-machine patterns",
  "Hallucination containment patterns",
  "Observability event schema",
  "Production test matrix",
  "Failure-mode worksheet",
  "Cost-per-task calculator",
];

const faqs = [
  {
    q: "Is this for developers or non-technical AI users?",
    a: "This is for engineers, technical founders, and builders shipping software with LLMs, function calling, agents, RAG pipelines, or multi-step AI workflows.",
  },
  {
    q: "What do I actually get for free?",
    a: "You get the 10-Point Production Audit, a 0–100 Production Readiness Scorecard, a JSON Schema Swipe File, and a practical Failure Mode Checklist.",
  },
  {
    q: "How does the Production Readiness Score work?",
    a: "The audit evaluates 10 architectural areas. Each category contributes to a 100-point score. 90–100 indicates a strong production foundation, 75–89 indicates manageable risk, 50–74 indicates significant failure exposure, and below 50 indicates high production risk.",
  },
  {
    q: "Do I need to use a specific LLM provider?",
    a: "No. The architecture patterns are provider-agnostic and apply across OpenAI, Anthropic, Google Gemini, Ollama, and other hosted or local model providers.",
  },
  {
    q: "Is this another prompt-engineering ebook?",
    a: "No. The audit focuses on the architecture surrounding the model: schema enforcement, tool validation, state, retry boundaries, context budgets, observability, guardrails, and testing.",
  },
  {
    q: "What happens after I get the kit?",
    a: "Use the checklist against an actual system and calculate your production-readiness score. If you identify gaps you want to fix, the $39 Blueprint provides implementation patterns for the same ten areas.",
  },
];

export default function AgenticArchitectureLanding() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);

  const focusEmailInput = () => {
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to register your email. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="top"
      className="min-h-screen scroll-smooth bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950"
    >
      {/* =========================================================
          TOP BANNER
      ========================================================== */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 px-4 py-2 text-center font-mono text-[11px] text-slate-400">
        Free Developer Resource · 10-Point Agentic Production Audit
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="flex items-center gap-2"
            aria-label="Agentic Architecture home"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            <span className="font-mono text-sm font-semibold tracking-tight text-slate-200">
              AgenticArchitecture
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 text-xs font-medium text-slate-400 md:flex"
          >
            <a href="#audit" className="transition hover:text-slate-200">
              The Audit
            </a>
            <a href="#included" className="transition hover:text-slate-200">
              Free Kit
            </a>
            <a href="#blueprint" className="transition hover:text-slate-200">
              Blueprint
            </a>
            <a href="#faq" className="transition hover:text-slate-200">
              FAQ
            </a>
          </nav>

          <a
            href="#get-kit"
            onClick={focusEmailInput}
            className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 font-mono text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20"
          >
            Get the Free Kit →
          </a>
        </div>
      </header>

      <main>
        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative mx-auto max-w-5xl px-6 pb-20 pt-16 text-center sm:pt-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 font-mono text-xs text-cyan-300">
            FREE 10-POINT PRODUCTION AUDIT
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-50 sm:text-6xl">
            Before you ship your AI agent,
            <br className="hidden sm:inline" />{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              run this audit.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Find the architectural failure points most likely to break your AI
            system in production—before real users, real data, and real traffic
            find them for you.
          </p>

          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-[11px] text-slate-500">
            <span>Structured Outputs</span>
            <span>·</span>
            <span>Tool Calls</span>
            <span>·</span>
            <span>State</span>
            <span>·</span>
            <span>Context</span>
            <span>·</span>
            <span>Retries</span>
            <span>·</span>
            <span>Cost</span>
            <span>·</span>
            <span>Observability</span>
          </div>

          {/* Lead Capture */}
          <div id="get-kit" className="mx-auto mt-9 max-w-md scroll-mt-28">
            {submitted ? (
              <div className="rounded-lg border border-cyan-500/40 bg-cyan-950/50 p-5 text-left">
                <div className="font-mono text-sm font-semibold text-cyan-300">
                  ✓ Check your inbox
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  We've sent you a confirmation email. Click the link in that
                  email to confirm your subscription and get your Agentic
                  Architecture Kit.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleLeadSubmit}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  ref={emailInputRef}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Where should we send the audit?"
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="whitespace-nowrap rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Preparing..." : "Run Free Audit →"}
                </button>
              </form>
            )}

            {errorMessage && (
              <p className="mt-2 text-left font-mono text-xs text-rose-400">
                {errorMessage}
              </p>
            )}

            <div className="mt-3 flex items-center justify-center gap-3 font-mono text-xs text-slate-500">
              <span>Free forever</span>
              <span>•</span>
              <span>PDF + JSON</span>
              <span>•</span>
              <span>No spam</span>
            </div>
          </div>

          {/* Scorecard Visual */}
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 text-left shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2">production-audit.json</span>
              </span>

              <span className="text-amber-400">6/10 passed</span>
            </div>

            <div className="grid items-center gap-8 p-6 sm:grid-cols-2">
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-300">
                <code>{`{
  "structuredOutput": true,
  "toolValidation": false,
  "retryStrategy": "missing",
  "contextBudget": "unknown",
  "observability": false,
  "productionRisk": "high"
}`}</code>
              </pre>

              <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 p-5">
                <div className="flex items-end justify-between">
                  <span className="text-xs text-slate-400">
                    Production Readiness
                  </span>

                  <span className="text-3xl font-bold text-rose-400">
                    62<span className="text-base">/100</span>
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full w-[62%] rounded-full bg-rose-400"
                    aria-label="62 out of 100 production readiness"
                  />
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  <span className="font-semibold text-slate-300">
                    4 areas need attention.
                  </span>{" "}
                  The architecture has failure points that may not appear during
                  happy-path testing.
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-slate-600">
            Example scorecard shown for illustration. Your score depends on the
            architecture you evaluate.
          </p>
        </section>

        {/* =========================================================
            PROBLEM
        ========================================================== */}
        <section className="border-t border-slate-800/80 bg-slate-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
              The Problem
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              A working demo is not a production architecture.
            </h2>

            <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
              The happy path works. The prompt looks clever. The model gives a
              beautiful answer. Then real users, real data, and real traffic
              expose everything the demo never tested.
            </p>

            <div className="mt-10 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
              {failureRows.map((row) => (
                <div
                  key={row.trigger}
                  className="flex flex-col gap-2 border-b border-slate-800 p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <span className="flex items-center gap-3 font-mono text-sm text-slate-300">
                    <span aria-hidden="true" className="text-rose-400">
                      ✕
                    </span>
                    {row.trigger}
                  </span>

                  <span className="font-mono text-xs text-rose-400 sm:text-sm">
                    {row.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            10 POINT AUDIT
        ========================================================== */}
        <section
          id="audit"
          className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20"
        >
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
              The 10-Point Audit
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Ten checks between a demo and production.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              Each check targets a different class of failure. Score what you
              have today—not what you plan to build later.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {auditPoints.map((item) => (
              <article
                key={item.id}
                className="group rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 transition hover:border-slate-700 hover:bg-slate-900/60"
              >
                <div className="flex gap-4">
                  <span className="shrink-0 font-mono text-sm font-bold text-cyan-400">
                    {item.id}
                  </span>

                  <div>
                    <h3 className="text-base font-semibold text-slate-200">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.desc}
                    </p>

                    <div className="mt-4 border-l border-slate-700 pl-3">
                      <p className="text-xs leading-relaxed text-slate-500">
                        <span className="font-semibold text-slate-400">
                          Why it matters:
                        </span>{" "}
                        {item.risk}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#get-kit"
              onClick={focusEmailInput}
              className="inline-flex rounded-lg bg-cyan-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              Get the Free Audit Kit →
            </a>
          </div>
        </section>

        {/* =========================================================
            ARCHITECTURE
        ========================================================== */}
        <section className="border-y border-slate-800/80 bg-slate-900/20 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                The Architecture
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                The model is only one part of the system.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Production reliability comes from the deterministic systems
                surrounding the model—not just the prompt.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-slate-800/90 bg-slate-950/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 font-mono text-[11px] text-slate-500">
                <span>SYSTEM BOUNDARY</span>
                <span className="text-cyan-400">DETERMINISTIC CONTROLS</span>
              </div>

              <div className="mx-auto mt-6 max-w-xs rounded-lg border border-cyan-500/40 bg-cyan-950/30 p-4 text-center shadow-lg shadow-cyan-950/20">
                <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
                  Reasoning Core
                </div>

                <div className="mt-1 text-sm font-semibold text-slate-100">
                  LLM Model Call
                </div>
              </div>

              <div
                aria-hidden="true"
                className="mx-auto my-1 h-6 w-px bg-slate-700"
              />

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "OUTPUT", sub: "Schema Validation" },
                  { label: "TOOLS", sub: "Payload + Auth" },
                  { label: "CONTEXT", sub: "Budget + Retrieval" },
                ].map((block) => (
                  <div
                    key={block.label}
                    className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center"
                  >
                    <div className="font-mono text-[10px] font-bold text-cyan-400">
                      {block.label}
                    </div>

                    <div className="mt-1 text-[11px] text-slate-300">
                      {block.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="mx-auto my-1 h-6 w-px bg-slate-700"
              />

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "STATE", sub: "Idempotent Stores" },
                  { label: "TELEMETRY", sub: "Trace + Events" },
                  { label: "RECOVERY", sub: "Retry + DLQ" },
                ].map((block) => (
                  <div
                    key={block.label}
                    className="rounded-lg border border-slate-800/60 bg-slate-900/30 p-2.5 text-center"
                  >
                    <div className="font-mono text-[9px] text-slate-400">
                      {block.label}
                    </div>

                    <div className="mt-0.5 text-[10px] text-slate-500">
                      {block.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-slate-400">
              <span className="font-semibold text-slate-200">
                The audit evaluates the system around the model.
              </span>{" "}
              That is where many production failures become expensive.
            </p>
          </div>
        </section>

        {/* =========================================================
            FREE KIT
        ========================================================== */}
        <section
          id="included"
          className="scroll-mt-24 border-b border-slate-800/80 bg-slate-900/20 px-6 py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                Inside the Free Kit
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                A working developer reference.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                No 47-page theory dump. Just the tools you need to evaluate an
                actual AI system.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "01",
                  title: "Production Audit",
                  desc: "The 10-point checklist for evaluating an actual AI system.",
                },
                {
                  label: "02",
                  title: "Readiness Scorecard",
                  desc: "Turn architectural risk into a simple 0–100 score.",
                },
                {
                  label: "03",
                  title: "JSON Schema Swipe File",
                  desc: "Copyable patterns for safer structured model output.",
                },
                {
                  label: "04",
                  title: "Failure Checklist",
                  desc: "Practical questions to ask before shipping.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5"
                >
                  <div className="mb-3 font-mono text-xs font-bold text-cyan-400">
                    {item.label}
                  </div>

                  <h3 className="font-semibold text-slate-200">{item.title}</h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="#get-kit"
                onClick={focusEmailInput}
                className="inline-flex rounded-lg bg-cyan-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
              >
                Get the Free Architecture Kit →
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            FUNNEL
        ========================================================== */}
        <section className="border-b border-slate-800/80 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                The Path
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                Find. Fix. Verify.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                One progression from self-assessment to implementation to expert
                review.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Find",
                  name: "Free Production Audit",
                  desc: "Identify architectural risks and calculate your readiness score.",
                },
                {
                  number: "02",
                  title: "Fix",
                  name: "Agentic Architecture Blueprint",
                  desc: "Get implementation patterns for addressing the ten production problems.",
                },
                {
                  number: "03",
                  title: "Verify",
                  name: "Architecture Review",
                  desc: "Have your actual system reviewed and receive prioritized recommendations.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-6"
                >
                  <div className="font-mono text-xs text-cyan-400">
                    {step.number}
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-slate-100">
                    {step.title}
                  </h3>

                  <div className="mt-1 text-sm font-semibold text-slate-300">
                    {step.name}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            BLUEPRINT
        ========================================================== */}
        <section
          id="blueprint"
          className="scroll-mt-24 border-b border-slate-800/80 bg-slate-950 px-6 py-24"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                Fix the Problems
              </span>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                The audit finds the problems.
                <br />
                The Blueprint shows you how to fix them.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Ten production problems → ten architecture solutions.
              </p>
            </div>

            <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl sm:p-12">
              <div className="absolute -top-3 right-8 rounded-full bg-cyan-500 px-3 py-0.5 font-mono text-[10px] font-bold uppercase text-slate-950">
                Early Access
              </div>

              <div className="mb-2 font-mono text-xs uppercase tracking-wider text-cyan-400">
                The Paid Implementation Guide
              </div>

              <h3 className="text-2xl font-bold text-slate-100 sm:text-3xl">
                Agentic Architecture Blueprint
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                A practical reference for turning an experimental LLM workflow
                into a system designed for reliability, cost control, and
                predictable behavior.
              </p>

              <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                {blueprintFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-xs">
                    <span className="mt-0.5 font-mono text-cyan-400">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-6 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-slate-100">
                      $39
                    </span>

                    <span className="font-mono text-xs text-slate-400">
                      one-time
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Lifetime access to the current Blueprint and future updates.
                  </p>
                </div>

                <BuyBlueprintButton />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ARCHITECTURE REVIEW
        ========================================================== */}
        <section className="border-b border-slate-800/80 bg-slate-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl rounded-xl border border-slate-800 bg-slate-950 p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  Verify Your Actual System
                </span>

                <h3 className="mt-2 text-xl font-bold text-slate-100 sm:text-2xl">
                  Want someone to look at your actual architecture?
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
                  The Architecture Review is for teams who would rather find
                  production risks during a review than through customer support
                  tickets.
                </p>
              </div>

              <a
                href="mailto:contact@getblueprintos.com?subject=Architecture%20Review%20Inquiry"
                className="whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-5 py-3 font-mono text-xs font-medium text-slate-200 transition hover:bg-slate-800"
              >
                Learn About Reviews →
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHO IT IS FOR
        ========================================================== */}
        <section className="mx-auto max-w-4xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/20 p-6">
              <h4 className="mb-5 font-mono text-xs uppercase tracking-widest text-cyan-400">
                This is for you if...
              </h4>

              <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                <li>• You&apos;re building an AI agent or LLM application.</li>
                <li>• Your prototype is becoming a real product.</li>
                <li>
                  • You&apos;re using tool calling, RAG, structured outputs, or
                  multi-step workflows.
                </li>
                <li>• You care about reliability and production costs.</li>
                <li>
                  • You want architecture patterns rather than prompt tricks.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/20 p-6">
              <h4 className="mb-5 font-mono text-xs uppercase tracking-widest text-slate-500">
                Probably not for you if...
              </h4>

              <ul className="space-y-3 text-sm leading-relaxed text-slate-400">
                <li>• You want a beginner introduction to AI.</li>
                <li>• You only want prompt-writing tips.</li>
                <li>• You&apos;re not building software.</li>
                <li>• You want a collection of generic AI prompts.</li>
                <li>
                  • You don&apos;t care what happens after the demo works.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================
            FAQ
        ========================================================== */}
        <section
          id="faq"
          className="scroll-mt-24 border-t border-slate-800/80 px-6 py-20"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
                FAQ
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-100">
                Questions developers ask.
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-lg border border-slate-800 bg-slate-900/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 text-sm font-medium text-slate-200">
                    <span>{faq.q}</span>

                    <span
                      aria-hidden="true"
                      className="font-mono text-cyan-400 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>

                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================== */}
        <section className="border-t border-slate-800/80 bg-slate-900/30 px-6 py-24 text-center">
          <div className="mx-auto max-w-xl">
            <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400">
              Before You Ship
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Your agent works.
              <br />
              But is it production-ready?
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Get the audit. Find the weak points. Fix them before your users,
              infrastructure, or API bill does.
            </p>

            <div className="mt-8">
              <a
                href="#get-kit"
                onClick={focusEmailInput}
                className="inline-flex rounded-lg bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
              >
                Get the Free Production Audit →
              </a>

              <p className="mt-3 font-mono text-xs text-slate-500">
                Free forever · PDF + JSON · No spam
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="border-t border-slate-800/80 px-6 py-10 text-center text-xs font-mono text-slate-500">
        <div className="mb-4 flex justify-center gap-6">
          <a href="/privacy" className="transition hover:text-slate-300">
            Privacy
          </a>

          <a href="/terms" className="transition hover:text-slate-300">
            Terms
          </a>

          <a
            href="mailto:contact@getblueprintos.com"
            className="transition hover:text-slate-300"
          >
            Contact
          </a>
        </div>

        <p>© 2026 Agentic Architecture.</p>
      </footer>
    </div>
  );
}
