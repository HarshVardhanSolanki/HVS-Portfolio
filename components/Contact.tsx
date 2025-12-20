import React from 'react';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="scroll-mt-24">
       <div className="bg-gradient-to-r from-surface to-background border border-slate-700 rounded-2xl p-8 md:p-12 text-center">
         <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's Connect</h2>
         <p className="text-muted max-w-xl mx-auto mb-8 text-lg">
           I'm currently looking for new opportunities in Data Science and Cloud Engineering. 
           Whether you have a question or just want to say hi, I'll try my best to get back to you!
         </p>

         <a 
           href="mailto:harshvsolanki@example.com"
           className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background font-bold rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300 mb-12"
         >
           <Mail size={20} />
           <span>Say Hello</span>
         </a>

         <div className="flex justify-center gap-8">
           <a href="https://linkedin.com/in/harshvsolanki" className="text-muted hover:text-[#0077b5] transition-colors transform hover:-translate-y-1">
             <Linkedin size={28} />
             <span className="sr-only">LinkedIn</span>
           </a>
           <a href="https://github.com" className="text-muted hover:text-white transition-colors transform hover:-translate-y-1">
             <Github size={28} />
             <span className="sr-only">GitHub</span>
           </a>
           <a href="https://twitter.com" className="text-muted hover:text-[#1DA1F2] transition-colors transform hover:-translate-y-1">
             <Twitter size={28} />
             <span className="sr-only">Twitter</span>
           </a>
         </div>
       </div>
    </section>
  );
};