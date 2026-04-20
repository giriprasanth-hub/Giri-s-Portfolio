import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsGrid } from './components/SkillsGrid';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { EducationAccordion } from './components/EducationAccordion';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero />
        <SkillsGrid />
        <ExperienceTimeline />
        <ProjectsShowcase />
        <EducationAccordion />
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '3rem 1.5rem', 
        borderTop: '1px solid var(--border-light)',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem'
      }}>
        <p>© {new Date().getFullYear()} Giriprasanth M.</p>
      </footer>
    </div>
  );
}

export default App;
