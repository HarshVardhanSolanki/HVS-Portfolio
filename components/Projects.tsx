import React from 'react';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: "1",
      title: "Predictive Analytics Dashboard",
      description: "A comprehensive dashboard analyzing stock market trends using LSTM neural networks and visualizing data with Streamlit.",
      tags: ["Python", "Streamlit", "TensorFlow", "Pandas"],
      github: "https://github.com",
      link: "#"
    },
    {
      id: "2",
      title: "OCI Cost Optimizer",
      description: "Automated script running on Oracle Functions to identify and terminate idle compute instances, saving 25% on cloud costs.",
      tags: ["Oracle Cloud", "Python", "Serverless", "DevOps"],
      github: "https://github.com",
    },
    {
      id: "3",
      title: "E-Commerce Recommendation Engine",
      description: "Collaborative filtering system built with PySpark to recommend products based on user purchase history.",
      tags: ["Spark", "Python", "Big Data", "Machine Learning"],
      github: "https://github.com",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-surface rounded-lg text-primary">
          <FolderGit2 size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-surface border border-slate-700 rounded-xl overflow-hidden hover:border-primary transition-all duration-300 flex flex-col h-full"
          >
            {/* Cyberpunk Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="p-6 flex flex-col h-full relative z-10">
              <div className="flex justify-between items-start mb-4">
                <FolderGit2 className="text-primary" size={40} />
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-muted mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-secondary bg-secondary/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};