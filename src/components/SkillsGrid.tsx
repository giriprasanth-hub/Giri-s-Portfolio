import React from 'react';
import { motion, type Variants } from 'framer-motion';

const skillsData = [
  {
    category: 'MERN Stack',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    color: 'var(--neon-emerald)'
  },
  {
    category: 'Core & Languages',
    skills: ['Java', 'Python', 'JavaScript', 'SQL'],
    color: 'var(--neon-cyan)'
  },
  {
    category: 'Computer Science',
    skills: ['Data Structures', 'Algorithms', 'OOPS', 'OS', 'DBMS'],
    color: 'var(--neon-purple)'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export const SkillsGrid: React.FC = () => {
  return (
    <section id="skills" className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="text-gradient">Technical Arsenal</span>
      </motion.h2>

      <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {skillsData.map((group, i) => (
          <motion.div 
            key={i} 
            className="glass-panel" 
            style={{ padding: '2rem' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <h3 style={{ marginBottom: '1.5rem', color: group.color, fontFamily: 'var(--font-mono)' }}>
              {group.category}
            </h3>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}
            >
              {group.skills.map((skill, j) => (
                <motion.div
                  key={j}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    borderColor: group.color,
                    boxShadow: `0 0 15px ${group.color}40`,
                    color: '#fff'
                  }}
                  style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-base)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s, box-shadow 0.3s'
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
