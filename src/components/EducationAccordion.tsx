import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaChevronDown, FaTimes } from 'react-icons/fa';

const BASE = import.meta.env.BASE_URL;

const educationData = [
  {
    id: 'edu1',
    type: 'degree',
    title: 'B.Tech in Information Technology',
    institution: 'SRM Institute of Science and Technology',
    duration: '2023 - 2027',
    details: 'Current CGPA: 9.53 / 10. Foundational coursework in Data Structures, Algorithms, Operating Systems, Database Management Systems, and Software Engineering.',
    icon: <FaGraduationCap size={24} color="var(--neon-emerald)" />
  },
  {
    id: 'cert1',
    type: 'certification',
    title: 'Programming in Java',
    institution: 'IIT Kharagpur',
    duration: 'November 2024',
    details: 'Comprehensive study of Java core concepts, problem-solving, and object-oriented programming principles.',
    icon: <FaCertificate size={24} color="var(--neon-cyan)" />,
    certificateUrl: `${BASE}Nptel.jpg`
  },
  {
    id: 'cert2',
    type: 'certification',
    title: 'Cloud Computing',
    institution: 'IIT Kharagpur',
    duration: 'April 2025',
    details: 'Exploration of modern Cloud Computing paradigms, deployment models, and scalable architectures.',
    icon: <FaCertificate size={24} color="var(--neon-cyan)" />,
    certificateUrl: `${BASE}Cloud.jpg`
  },
  {
    id: 'cert3',
    type: 'certification',
    title: 'Database Structures and Management with MySQL',
    institution: 'Meta (Coursera)',
    duration: 'May 2025',
    details: 'Advanced schema design, complex query optimization, and relational database management methodologies.',
    icon: <FaCertificate size={24} color="var(--neon-purple)" />,
    certificateUrl: `${BASE}MySQL.jpg`
  },
  {
    id: 'cert4',
    type: 'certification',
    title: 'Introduction to Software Engineering',
    institution: 'IBM (Coursera)',
    duration: 'Feb 2025',
    details: 'Exploration of Agile/Scrum lifecycles, REST API design, and standard software engineering practices.',
    icon: <FaCertificate size={24} color="var(--neon-blue)" />,
    certificateUrl: `${BASE}IBM_se.jpg`
  },
  {
    id: 'cert5',
    type: 'certification',
    title: 'Introduction to Artificial Intelligence',
    institution: 'IBM (Coursera)',
    duration: 'March 2025',
    details: 'Foundational exploration of Artificial Intelligence concepts and modern AI tool workflows.',
    icon: <FaCertificate size={24} color="var(--neon-blue)" />,
    certificateUrl: `${BASE}IBM_AI.jpg`
  }
];

const AccordionItem: React.FC<{ item: typeof educationData[0]; isOpen: boolean; toggle: () => void; index: number; onViewCertificate: (url: string) => void }> = ({ item, isOpen, toggle, index, onViewCertificate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel"
      style={{ marginBottom: '1rem', overflow: 'hidden' }}
    >
      <button 
        onClick={toggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            {item.icon}
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{item.title}</h3>
            <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              {item.institution}
            </span>
          </div>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: 'var(--text-muted)' }}
        >
          <FaChevronDown />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", paddingBottom: "1.5rem" },
              collapsed: { opacity: 0, height: 0, paddingBottom: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div style={{ padding: '0 1.5rem', marginLeft: '4.5rem', color: 'var(--text-secondary)' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--neon-emerald)' }}>{item.duration}</strong>
              </p>
              <p>{item.details}</p>
              
              {item.certificateUrl && (
                <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); onViewCertificate(item.certificateUrl!); }}
                    className="btn-neon"
                    style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'inline-flex', gap: '8px', alignItems: 'center' }}
                  >
                    View Certificate
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const EducationAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(educationData[0].id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="education" className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="text-gradient">Education &amp; Certifications</span>
      </motion.h2>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {educationData.map((item, index) => (
          <AccordionItem 
            key={item.id} 
            item={item} 
            index={index}
            isOpen={openId === item.id} 
            toggle={() => setOpenId(openId === item.id ? null : item.id)} 
            onViewCertificate={setSelectedImage}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(3, 4, 11, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px var(--border-glow)',
                backgroundColor: 'var(--bg-base)'
              }}
            >
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <FaTimes size={18} />
              </button>
              <img 
                src={selectedImage} 
                alt="Certificate" 
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
