import { useEffect, useState } from "react";
import { styles } from "../style";
import { motion } from "framer-motion";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { api } from "../api";

const CircularProgressBar = ({ percentage }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div style={{ position: 'relative', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle stroke="#374151" strokeWidth="6" fill="transparent" r={radius} cx="40" cy="40" />
        <circle
          stroke="#915eff" strokeWidth="6"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" fill="transparent"
          r={radius} cx="40" cy="40"
          transform="rotate(-90 40 40)"
        />
      </svg>
      <span style={{ position: 'absolute', color: '#fff', fontSize: '1.125rem', fontWeight: 700 }}>{percentage}%</span>
    </div>
  );
};

const TechCard = ({ tech, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: 1000, width: 120, height: 130, cursor: 'pointer' }}
    >
      {/* Flipper — this is the element that rotates */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front face */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.5rem',
          borderRadius: '0.25rem',
          background: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          border: '2px solid rgba(255,255,255,0.2)',
          color: '#fff',
        }}>
          {tech.icon_url ? (
            <img
              src={tech.icon_url}
              alt={tech.name}
              style={{ width: tech.width || 40, height: tech.height || 40, objectFit: 'contain' }}
              onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
            />
          ) : (
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: 'rgba(145,94,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#915eff', fontWeight: 700, fontSize: '1.125rem'
            }}>
              {tech.name?.[0]}
            </div>
          )}
          <span style={{ fontSize: '0.875rem', fontWeight: 500, textAlign: 'center', lineHeight: 1.2, padding: '0 4px' }}>{tech.name}</span>
        </div>

        {/* Back face */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '0.25rem',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}>
          <CircularProgressBar percentage={tech.percentage || 70} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Tech = () => {
  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    api.getTech().then(d => { if (d?.length) setTechStack(d); }).catch(() => {});
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center !p-10"
      style={{ background: 'linear-gradient(135deg, #050816 0%, #150025 50%, #050816 100%)' }}
    >
      <FadeInWhenVisible>
        <div className="text-center">
          <p className={`${styles.sectionSubText}`}>Skills I Have</p>
          <h2 className={`${styles.sectionHeadText}`}>Tech <span className="text-[#915eff]">Stack</span></h2>
        </div>
      </FadeInWhenVisible>
      <div className="flex flex-wrap justify-center text-center !p-8 max-w-4xl" style={{ gap: '1rem' }}>
        {techStack.map((tech, index) => (
          <TechCard key={tech.id || tech.name} tech={tech} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Tech;
