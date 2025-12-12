import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { updateFromLinkedIn } from './services/linkedinService';
import { LinkedInProfile } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [profileData, setProfileData] = useState<LinkedInProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate the data fetching on mount
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await updateFromLinkedIn();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch LinkedIn data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary selection:text-background overflow-x-hidden">
      {/* Navigation / Progress Bar could go here */}
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12 space-y-24">
        
        <Hero 
          headline={profileData?.headline} 
          location={profileData?.location}
          isLoading={loading}
        />

        <About 
          aboutText={profileData?.about} 
          isLoading={loading}
        />

        <Skills />

        <Experience 
          jobs={profileData?.experience} 
          isLoading={loading}
        />

        <Projects />

        <Contact />
      </main>

      <footer className="py-8 text-center text-muted text-sm border-t border-surface mt-20">
        <p>© {new Date().getFullYear()} Harsh Vardhan Solanki. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-50">Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;