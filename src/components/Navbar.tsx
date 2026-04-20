import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--bg-surface)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
      }}
    >
      <ul style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 2rem)', flexWrap: 'wrap', justifyContent: 'center' }}>
        {NAV_LINKS.map((link) => (
          <li key={link.id} style={{ position: 'relative' }}>
            <button
              onClick={() => scrollTo(link.id)}
              className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', outline: 'none' }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="active-nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--neon-cyan)',
                    boxShadow: '0 0 8px var(--neon-cyan)',
                    borderRadius: '2px',
                  }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};
