import { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../style";
import { textVariant } from "../utils/motion";
import FadeInWhenVisible from "./FadeInWhenVisible";
import { api } from "../api";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff", borderRadius: "8px", padding: "20px" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.date_range}
      iconStyle={{ background: experience.icon_bg || '#383E56', display: "flex", justifyContent: "center", alignItems: "center" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {experience.icon_url ? (
            <img src={experience.icon_url} alt={experience.company_name} className="w-[60%] h-[60%] object-contain" />
          ) : (
            <span className="text-white font-bold text-xl">{experience.title?.[0]}</span>
          )}
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[20px] sm:text-[24px] font-bold">{experience.title}</h3>
        {experience.company_name && (
          <p className="text-[#aaa6c3] text-[14px] sm:text-[16px] font-semibold !m-0">{experience.company_name}</p>
        )}
      </div>
      <ul className="!mt-5 list-disc !pl-5 space-y-2">
        {(experience.points || []).filter(p => p?.trim()).map((point, index) => (
          <li key={index} className="text-gray-300 text-[14px] sm:text-[15px] tracking-wider">{point}</li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    api.getExperiences().then(d => { if (d?.length) setExperiences(d); }).catch(() => {});
  }, []);

  return (
    <div className="!py-12 !px-6 !sm:py-20 !sm:px-12 !lg:px-20">
      <motion.div variants={textVariant()} className="text-center">
        <FadeInWhenVisible>
          <p className={`${styles.sectionSubText} !mb-4`}>What I have done so far</p>
          <h2 className={`${styles.sectionHeadText} text-4xl sm:text-5xl lg:text-6xl font-bold text-white`}>
            Work <span className="text-[#915eff]">Experience</span>
          </h2>
        </FadeInWhenVisible>
      </motion.div>
      <div className="!mt-12 !sm:mt-16 !lg:mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id || index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Experience;
