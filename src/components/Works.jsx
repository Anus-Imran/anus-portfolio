import { useEffect, useState } from "react";
import { styles } from "../style";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.25 } },
};

const TABS = ['All', 'Basic', 'Advanced'];

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out rounded-lg overflow-hidden"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.09)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      {/* Fixed-height image */}
      <img
        src={project.image_url}
        alt="Project Preview"
        className="w-full object-cover"
        style={{ height: 190, flexShrink: 0 }}
        onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x190/1a1a2e/915eff?text=Project'; }}
      />

      {/* Body — grows to fill remaining height */}
      <div className="flex flex-col !p-4" style={{ flex: 1, gap: '0.5rem' }}>
        <span style={{
          fontSize: '0.65rem', padding: '0.15rem 0.55rem', borderRadius: 99, fontWeight: 600,
          background: project.category === 'Advanced' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
          color: project.category === 'Advanced' ? '#f87171' : '#4ade80',
          border: `1px solid ${project.category === 'Advanced' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
          alignSelf: 'flex-start',
        }}>{project.category || 'Basic'}</span>

        <h2 className="font-bold text-[18px] text-white">{project.title}</h2>

        {/* Description fills available space, clamped to 3 lines */}
        <p className="text-xs sm:text-sm text-gray-300 line-clamp-3" style={{ flex: 1 }}>
          {project.description}
        </p>

        {/* Buttons always at bottom */}
        <div className="flex justify-between items-center !pt-2">
          <button
            className="text-blue-400 text-xs sm:text-[13px] flex items-center cursor-pointer whitespace-nowrap"
            onClick={() => window.open(project.live_demo_link, '_blank')}
          >
            Live Demo <FaArrowUpRightFromSquare className="!ml-1 text-sm" />
          </button>
          <button
            className="!py-2 !px-3 rounded-sm cursor-pointer text-xs flex items-center whitespace-nowrap"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            Details <FaArrowRight className="!ml-1 text-sm" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    api.getProjects().then(d => { if (d?.length) setProjects(d); }).catch(() => {});
  }, []);

  const filtered = activeTab === 'All'
    ? projects
    : projects.filter(p => (p.category || 'Basic') === activeTab);

  return (
    <section
      id="work"
      className="!py-12 !px-4 sm:!px-6 md:!px-8 lg:!px-10 xl:!px-12 w-full flex flex-col items-center"
      style={{ background: 'linear-gradient(135deg, #050816 0%, #150025 50%, #050816 100%)' }}
    >
      {/* Heading */}
      <div className="text-center">
        <p className={`${styles.sectionSubText}`}>Projects I Have Done</p>
        <h2 className={`${styles.sectionHeadText}`}>
          Portfolio <span className="text-[#915eff]">Showcase</span>
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex items-center !mt-8 !mb-2" style={{ gap: '0.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9999px', padding: '0.3rem' }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab;
          const count = tab === 'All' ? projects.length : projects.filter(p => (p.category || 'Basic') === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative cursor-pointer font-semibold text-sm transition-all duration-300"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
                background: isActive ? 'linear-gradient(135deg, #915eff, #5c3d9e)' : 'transparent',
                boxShadow: isActive ? '0 0 16px rgba(145,94,255,0.35)' : 'none',
                border: 'none',
              }}
            >
              {tab}
              <span style={{
                marginLeft: '0.35rem', fontSize: '0.65rem', padding: '0.05rem 0.4rem',
                borderRadius: 99, verticalAlign: 'middle',
                background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="!px-4 sm:!px-6 !py-6 !my-4 w-full xl:max-w-7xl !mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-sm !py-12 text-center w-full"
            >
              No {activeTab === 'All' ? '' : activeTab + ' '}projects yet.
            </motion.p>
          ) : (
            <motion.div
              key={activeTab}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
                alignItems: 'stretch',
              }}
            >
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Works;
