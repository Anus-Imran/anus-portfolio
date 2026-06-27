import React, { useState, useEffect } from 'react';
import { FiDownload, FiMail } from 'react-icons/fi';
import Photo from './Photo';
import Stats from './Stats';
import { styles } from '../style';
import FadeInWhenVisible from './FadeInWhenVisible';
import { api } from '../api';

const About = () => {
  const defaultWords = ['Software Engineer', 'Web Developer', 'App Developer', 'UI/UX Designer'];
  const [aboutData, setAboutData] = useState({
    bio: 'I am a Pakistan-based full-stack mobile and web app developer with expertise in both frontend and backend development.',
    typing_words: defaultWords,
    cv_url: '',
    profile_image_url: '',
  });
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    api.getAbout().then(d => { if (d?.bio) setAboutData(d); }).catch(() => {});
  }, []);

  const words = aboutData.typing_words?.length ? aboutData.typing_words : defaultWords;

  useEffect(() => {
    const typingInterval = setInterval(() => setShowCursor(prev => !prev), 500);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    let timeout;
    if (!deleting) {
      if (currentWord.length < words[wordIndex].length) {
        timeout = setTimeout(() => setCurrentWord(words[wordIndex].slice(0, currentWord.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1000);
      }
    } else {
      if (currentWord.length > 0) {
        timeout = setTimeout(() => setCurrentWord(currentWord.slice(0, currentWord.length - 1)), 100);
      } else {
        setDeleting(false);
        setWordIndex(prevIndex => (prevIndex + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [currentWord, deleting, wordIndex, words]);

  const handleDownloadCV = () => {
    if (!aboutData.cv_url) return;
    const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${BASE}/api/about/download-cv`;
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="about" className="bg-[#080d24] text-white !py-8 !md:py-0 flex flex-col items-center justify-center min-h-screen !px-4">
      <FadeInWhenVisible>
        <span className={`${styles.sectionHeadText} text-xl text-gray-400 flex justify-center items-center w-full h-[100px] text-[30px] cursor-pointer font-bold`}>
          About&nbsp;<span className="text-[#915eff]">Me</span>
        </span>
      </FadeInWhenVisible>

      <div className="flex flex-col xl:flex-row w-full max-w-screen-2xl justify-evenly items-center">
        <div className="order-2 xl:order-2 flex justify-center items-center !mb-8 !xl:mb-0 xl:min-h-screen xl:w-[40%]">
          <Photo profileImageUrl={aboutData.profile_image_url} />
        </div>

        <div className="order-3 xl:order-1 w-full xl:w-[55%] flex flex-col items-center justify-evenly xl:items-start h-auto xl:h-screen !px-2">
          <FadeInWhenVisible>
            <h1 className="text-[30px] sm:text-[48px] xl:text-[80px] leading-[1.1] font-bold !mb-4 text-center xl:text-left">
              I am a <br />
              <span className="text-[#915eff]">
                {currentWord}
                <span className={`border-r-2 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
              </span>
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <p className="xl:max-w-[650px] text-center sm:text-justify !mb-6 text-white/80 text-base sm:text-lg xl:text-left whitespace-pre-line">
              {aboutData.bio}
            </p>
          </FadeInWhenVisible>
        </div>
      </div>

      <div className="order-4 xl:order-3 w-full max-w-screen-2xl !mb-8">
        <Stats />
      </div>

      <FadeInWhenVisible>
        <div className="order-5 xl:order-1 xl:flex xl:justify-center xl:items-center xl:gap-4 flex justify-center items-center gap-3 w-full max-w-screen-2xl !mb-10 !px-2">
          <button
            onClick={handleDownloadCV}
            disabled={!aboutData.cv_url}
            className="uppercase flex items-center justify-center gap-2 !px-6 !py-3 bg-[#915eff] text-white font-medium shadow-lg
          hover:scale-105 transition transform duration-300 ease-in-out active:scale-95 xl:w-[220px] h-[50px] cursor-pointer rounded-lg hover:bg-transparent hover:border-2 border-[#7c4ae8] w-40 text-[15px] disabled:opacity-50"
          >
            <span>Download CV</span>
            <FiDownload className="text-xl" />
          </button>
          <button
            onClick={scrollToContact}
            className="uppercase flex items-center justify-center gap-2 !px-6 !py-3 bg-[#915eff] text-white font-medium shadow-lg
          hover:scale-105 transition transform duration-300 ease-in-out active:scale-95 xl:w-[220px] h-[50px] cursor-pointer rounded-lg hover:bg-transparent hover:border-2 border-[#7c4ae8] w-40 text-[15px]"
          >
            <span>Contact Me</span>
            <FiMail className="text-xl" />
          </button>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

export default About;
