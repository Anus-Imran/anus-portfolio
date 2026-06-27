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
    <section className="w-full h-screen !mx-auto flex flex-col justify-center items-center">
      <div className={`${styles.paddingX}  w-full !m-auto flex flex-row xl:justify-start justify-center xl:items-center items-center xl:!ml-[119px] gap-5 h-[50%]`}>
        <div className="flex flex-col justfy-start items-center !mt-[40px] !ml-[10px] ">
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-70 h-60 violet-gradient' />
        </div>

        <div>
          <FadeInWhenVisible>
            <h1 className={`${styles.heroHeadText} text-white`}>
              {data.tagline} <span className='text-[#915eff]'>{data.name}</span>
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible>
            <p className={`${styles.heroSubText} !mt-1 text-white xl:max-w-[800px] max-w-[270px] text-justify`}>
              {data.subtitle}
            </p>
          </FadeInWhenVisible>
        </div>
      </div>

      <div className=' w-full flex justify-center items-center h-[50%]'>
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;
