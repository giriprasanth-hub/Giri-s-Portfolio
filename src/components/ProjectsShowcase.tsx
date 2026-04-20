import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: 'Smart Kart',
    description: 'Designed a scalable MERN architecture with authentication, billing, and cart management. Built bilingual barcode-based billing system for real-time checkout processing.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    live: '#',
    github: '#'
  },
  {
    title: 'Airline Ticket Reservation System',
    description: 'Developed a Java Swing and JDBC-based airline booking system with ticket management modules. Integrated MySQL database and used Apache Ant for build automation.',
    techStack: ['Java Swing', 'JDBC', 'MySQL', 'Apache Ant'],
    github: '#'
  },
  {
    title: "HR Workflow Designer",
    description: "Built an interactive, visual drag-and-drop web application that allows HR professionals to design, visualize, and configure internal processes. Features a central canvas for composing node-based workflows (tasks, approvals, automated actions) that export to a structured JSON blueprint.",
    techStack: ["React", "ReactFlow", "TypeScript", "Tailwind CSS", "Vite"],
    live: "https://giriprasanth-hub.github.io/HR-WorkFlow-Designer/",
    github: "https://github.com/giriprasanth-hub/HR-WorkFlow-Designer/"
  },
  {
    title: "ContractIQ",
    description: "Built an AI-driven logistics contract and claims management platform. Designed a multi-agent architecture with a hybrid extraction engine to automatically parse PDF agreements, monitor shipment deadlines, and automate claim reporting.",
    techStack: ["Streamlit", "FastAPI", "PostgreSQL", "Google Gemini"],
    live: "#",
    github: "https://github.com/giriprasanth-hub/ContractIQ"
  },
  {
    title: "Smart Water Quality Monitoring System",
    description: "Engineered a machine learning system utilizing a Soft Voting Hybrid Ensemble model to categorize water samples based on physicochemical parameters. Conducted extensive data preprocessing and comparative model analysis for thesis research.",
    techStack: ["Python", "Machine Learning", "Random Forest", "XGBoost", "Ensemble Methods"],
    live: "#",
    github: "#"
  }
];

const TiltCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      className="project-card-container"
    >
      <motion.div
        className="glass-panel"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          height: '100%',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
          // overflow: 'hidden' <-- REMOVED to fix 3D stacking context issues
        }}
      >
        {/* Glow effect that follows mouse can be added here if needed */}
        
        <div style={{ transform: "translateZ(50px)", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>{project.title}</h3>
            <div style={{ display: 'flex', gap: '1rem', flexShrink: 0, marginTop: '4px' }}>
              {project.github && project.github !== '#' && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="nav-link" 
                  style={{ 
                    padding: 0,
                    position: 'relative', 
                    zIndex: 50,           
                    pointerEvents: 'auto' 
                  }} 
                  aria-label="GitHub Repository"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.github, '_blank', 'noopener,noreferrer');
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <FaGithub size={22} />
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="nav-link" 
                  style={{ 
                    padding: 0,
                    position: 'relative', 
                    zIndex: 50,           
                    pointerEvents: 'auto' 
                  }} 
                  aria-label="Live Project"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.live, '_blank', 'noopener,noreferrer');
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt size={20} />
                </a>
              )}
            </div>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7, flexGrow: 1 }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 'auto' }}>
            {project.techStack.map((tech, idx) => (
              <span key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--neon-purple)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsShowcase: React.FC = () => {
  return (
    <section id="projects" className="section-container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="text-gradient">Featured Projects</span>
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {projects.map((proj, i) => (
          <TiltCard key={i} project={proj} />
        ))}
      </div>
    </section>
  );
};