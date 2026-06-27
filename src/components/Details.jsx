import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { FaArrowLeft, FaRegStar, FaCode } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { api } from '../api';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [techMap, setTechMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getProject(id),
      api.getTech(),
    ]).then(([proj, techList]) => {
      setProject(proj);
      // Build a name -> icon_url map from tech_stack table
      const map = {};
      techList.forEach(t => { map[t.name] = { icon_url: t.icon_url, width: t.width, height: t.height }; });
      setTechMap(map);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #050816 0%, #150025 50%, #050816 100%)' }}>
        <div className="w-8 h-8 border-2 border-[#915eff] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project || project.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
        <h2 className="text-2xl !mb-4">Project not found!</h2>
        <Link to="/" className="text-blue-400">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className='h-full flex justify-start flex-col items-center !px-4 md:!px-10 xl:!px-30 !py-0' style={{ background: 'linear-gradient(135deg, #050816 0%, #150025 50%, #050816 100%)' }}>
      <Navbar />

      {/* Back + Breadcrumb */}
      <div className='!mx-2 md:!mx-20 !my-5 flex flex-col md:flex-row justify-start items-start md:items-center w-full h-full !p-0 gap-2'>
        <button
          onClick={() => navigate('/')}
          className='!py-1 !px-2 rounded-md flex justify-center items-center cursor-pointer hover:bg-opacity-80 transition-all duration-300'
          style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
        >
          <FaArrowLeft className='!mr-2' /> Back
        </button>
        <div className='flex justify-evenly items-center !ml-0 md:!ml-7 max-w-full min-w-[250px]'>
          <p className='text-[14px] text-white opacity-60'>Projects</p>
          <p className='text-gray-500 mx-2'>&gt;</p>
          <p className='text-[15px]'>{project.title}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className='w-full flex flex-col !pb-12 !pt-10 md:flex-row'>

        {/* Left Side */}
        <div className='w-full md:w-[50%] flex flex-col justify-between gap-6'>
          <div>
            <h2 className='font-bold text-[30px]'>{project.title}</h2>
            <div className='w-[100px] h-[7px] rounded-full bg-[#915eff] drop-shadow-[0_0_10px_rgba(145,94,255,0.7)]'></div>
          </div>

          {/* Image for mobile */}
          <div className='block md:hidden max-w-full max-h-[350px] bg-[#18192a] rounded-xl shadow-lg'>
            <img src={project.image_url} alt='Project Screenshot' className='rounded-lg w-full max-w-[600px] max-h-[350px] h-full object-cover'
              onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x350/1a1a2e/915eff?text=Project'; }} />
          </div>

          <div className='text-justify lg:text-left max-w-[650px] text-white/80'>
            {project.full_description || project.description}
          </div>

          {/* Tech count cards */}
          <div className='!p-4 w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 cursor-pointer rounded-lg' style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {[{ label: 'Tech Stack Used', count: project.tech_stack?.length }, { label: 'Total Key Features', count: project.key_features?.length || 0 }].map((c, i) => (
              <div key={i} className='w-full sm:w-[48%] h-full !py-3 !px-2 flex items-center justify-start rounded-lg' style={{ backgroundColor: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className='!p-3 rounded-full !mr-4' style={{ backgroundColor: 'rgba(255,100,255,0.25)' }}><FaCode /></div>
                <div>
                  <p className='font-bold text-[18px]'>{c.count}</p>
                  <p className='text-[14px] text-white opacity-60 font-semibold'>{c.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Technologies Used — uses images from tech_stack table */}
          <div className='w-full flex flex-col items-start'>
            <h3 className='text-white text-lg font-bold !mb-3 flex items-center gap-2'>
              <span className='text-[#915eff]'>&lt;/&gt;</span> Technologies Used
            </h3>
            <div className='flex flex-wrap gap-3 !ml-8'>
              {(project.tech_stack || []).map((tech, idx) => {
                const techData = techMap[tech];
                return (
                  <span key={idx} className='text-white/90 !px-4 !py-2 rounded-lg text-sm shadow-sm flex items-center gap-2 cursor-pointer'
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {techData?.icon_url ? (
                      <img
                        src={techData.icon_url}
                        alt={tech}
                        className='object-contain'
                        style={{ width: '20px', height: '20px', minWidth: 20 }}
                      />
                    ) : (
                      <span className='w-5 h-5 rounded bg-[#915eff]/20 flex items-center justify-center text-[#915eff] text-xs font-bold'>{tech[0]}</span>
                    )}
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className='flex w-full flex-col sm:flex-row justify-start items-center mt-4 gap-4'>
            <button
              onClick={() => window.open(project.live_demo_link, '_blank')}
              className='flex justify-center items-center !p-3 rounded-lg w-full sm:w-[140px] cursor-pointer hover:bg-opacity-80 transition-all duration-300'
              style={{ backgroundColor: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <FaArrowUpRightFromSquare className='!mr-3' />Live Demo
            </button>
            <button
              onClick={() => window.open(project.github_link, '_blank')}
              className='flex justify-center items-center !p-3 rounded-lg w-full sm:w-[140px] cursor-pointer hover:bg-opacity-80 transition-all duration-300'
              style={{ backgroundColor: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <FiGithub className='!mr-3' />Github
            </button>
          </div>
        </div>

        {/* Right Side (Desktop) */}
        <div className='hidden md:flex w-[50%] flex-col gap-6 !px-6 !py-2'>
          <div className='max-w-[600px] max-h-[350px] bg-[#18192a] rounded-xl shadow-lg flex justify-center items-center !mb-4'>
            <img src={project.image_url} alt='Project Screenshot' className='rounded-lg w-full max-w-[600px] max-h-[350px] h-full object-cover'
              onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x350/1a1a2e/915eff?text=Project'; }} />
          </div>

          {project.key_features?.length > 0 && (
            <div className='w-full bg-transparent rounded-xl shadow-lg !p-6 flex flex-col' style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className='flex items-center !mb-3'>
                <FaRegStar className='text-yellow-400 text-xl !mr-2' />
                <span className='text-lg font-bold text-white'>Key Features</span>
              </div>
              <ul className='list-disc !pl-6 text-white/80 text-[15px] flex flex-col justify-center gap-7'>
                {project.key_features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
