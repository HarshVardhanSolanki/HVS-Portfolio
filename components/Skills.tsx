import React from 'react';
import { Cpu, Code, Database, Brain } from 'lucide-react';
import { SkillCategory } from '../types';

export const Skills: React.FC = () => {
  const skillData: SkillCategory[] = [
    {
      name: "Programming",
      skills: ["Python", "R", "Java", "C++", "JavaScript"]
    },
    {
      name: "Data & ML",
      skills: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "SQL", "Tableau"]
    },
    {
      name: "Cloud & DevTools",
      skills: ["Oracle Cloud Infrastructure (OCI)", "Git", "Docker", "Linux", "Jupyter"]
    },
    {
      name: "Soft Skills",
      skills: ["Problem Solving", "Communication", "Team Leadership", "Agile Methodology"]
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case "Programming": return <Code size={20} />;
      case "Data & ML": return <Brain size={20} />;
      case "Cloud & DevTools": return <Database size={20} />;
      default: return <Cpu size={20} />;
    }
  };

  return (
    <section id="skills" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-surface rounded-lg text-primary">
          <Cpu size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">Skills Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillData.map((category) => (
          <div 
            key={category.name} 
            className="bg-surface border border-slate-700/50 rounded-xl p-6 hover:border-primary/50 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-4 text-secondary">
              {getIcon(category.name)}
              <h3 className="font-semibold text-lg text-white">{category.name}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 text-sm bg-background border border-slate-700 text-muted rounded-full hover:text-primary hover:border-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};