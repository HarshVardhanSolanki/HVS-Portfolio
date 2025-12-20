import React from 'react';
import { User } from 'lucide-react';

interface AboutProps {
  aboutText?: string;
  isLoading: boolean;
}

export const About: React.FC<AboutProps> = ({ aboutText, isLoading }) => {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-surface rounded-lg text-primary">
          <User size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">About Me</h2>
      </div>

      <div className="bg-surface/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-700 rounded w-11/12"></div>
            <div className="h-4 bg-slate-700 rounded w-4/5"></div>
            <div className="h-4 bg-slate-700 rounded w-full"></div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-muted leading-relaxed whitespace-pre-line">
            {aboutText || "No information available yet."}
          </div>
        )}
      </div>
    </section>
  );
};