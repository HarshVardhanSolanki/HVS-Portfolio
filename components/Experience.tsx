import React from 'react';
import { Briefcase } from 'lucide-react';
import { Job } from '../types';

interface ExperienceProps {
  jobs?: Job[];
  isLoading: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ jobs, isLoading }) => {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-surface rounded-lg text-primary">
          <Briefcase size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Experience</h2>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <>
            {[1, 2].map((i) => (
              <div key={i} className="bg-surface border border-slate-700 p-6 rounded-xl animate-pulse">
                <div className="h-6 bg-slate-700 w-1/3 mb-4 rounded"></div>
                <div className="h-4 bg-slate-700 w-1/4 mb-2 rounded"></div>
                <div className="h-4 bg-slate-700 w-full mt-4 rounded"></div>
              </div>
            ))}
          </>
        ) : (
          <div className="relative border-l-2 border-slate-700 ml-3 md:ml-6 space-y-12">
            {jobs?.map((job) => (
              <div key={job.id} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary ring-4 ring-background"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded w-fit mt-1 sm:mt-0">
                    {job.period}
                  </span>
                </div>
                
                <div className="text-lg text-secondary mb-4">{job.company}</div>
                
                <p className="text-muted leading-relaxed">
                  {job.description}
                </p>
              </div>
            ))}
            
            {(!jobs || jobs.length === 0) && (
              <div className="pl-8 text-muted italic">No experience loaded yet.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};