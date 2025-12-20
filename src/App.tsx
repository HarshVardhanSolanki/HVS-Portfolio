'use client';

import React, { useState, useEffect, useRef } from "react";
import { 
  Linkedin, 
  Mail,  
  Download, 
  Code, 
  Database, 
  Brain, 
  BarChart, 
  Terminal, 
  Send, 
  Bot, 
  X, 
  MessageSquare,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  ExternalLink
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// REPLACE WITH YOUR REAL GEMINI API KEY
const GEMINI_API_KEY = "AIzaSyB7KQOVnAjfHFtrKDF_1nQXkV4HuaLZOfc"; // Get from https://aistudio.google.com/app/apikey

const PROFILE = {
  name: "Harsh Vardhan Solanki",
  title: "Aspiring Data Scientist",
  email: "harshpratapsinghhh@gmail.com",
  location: "Bhopal, Madhya Pradesh",
  linkedin: "https://linkedin.com/in/harshvsolanki",
  objective: "Motivated undergraduate aiming to leverage diverse skills in Data Science, AI, and digital marketing to solve complex real-world problems.",
  education: [
    {
      degree: "B.Tech in Data Science",
      institution: "Rajiv Gandhi Prodyogiki Vishwavidyalaya",
      year: "2025–2029",
      desc: "Specializing in statistical modeling, algorithmic optimization, and data structures."
    }
  ],
  experience: [
    {
      role: "Volunteer (Student Management)",
      company: "Bansal Institute of Science & Technology",
      year: "Aug 2025 – Present",
      desc: "Coordinating student activities, managing academic databases, and streamlining administrative workflows."
    }
  ],
  skills: {
    technical: ["Python", "C++", "C", "JavaScript", "HTML/CSS"],
    data: ["Tableau", "PowerBI", "Spreadsheets", "Visual Analytics"],
    core: ["Artificial Intelligence", "Machine Learning Foundations", "Big Data Concepts"],
    marketing: ["Google Ads", "Facebook Ads", "E-commerce Strategy"]
  },
  certifications: [
    "BCG Data Science Job Simulation",
    "Google Ads Professional",
    "Sales Management Certification",
    "Marketing Analytics Specialist"
  ]
};

const SkillTag = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-400/50 transition-colors">
    {Icon && <Icon size={14} />}
    {children}
  </span>
);

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-slate-100">
    {Icon && <Icon className="text-cyan-400" />}
    {children}
    <div className="h-px bg-slate-800 flex-grow ml-4"></div>
  </h2>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all ${className}`}>
    {children}
  </div>
);

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hello! I'm Harsh's virtual assistant. Ask me about his skills, education, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("YOUR")) {
        throw new Error("No API key");
      }
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chat = model.startChat({
        history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
      });

      const result = await chat.sendMessage(`You are Harsh's career assistant. Answer briefly and professionally.\n\nUser: ${userMessage}`);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, AI assistant is unavailable. Please email Harsh directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                <Bot size={18} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Career Assistant</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <p className="text-[10px] text-slate-400">Online</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-cyan-400 text-slate-900' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl px-4 py-2 flex gap-1 items-center border border-slate-700">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-slate-800 border-t border-slate-700">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-cyan-400 text-slate-900 p-2 rounded-full hover:bg-cyan-300 disabled:opacity-50">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export default function App() {
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const text = PROFILE.title;
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(text.substring(0, i + 1));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-black text-white font-sans pb-20">
      <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-mono">HVS.ds</span>
          <div className="flex gap-6">
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><Linkedin size={20} /></a>
            <a href={`mailto:${PROFILE.email}`} className="text-slate-400 hover:text-white"><Mail size={20} /></a>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-24 space-y-24">
        <section className="flex flex-col-reverse md:flex-row items-center gap-12 min-h-screen justify-center">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              Undergraduate Student
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Harsh Vardhan <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Solanki</span>
            </h1>
            <p className="text-2xl md:text-4xl text-slate-300 font-mono">
              <span className="text-cyan-400">{typingText}<span className="animate-pulse">|</span></span>
            </p>
            <p className="text-lg text-slate-400 max-w-xl">{PROFILE.objective}</p>
            <div className="flex gap-4">
              <a href={`mailto:${PROFILE.email}`} className="px-8 py-3 bg-cyan-400 text-slate-900 font-bold rounded-xl hover:bg-cyan-300 flex items-center gap-2 shadow-lg">
                Hire Me <Briefcase size={18} />
              </a>
              <button onClick={() => window.print()} className="px-8 py-3 bg-slate-800 text-white border border-slate-700 rounded-xl hover:bg-slate-700 flex items-center gap-2">
                Resume <Download size={18} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl opacity-20 blur-3xl animate-pulse"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
                <Terminal className="text-cyan-400 w-12 h-12" />
                <div className="space-y-3 font-mono text-sm text-slate-400">
                  <div>$ model.fit(X_train, y_train)</div>
                  <div>$ accuracy: 0.987</div>
                  <div className="text-blue-400"> Searching for patterns...</div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <SectionTitle icon={Brain}>Expertise Stack</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400"><Code size={20} /></div><h3 className="text-xl font-bold">Programming</h3></div>
              <div className="flex flex-wrap gap-2">{PROFILE.skills.technical.map(s => <SkillTag key={s} icon={Terminal}>{s}</SkillTag>)}</div>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><BarChart size={20} /></div><h3 className="text-xl font-bold">Analytics & Viz</h3></div>
              <div className="flex flex-wrap gap-2">{PROFILE.skills.data.map(s => <SkillTag key={s} icon={Database}>{s}</SkillTag>)}</div>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-pink-500/10 text-pink-500"><Brain size={20} /></div><h3 className="text-xl font-bold">Data Science & AI</h3></div>
              <div className="flex flex-wrap gap-2">{PROFILE.skills.core.map(s => <SkillTag key={s} icon={Bot}>{s}</SkillTag>)}</div>
            </Card>
            <Card>
              <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-green-500/10 text-green-500"><ExternalLink size={20} /></div><h3 className="text-xl font-bold">Digital Marketing</h3></div>
              <div className="flex flex-wrap gap-2">{PROFILE.skills.marketing.map(s => <SkillTag key={s} icon={Globe}>{s}</SkillTag>)}</div>
            </Card>
          </div>
        </section>

        {/* Education & Experience */}
        <div className="grid md:grid-cols-2 gap-16">
          <section>
            <SectionTitle icon={GraduationCap}>Education</SectionTitle>
            {PROFILE.education.map((edu, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-cyan-400">{edu.institution}</p>
                <p className="text-slate-500 text-sm font-mono">{edu.year}</p>
                <p className="text-slate-400 mt-2">{edu.desc}</p>
              </div>
            ))}
          </section>
          <section>
            <SectionTitle icon={Briefcase}>Experience</SectionTitle>
            {PROFILE.experience.map((exp, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-cyan-400">{exp.company}</p>
                <p className="text-slate-500 text-sm font-mono">{exp.year}</p>
                <p className="text-slate-400 mt-2">{exp.desc}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Certifications */}
        <section>
          <SectionTitle icon={Award}>Certifications</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROFILE.certifications.map((cert, i) => (
              <Card key={i} className="text-center">
                <Award className="text-cyan-400 mx-auto mb-3" size={32} />
                <p className="font-semibold text-sm">{cert}</p>
              </Card>
            ))}
          </div>
        </section>

        <AIChatWidget />
      </main>

      <footer className="text-center py-10 text-slate-600 text-sm">
        © {new Date().getFullYear()} {PROFILE.name}. Built with ❤️ by HVS.
      </footer>
    </div>
  );
}