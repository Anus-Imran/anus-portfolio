import { useEffect, useState } from "react";
import { styles } from "../style";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaArrowRight, FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api";
import { projects as fallbackProjects } from "../constants";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.2 } },
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
      className="group relative rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(145,94,255,0.25)] flex flex-col h-full bg-[#151030]/80 border border-white/10 backdrop-blur-md"
    >
      {/* Fixed-height image container with overlay glow */}
      <div className="relative w-full h-[200px] overflow-hidden flex-shrink-0">
        <img
          src={project.image_url || project.image}
          alt={project.title || project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x200/1a1a2e/915eff?text=Project+Preview'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151030] via-transparent to-transparent opacity-80" />
        
        {/* Category Badge */}
        <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border shadow-md ${
          project.category === 'Advanced'
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        }`}>
          {project.category || 'Featured'}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-col p-5 flex-grow justify-between gap-3">
        <div>
          <h3 className="font-bold text-xl text-white group-hover:text-[#915eff] transition-colors duration-200">
            {project.title || project.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300/90 line-clamp-3 mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech tags preview if available */}
        {(project.tech_stack || project.tags) && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(project.tech_stack || (project.tags || []).map(t => t.name)).slice(0, 4).map((tech, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-purple-200 border border-white/10">
                #{tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
          {(project.live_demo_link || project.source_code_link) ? (
            <button
              className="text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-medium flex items-center cursor-pointer transition-colors"
              onClick={() => window.open(project.live_demo_link || project.source_code_link, '_blank')}
            >
              Live Demo <FaArrowUpRightFromSquare className="ml-1.5 text-xs" />
            </button>
          ) : <div />}
          
          <button
            className="px-3.5 py-1.5 rounded-lg bg-[#915eff]/20 hover:bg-[#915eff] text-white text-xs font-semibold flex items-center cursor-pointer transition-all duration-200 border border-[#915eff]/40 hover:border-[#915eff]"
            onClick={() => navigate(`/project/${project.id || 1}`)}
          >
            Details <FaArrowRight className="ml-1.5 text-xs" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getProjects()
      .then(d => {
        if (d?.length) {
          setProjects(d);
        } else {
          setProjects(fallbackProjects.map((p, idx) => ({ ...p, id: idx + 1, title: p.name, category: idx === 0 ? 'Advanced' : 'Basic' })));
        }
      })
      .catch(() => {
        setProjects(fallbackProjects.map((p, idx) => ({ ...p, id: idx + 1, title: p.name, category: idx === 0 ? 'Advanced' : 'Basic' })));
      });
  }, []);

  const filtered = projects.filter(project => {
    const matchesTab = activeTab === 'All' || (project.category || 'Basic') === activeTab;
    const q = searchQuery.toLowerCase().trim();
    const titleMatch = (project.title || project.name || '').toLowerCase().includes(q);
    const descMatch = (project.description || '').toLowerCase().includes(q);
    const techMatch = (project.tech_stack || []).some(t => t.toLowerCase().includes(q));
    const matchesSearch = !q || titleMatch || descMatch || techMatch;
    return matchesTab && matchesSearch;
  });

  return (
    <section
      id="work"
      className="py-16 px-4 sm:px-8 lg:px-12 w-full flex flex-col items-center relative z-10"
      style={{ background: 'linear-gradient(135deg, #050816 0%, #150025 50%, #050816 100%)' }}
    >
      {/* Heading */}
      <div className="text-center max-w-2xl">
        <p className={`${styles.sectionSubText}`}>My Dynamic Portfolio</p>
        <h2 className={`${styles.sectionHeadText}`}>
          Featured <span className="text-[#915eff]">Projects</span>
        </h2>
      </div>

      {/* Controls: Search + Tabs */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 mb-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 text-sm" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects or tech..."
            className="w-full bg-white/5 border border-white/15 focus:border-[#915eff] rounded-full pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder-gray-400 outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full p-1 shadow-lg">
          {TABS.map(tab => {
            const isActive = activeTab === tab;
            const count = projects.filter(p => {
              const matchesCategory = tab === 'All' || (p.category || 'Basic') === tab;
              return matchesCategory;
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#915eff] to-[#5c3d9e] shadow-[0_0_15px_rgba(145,94,255,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-7xl mt-6">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm py-16 text-center w-full bg-white/5 rounded-2xl border border-white/10"
            >
              No projects found matching your search criteria.
            </motion.div>
          ) : (
            <motion.div
              key={`${activeTab}-${searchQuery}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
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
