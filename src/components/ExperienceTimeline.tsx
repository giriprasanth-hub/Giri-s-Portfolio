import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-container" style={{ paddingBottom: '150px' }}>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="text-gradient">Experience</span>
      </motion.h2>

      <div ref={containerRef} style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', paddingLeft: '40px' }}>
        
        {/* Background Track Line */}
        <div style={{ position: 'absolute', left: '19px', top: 0, bottom: 0, width: '2px', background: 'var(--border-light)' }}></div>
        
        {/* Animated Fill Line */}
        <motion.div 
          style={{ 
            position: 'absolute', left: '19px', top: 0, width: '2px', 
            background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-purple))',
            height: lineHeight,
            boxShadow: '0 0 10px var(--neon-cyan)'
          }}
        />

        {/* Experience Item */}
        <div style={{ position: 'relative', paddingBottom: '3rem' }}>
          
          {/* Timeline Node Icon */}
          <motion.div 
            style={{ 
              position: 'absolute', left: '-40px', top: '0', 
              width: '40px', height: '40px', 
              borderRadius: '50%', background: 'var(--bg-base)', border: '2px solid var(--neon-cyan)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: 'var(--neon-cyan)', zIndex: 2
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
          >
            <FaBriefcase size={16} />
          </motion.div>

          {/* Content Card */}
          <motion.div 
            className="glass-panel"
            style={{ padding: '2rem', marginLeft: '2rem' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px var(--border-glow)' }}
          >
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              MERN Stack Developer Intern
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Hitasoft</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '4px 12px', background: 'var(--bg-base)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>June 2025 - July 2025</span>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Developed a scalable full-stack eCommerce system using MongoDB, Express.js, React.js, and Node.js.',
                'Designed RESTful APIs for authentication, cart, and order management.',
                'Optimized frontend-backend integration to improve application performance.'].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '1rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--neon-emerald)', marginTop: '2px' }}>▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
