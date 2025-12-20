'use client';

import React, { useState, useEffect, useRef } from "react";
import { 
  Linkedin, 
  Mail, 
  MapPin, 
  Download, 
  ExternalLink, 
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
  Globe
} from "lucide-react";

// IMPORTANT: Replace with your actual Gemini API key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // Get from https://aistudio.google.com/app/apikey

// --- Data ---
const PROFILE = {
  name: "Harsh Vardhan Solanki",
  title: "Aspiring Data Scientist",
  email: "harshpratapsinghhh@gmail.com",
  location: "Bhopal, Madhya Pradesh",
  linkedin: "https://linkedin.com/in/harshvsolanki",
  objective: "Motivated undergraduate aiming to leverage diverse skills in Data Science, AI, and digital marketing to solve complex real-world problems.",
  languages: ["Native Hindi", "Full Professional English"],
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

// --- Components ---
const SkillTag = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-400/50 transition-colors print:border-slate-300 print:bg-white print:text-black">
    {Icon && <Icon size={14} />}
    {children}
  </span>
);

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-slate-100 print:text-black">
    {Icon && <Icon className="text-cyan-400 print:text-black" />}
    {children}
    <div className="h-px bg-slate-800 flex-grow ml-4 print:bg-slate-300"></div>
  </h2>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all print:bg-white print:border-slate-300 print:shadow-none print:break-inside-avoid ${className}`}>
    {children}
  </div>
);

// --- AI Chatbot Component ---
const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hello! I'm Harsh's virtual assistant. Ask me about his data science skills, education, or marketing experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Correct import for Google Gemini
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemContext = `
        You are the career assistant for Harsh Vardhan Solanki.
        Context:
        - Name: Harsh Vardhan Solanki
        - Role: Aspiring Data Scientist
        - Education: B.Tech Data Science (RGPV, 2025-2029)
        - Skills: ${[...PROFILE.skills.technical, ...PROFILE.skills.data, ...PROFILE.skills.core].join(", ")}
        - Experience: Volunteer at Bansal Institute since Aug 2025.
        - Marketing: Proficient in Google Ads, Facebook Ads.
        - Location: Bhopal, India.
        
        Guidelines:
        - Answer professional questions only.
        - Be enthusiastic, professional, and helpful.
        - If unsure, refer them to his email: ${PROFILE.email}.
        - Keep answers concise (max 3 sentences).
      `;

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.text }]
        })),
        generationConfig: { maxOutputTokens: 200 }
      });

      const result = await chat.sendMessage(systemContext + "\n\nUser: " + userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text: text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please email Harsh directly!" }]);
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
                <h3 className="font-semibold text-sm text-slate-100">Career Assistant</h3>
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

          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user' ? 'bg-cyan-400 text-slate-900 rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-2 flex gap-1 items-center border border-slate-700">
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
                placeholder="Ask about my skills..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-cyan-400 text-slate-900 p-2 rounded-full hover:bg-cyan-300 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-200"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    const text = PROFILE.title;
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen font-sans bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white selection:bg-cyan-400/30 pb-20 print:bg-white print:text-black">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 print:hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">
                HVS.ds
              </span>
              <div className="flex gap-6 items-center">
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${PROFILE.email}`} className="text-slate-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 pt-24 space-y-24 print:pt-0 print:space-y-8">
          {/* Hero Section */}
          <section className="flex flex-col-reverse md:flex-row items-center gap-12 min-h-[70vh] justify-center print:min-h-0 print:block">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-xs font-medium print:hidden">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                Undergraduate Student
              </div>

              <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight print:text-black">
                Harsh Vardhan <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 print:text-black">
                  Solanki
                </span>
              </h1>

              <div className="space-y-2">
                <p className="text-xl md:text-3xl text-slate-300 font-mono h-10 print:text-slate-800 print:h-auto">
                  <span className="text-cyan-400">{typingText}<span className="animate-pulse">|</span></span>
                </p>
                <div className="flex items-center gap-4 text-slate-500 text-sm font-mono">
                  <div className="flex items-center gap-1.5"><MapPin size={14} /> Bhopal, MP</div>
                  <div className="flex items-center gap-1.5"><Globe size={14} /> Hindi & English</div>
                </div>
              </div>

              <p className="text-lg text-slate-400 max-w-xl leading-relaxed print:text-slate-700">
                {PROFILE.objective}
              </p>

              <div className="flex flex-wrap gap-4 pt-4 print:hidden">
                <a href={`mailto:${PROFILE.email}`} className="px-8 py-3 bg-cyan-400 text-slate-900 font-bold rounded-xl hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/20">
                  Hire Me <Briefcase size={18} />
                </a>
                <button onClick={() => window.print()} className="px-8 py-3 bg-slate-800 text-slate-200 font-semibold rounded-xl hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2">
                  Resume <Download size={18} />
                </button>
              </div>
            </div>

            {/* Terminal Card - Visual */}
            <div className="flex-1 flex justify-center md:justify-end print:hidden">
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-[3rem] opacity-20 blur-3xl animate-pulse"></div>
                <div className="relative bg-slate-800 border border-slate-700 rounded-[2.5rem] w-full h-full p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
                  <div className="flex justify-between items-start">
                    <Terminal className="text-cyan-400 w-14 h-14" />
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-500 block">ENCRYPTION_ACTIVE</span>
                      <span className="text-[10px] font-mono text-cyan-400 block">STATUS: TRAINING</span>
                    </div>
                  </div>

                  <div className="space-y-4 font-mono text-xs md:text-sm text-slate-400">
                    <div className="flex gap-2"><span className="text-cyan-400">$</span> model.fit(X_train, y_train)</div>
                    <div className="flex gap-2"><span className="text-cyan-400">$</span> accuracy: 0.987</div>
                    <div className="flex gap-2 text-slate-200 bg-slate-700/50 p-2 rounded">
                      <span className="text-blue-400"></span> 
                      <span>Searching for patterns...</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>PROGRESS</span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills, Education, Experience, Certifications, Contact sections remain the same */}
          {/* ... (all other sections unchanged for brevity) ... */}

          {/* Skills Section */}
          <section id="skills" className="print:break-inside-avoid">
            <SectionTitle icon={Brain}>Expertise Stack</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
                    <Code size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Programming</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.skills.technical.map(skill => (
                    <SkillTag key={skill} icon={Terminal}>{skill}</SkillTag>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <BarChart size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Analytics & Viz</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.skills.data.map(skill => (
                    <SkillTag key={skill} icon={Database}>{skill}</SkillTag>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
                    <Brain size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Data Science & AI</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.skills.core.map(skill => (
                    <SkillTag key={skill} icon={Bot}>{skill}</SkillTag>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <ExternalLink size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Digital Marketing</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROFILE.skills.marketing.map(skill => (
                    <SkillTag key={skill} icon={Globe}>{skill}</SkillTag>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* Rest of sections (Education, Experience, Certifications, Contact) are unchanged */}
          {/* ... */}

          <footer className="text-center py-10 text-slate-600 text-sm print:hidden">
            <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights Reserved.</p>
            <p className="mt-2 font-mono text-[10px] text-slate-700 tracking-widest">BUILT_WITH_REACT_AND_GEMINI_AI</p>
          </footer>

          <AIChatWidget />
        </main>
      </div>
    </>
  );
}