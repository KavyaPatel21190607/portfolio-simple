import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Blogs } from './components/Blogs';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Check if the current path is /cms or starts with /cms
    const currentPath = window.location.pathname;
    if (currentPath === '/cms' || currentPath.startsWith('/cms/')) {
      setIsRedirecting(true);
      // Redirect to CMS frontend running on port 3000
      window.location.href = 'http://localhost:3000';
    }
  }, []);

  // Show loading screen while redirecting to CMS
  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to CMS...</p>
        </div>
      </div>
    );
  }

  // Show portfolio homepage
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Testimonials />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
}
