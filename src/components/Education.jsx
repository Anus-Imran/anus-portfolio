import { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../style";
import { textVariant } from "../utils/motion";
import { FaStarOfLife } from 'react-icons/fa';
import FadeInWhenVisible from "./FadeInWhenVisible";
import { api } from "../api";

const EducationCard = ({ educationDetail }) => {
  const { degree, institution, location, start_date, end_date, grade, details, icon_url, icon_bg } = educationDetail;
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "linear-gradient(135deg, #1d1836 0%, #2b2348 100%)", color: "#fff", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={`${start_date} - ${end_date}`}
      iconStyle={{ background: icon_bg || '#383E56', display: "flex", justifyContent: "center", alignItems: "center" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          {icon_url ? (
            <img src={icon_url} alt={institution} className="w-[80%] h-[80%] object-contain" />
          ) : (
            <span className="text-white font-bold text-xl">{institution?.[0]}</span>
          )}
        </div>
      }
    >
      <div className="flex justify-between items-center">
        <h3 className="text-white text-[24px] font-bold">{degree}</h3>
      </div>
      <p className="text-[#aaa6c3] text-[16px] font-semibold !m-0">{institution} — {location}</p>
      {grade && (
        <p className="text-[#915eff] text-[14px] font-medium !mt-2 flex items-center">
          <FaStarOfLife className="!mr-2 text-[#FFD700]" />
          Grade: &nbsp;<span className="text-white ml-1">{grade}</span>
        </p>
      )}
      <ul className="!mt-3 list-disc !pl-5 space-y-2">
        {(details || []).map((item, index) => (
          <li key={index} className="text-gray-300 text-[14px] tracking-wider">{item}</li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.getEducation().then(d => { if (d?.length) setEducation(d); }).catch(() => {});
  }, []);

  return (
    <motion.div variants={textVariant()} className="!py-20 !px-6 !sm:py-24 !sm:px-12 !lg:px-20">
      <FadeInWhenVisible>
        <div className="text-center !mb-12">
          <p className={`${styles.sectionSubText}`}>My Academic Journey</p>
          <h2 className={`${styles.sectionHeadText}`}>
            Education <span className="text-[#915eff]">Timeline</span>
          </h2>
        </div>
      </FadeInWhenVisible>
      <VerticalTimeline>
        {education.map((detail, index) => (
          <EducationCard key={detail.id || index} educationDetail={detail} />
        ))}
      </VerticalTimeline>
    </motion.div>
  );
};

export default Education;
