import { useEffect, useState } from 'react';
import { styles } from '../style';
import { ComputersCanvas } from './canvas';
import FadeInWhenVisible from './FadeInWhenVisible';
import { api } from '../api';

const Hero = () => {
  const [data, setData] = useState({ name: 'Anus Imran', tagline: "Hi, I'm", subtitle: 'I Develop User Interfaces, Web Applications, and Android Applications, delivering seamless and engaging user experiences.' });

  useEffect(() => {
    api.getHero().then(d => { if (d?.name) setData(d); }).catch(() => {});
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto flex flex-col justify-between items-center pt-24 sm:pt-28 pb-10">
      <div className={`${styles.paddingX} w-full max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff] shadow-[0_0_15px_#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <FadeInWhenVisible>
            <h1 className={`${styles.heroHeadText} text-white`}>
              {data.tagline} <span className="bg-gradient-to-r from-[#915eff] via-[#c084fc] to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(145,94,255,0.6)]">{data.name}</span>
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <p className={`${styles.heroSubText} mt-3 text-gray-200 max-w-2xl text-left leading-relaxed`}>
              {data.subtitle}
            </p>
          </FadeInWhenVisible>
        </div>
      </div>

      <div className="w-full flex-1 flex justify-center items-center relative my-2">
        <ComputersCanvas />
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full flex justify-center items-center z-10">
        <a href="#about" className="flex flex-col items-center gap-2 cursor-pointer group">
          <span className="text-xs tracking-widest uppercase text-gray-400 group-hover:text-[#915eff] transition-colors">Scroll Down</span>
          <div className="w-[28px] h-[50px] rounded-3xl border-2 border-white/20 group-hover:border-[#915eff] flex justify-center items-start p-2 transition-colors">
            <div className="w-2 h-2 rounded-full bg-[#915eff] animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
