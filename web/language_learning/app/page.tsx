import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { BookOpen, Sparkles, Globe, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">LinguaLeap</span>
        </div>
        <Link
          href={ROUTES.DASHBOARD}
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto -mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-violet-300">Master English, one lesson at a time</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="text-white">Learn English</span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            the smart way
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Structured lessons with grammar, vocabulary, pronunciation, and real-world dialogues.
          Build fluency step by step with an experience designed for serious learners.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={ROUTES.DASHBOARD}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-base shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-110 transition-all"
          >
            Start Learning
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href={ROUTES.LESSONS}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-700 text-slate-300 font-semibold text-base hover:border-slate-500 hover:text-white transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Browse Lessons
          </Link>
        </div>

        {/* Feature pills */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
          {[
            { icon: '📖', label: 'Structured Lessons', desc: 'Grammar, vocab & more' },
            { icon: '🎯', label: 'Clear Objectives', desc: 'Know what you'll learn' },
            { icon: '🗣️', label: 'Pronunciation', desc: 'IPA guides & audio' },
          ].map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-sm font-semibold text-white">{f.label}</span>
              <span className="text-xs text-slate-400">{f.desc}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-600">
        Built for learners who mean business.
      </footer>
    </div>
  );
}
