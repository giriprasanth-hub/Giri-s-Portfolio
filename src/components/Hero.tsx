import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Typewriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 100 }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}<motion.span
    animate={{ opacity: [1, 0] }}
    transition={{ repeat: Infinity, duration: 0.8 }}
  >|</motion.span></span>;
};

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        style={{ y: y1, opacity, textAlign: 'center', zIndex: 10 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.h2 
          style={{ fontSize: '1.2rem', color: 'var(--neon-emerald)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          Hello, I'm
        </motion.h2>
        
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1rem', lineHeight: 1.1 }}>
          <span className="text-gradient">Giriprasanth M</span>
        </h1>
        
        <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Giri is always Hero
        </h3>

        <div style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', minHeight: '30px', marginBottom: '3rem', padding: '0 1rem' }}>
          <Typewriter text="Software Engineer | MERN Stack & Java" speed={70} />
        </div>

        <motion.div 
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 1rem' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <a href="https://github.com/giriprasanth-hub" target="_blank" rel="noreferrer" className="btn-neon">
            <FaGithub size={20} /> GitHub
          </a>
          <a href="https://linkedin.com/in/giriprasanth-m-0432b7314" target="_blank" rel="noreferrer" className="btn-neon" style={{ borderColor: 'var(--neon-purple)' }}>
            <FaLinkedin size={20} /> LinkedIn
          </a>
          <a href="mailto:giriprasanthmuthuraj@gmail.com" className="btn-neon" style={{ borderColor: 'var(--neon-emerald)' }}>
            <FaEnvelope size={20} /> Email
          </a>
        </motion.div>
      </motion.div>

      {/* Background embellishments */}
      <div className="mesh-bg"></div>
    </section>
  );
};
