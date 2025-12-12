import React, { useEffect, useState } from 'react';
import { Terminal, MapPin, Linkedin, Download } from 'lucide-react';

interface HeroProps {
  headline?: string;
  location?: string;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ headline, location, isLoading }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ["Data Science Student", "OCI Enthusiast", "Python Developer", "ML Engineer"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setDisplayText(isDeleting 
        ? fullText.substring(0, displayText.length - 1) 
        : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, roles, typingSpeed]);

  return (
    <section className="relative flex flex-col justify-center min-h-[80vh] pt-10">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 left-10 -z-10 w-60 h-60 bg-secondary/10 rounded-full blur-[80px]"></div>

      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center space-x-2 text-primary font-mono text-sm tracking-widest uppercase mb-4">
          <Terminal size={16} />
          <span>System.Init(Portfolio)</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Harsh Vardhan</span>
        </h1>

        <div className="h-12 md:h-16 flex items-center">
          <span className="text-2xl md:text-4xl font-semibold text-muted">
            I am a <span className="text-white border-r-4 border-primary px-1">{displayText}</span>
          </span>
        </div>

        {/* Dynamic Headline Section */}
        <div className="min-h-[60px]">
          {isLoading ? (
            <div className="h-4 bg-surface rounded w-3/4 animate-pulse"></div>
          ) : (
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              {headline || "Connecting dots with data."}
            </p>
          )}
        </div>
        
        {/* Dynamic Location */}
        <div className="flex items-center text-muted/80 text-sm">
           <MapPin size={16} className="mr-2 text-primary" />
           {isLoading ? (
             <div className="h-3 w-24 bg-surface rounded animate-pulse"></div>
           ) : (
             <span>{location || "Earth"}</span>
           )}
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <a 
            href="https://linkedin.com/in/harshvsolanki" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative px-6 py-3 bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20 hover:border-primary rounded font-medium transition-all duration-300 flex items-center gap-2"
          >
            <Linkedin size={20} />
            <span>Connect on LinkedIn</span>
            <div className="absolute inset-0 rounded ring-2 ring-primary/30 group-hover:ring-primary/60 animate-pulse-slow"></div>
          </a>
          
          <button className="px-6 py-3 bg-surface text-white border border-slate-700 hover:border-slate-500 rounded font-medium transition-colors flex items-center gap-2">
            <Download size={20} />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </section>
  );
};