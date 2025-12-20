import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";
import { 
  Github, 
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

// --- Data ---
const PROFILE = {
  name: "Harsh Vardhan Solanki",
  title: "Aspiring Data Scientist",
  email: "harshpratapsinghhh@gmail.com",
  location: "Bhopal, Madhya Pradesh",
  linkedin: "https://linkedin.com/in/harshvsolanki",
  objective: "Motivated undergraduate aiming to leverage diverse skills in Data Science, AI, and digital marketing.",
  languages: ["Native Hindi", "Full Professional English"],
  education: [
    {
      degree: "B.Tech in Data Science",
      institution: "Rajiv Gandhi Prodyogiki Vishwavidyalaya",
      year: "2025–2029",
      desc: "Focusing on core data science principles, machine learning algorithms, and statistical analysis."
    }
  ],
  experience: [
    {
      role: "Volunteer (Student Management)",
      company: "Bansal Institute of Science & Technology",
      year: "Aug 2025 – Present",
      desc: "Handling student management and coordinating academic activities."
    }
  ],
  skills: {
    technical: ["Python", "C++", "C", "JavaScript", "HTML/CSS"],
    data: ["Tableau", "PowerBI", "Spreadsheets", "Visual Analytics"],
    core: ["Artificial Intelligence", "Machine Learning Foundations"],
    marketing: ["Google Ads", "Facebook Ads", "E-commerce Management"]
  },
  certifications: [
    "BCG Data Science Job Simulation",
    "Google Ads",
    "Sales Management",
    "Marketing Analytics"
  ]
};

// --- Components ---

const SkillTag = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-primary border border-slate-700 hover:border-primary/50 transition-colors print:border-slate-300 print:bg-white print:text-black">
    {Icon && <Icon size={14} />}
    {children}
  </span>
);

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 text-slate-100 print:text-black">
    {Icon && <Icon className="text-primary print:text-black" />}
    {children}
    <div className="h-px bg-slate-800 flex-grow ml-4 print:bg-slate-300"></div>
  </h2>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all print:bg-white print:border-slate-300 print:break-inside-avoid ${className}`}>
    {children}
  </div>
);

// --- AI Chatbot Component ---

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hi! I'm Harsh's AI Assistant. Ask me anything about his skills, experience, or education!" }
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemContext = `
        You are an AI assistant for the portfolio website of Harsh Vardhan Solanki.
        Here is Harsh's profile data:
        ${JSON.stringify(PROFILE)}
        
        Your goal is to answer questions about Harsh based ONLY on this data.
        Be professional, friendly, and concise. 
        If asked about something not in the data, strictly say you don't have that information but suggest contacting him directly via email.
        Harsh is an undergraduate student (B.Tech Data Science, 2025-2029).
      `;
      
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemContext,
        },
        // Only map valid history. The API handles the new message separate from history.
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-200">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-slate-100">Harsh's Assistant</h3>
                <p className="text-xs text-slate-400">Powered by Gemini AI</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-slate-900 rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}
                >
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

          {/* Input */}
          <div className="p-3 bg-slate-800 border-t border-slate-700">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary text-slate-900 p-2 rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-primary text-slate-900 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-200"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with AI
          </span>
        )}
      </button>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [typingText, setTypingText] = useState("");
  
  useEffect(() => {
    const text = PROFILE.title;
    let i = 0;
    const interval = setInterval(() => {
      setTypingText(text.substring(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-primary/30 selection:text-white pb-20 print:bg-white print:text-black">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-mono">
              HVS.
            </span>
            <div className="flex gap-4">
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

      <main className="max-w-5xl mx-auto px-4 pt-24 space-y-24 print:pt-0 print:space-y-12">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-10 min-h-[60vh] justify-center print:min-h-0 print:block">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-primary text-sm font-medium print:hidden">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Internships
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight print:text-black">
              Hi, I'm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary print:text-black">
                {PROFILE.name}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 font-mono h-8 print:text-slate-700 print:h-auto">
              <span className="typing-cursor">{typingText}</span>
            </p>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed print:text-slate-600">
              {PROFILE.objective}
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-500 print:text-slate-600">
              <Globe size={16} />
              <span>{PROFILE.languages.join(" • ")}</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 print:hidden">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-primary text-slate-900 font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Mail size={18} /> Contact Me
              </a>
              <a 
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-slate-800 text-slate-200 font-medium rounded-lg hover:bg-slate-700 transition-colors border border-slate-700 flex items-center gap-2"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 bg-slate-800 text-slate-200 font-medium rounded-lg hover:bg-slate-700 transition-colors border border-slate-700 flex items-center gap-2"
              >
                <Download size={18} /> Download CV
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end print:hidden">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Abstract decorative graphic representing Data/AI */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="relative bg-slate-800 border border-slate-700 rounded-2xl w-full h-full p-6 flex flex-col justify-between shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-start">
                  <Database className="text-primary w-12 h-12" />
                  <span className="text-xs font-mono text-slate-500">DATA_SCIENTIST_INIT</span>
                </div>
                <div className="space-y-2 font-mono text-sm text-slate-400">
                  <p>> Importing knowledge...</p>
                  <p>> Training models...</p>
                  <p className="text-primary">> Ready to deploy.</p>
                </div>
                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="print:break-inside-avoid">
          <SectionTitle icon={Brain}>Technical Proficiency</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-primary print:text-black" size={20} />
                <h3 className="text-lg font-semibold text-slate-100 print:text-black">Languages & Core</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.technical.map(skill => (
                  <SkillTag key={skill} icon={Terminal}>{skill}</SkillTag>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-4">
                <BarChart className="text-secondary print:text-black" size={20} />
                <h3 className="text-lg font-semibold text-slate-100 print:text-black">Analytics & Viz</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.data.map(skill => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Brain className="text-pink-500 print:text-black" size={20} />
                <h3 className="text-lg font-semibold text-slate-100 print:text-black">AI & Machine Learning</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.core.map(skill => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink className="text-green-500 print:text-black" size={20} />
                <h3 className="text-lg font-semibold text-slate-100 print:text-black">Digital Marketing</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.marketing.map(skill => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Experience & Education Grid */}
        <div className="grid md:grid-cols-2 gap-12 print:grid-cols-1 print:gap-8">
          
          <section id="education" className="print:break-inside-avoid">
            <SectionTitle icon={GraduationCap}>Education</SectionTitle>
            <div className="space-y-6">
              {PROFILE.education.map((edu, idx) => (
                <div key={idx} className="relative pl-8 border-l border-slate-700 print:border-slate-300">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-slate-900 print:ring-white"></div>
                  <h3 className="text-lg font-bold text-slate-100 print:text-black">{edu.degree}</h3>
                  <div className="text-primary text-sm mb-1 print:text-slate-700">{edu.institution}</div>
                  <div className="text-slate-500 text-xs mb-3 font-mono print:text-slate-500">{edu.year}</div>
                  <p className="text-slate-400 text-sm print:text-slate-700">{edu.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="print:break-inside-avoid">
            <SectionTitle icon={Briefcase}>Experience</SectionTitle>
            <div className="space-y-6">
              {PROFILE.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 border-l border-slate-700 print:border-slate-300">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-secondary ring-4 ring-slate-900 print:ring-white"></div>
                  <h3 className="text-lg font-bold text-slate-100 print:text-black">{exp.role}</h3>
                  <div className="text-secondary text-sm mb-1 print:text-slate-700">{exp.company}</div>
                  <div className="text-slate-500 text-xs mb-3 font-mono print:text-slate-500">{exp.year}</div>
                  <p className="text-slate-400 text-sm print:text-slate-700">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Certifications */}
        <section id="certifications" className="print:break-inside-avoid">
          <SectionTitle icon={Award}>Certifications</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-2">
            {PROFILE.certifications.map((cert, idx) => (
              <Card key={idx} className="p-4 flex flex-col justify-center items-center text-center group hover:bg-slate-800 transition-colors cursor-default print:border-slate-300">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors print:bg-slate-100">
                  <Award className="text-slate-400 group-hover:text-primary transition-colors print:text-black" size={20} />
                </div>
                <h4 className="font-medium text-slate-200 text-sm print:text-black">{cert}</h4>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <section id="contact" className="py-12 border-t border-slate-800 print:border-slate-300 print:break-inside-avoid">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 print:text-black">Let's Connect</h2>
              <p className="text-slate-400 print:text-slate-600">Open to opportunities in Data Science & AI.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors print:text-black">
                <Mail size={18} /> {PROFILE.email}
              </a>
              <div className="flex items-center gap-3 text-slate-300 print:text-black">
                <MapPin size={18} /> {PROFILE.location}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-center py-6 text-slate-600 text-sm print:hidden">
        <p>&copy; {new Date().getFullYear()} Harsh Vardhan Solanki. Built with React & Gemini AI.</p>
      </footer>

      <AIChatWidget />
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);