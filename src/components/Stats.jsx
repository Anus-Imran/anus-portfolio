import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FiPlus } from "react-icons/fi";
import { FaCode, FaRocket, FaTools, FaCodeBranch } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { api } from "../api";

const icons = [<FaRocket />, <FaCode />, <FaTools />, <FaCodeBranch />];

const Stats = () => {
  const [stats, setStats] = useState([
    { num: 2, text: "Years of Experience" },
    { num: 16, text: "Projects Completed" },
    { num: 14, text: "Technologies Mastered" },
    { num: 200, text: "Code Commits" },
  ]);

  useEffect(() => {
    api.getStats().then(d => { if (d?.length) setStats(d); }).catch(() => {});
  }, []);

  return (
    <section className="flex w-full !py-10">
      <div className="flex flex-wrap gap-6 max-w-[80vw] !mx-auto justify-center">
        {stats.map((item, index) => (
          <Tilt
            key={item.id || index}
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.05}
            className="flex flex-col items-center justify-center w-60 h-48 bg-[#1a1a2e] text-white rounded-2xl shadow-lg transition-all transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-[6px_6px_0px_#915eff] cursor-pointer border border-[#915eff]"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-[#915eff] text-white rounded-full !mb-4 hover:scale-110 transition-transform duration-300 text-4xl">
              {icons[index % icons.length]}
            </div>
            <div className="flex items-center gap-2">
              <CountUp
                end={item.num}
                duration={2}
                delay={0.5}
                className="text-4xl font-extrabold text-[#915eff]"
              />
              <FiPlus className="text-3xl text-[#915eff]" />
            </div>
            <p className="text-base text-gray-400 text-center !mt-2">
              {item.text}
            </p>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default Stats;
