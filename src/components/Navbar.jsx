import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../style';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import FadeInWhenVisible from './FadeInWhenVisible';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 640); // Small device breakpoint
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleNavClick = (linkTitle, linkId) => {
    setActive(linkTitle);
    scrollToSection(linkId);
    setToggle(false); // Close mobile menu if open
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex top-0 z-20 bg-transparent items-center justify-center`}
      style={{
        padding: isSmallDevice ? '10px 10px' : '15px 0',
        margin: isSmallDevice ? '5px 0' : '0 0',
      }}
    >
      {/* ✅ Added relative to allow dropdown positioning */}
      <div className="relative w-full flex justify-between items-center max-w-7xl !mx-auto">
        {/* Logo Section */}
        <FadeInWhenVisible>
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive('');
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              Anus<span className="sm:block hidden">&nbsp;|&nbsp;Portfolio</span>
            </p>
          </Link>
        </FadeInWhenVisible>

        {/* Desktop Links */}
        <ul className="list-none hidden sm:flex flex-row gap-10 items-center justify-end">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`relative group cursor-pointer text-[18px] font-medium transition-all duration-300 ease-in-out ${active === link.title ? 'text-white' : 'text-[#aaa6c3] hover:text-white'
                }`}
              onClick={() => handleNavClick(link.title, link.id)}
            >
              <span className="block px-3 py-2">
                {link.title}
              </span>
              {/* Underline */}
              <span
                className={`hidden sm:block absolute left-0 bottom-[-4px] h-[2px] bg-white transition-transform duration-300 ease-in-out transform ${active === link.title
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                style={{ width: '100%' }}
              ></span>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className={`object-contain cursor-pointer transition-all duration-200 ease-in-out ${toggle ? 'w-[24px] h-[24px]' : 'w-[28px] h-[28px]'
              }`}
            onClick={
              () => setToggle(!toggle)
            }
          />

          {/* Mobile Dropdown Menu */}
          <div
            className={`absolute top-14 right-4 w-[220px] rounded-xl shadow-2xl z-50 bg-[#181824] border-[#22223b] transition-all duration-500 ease-in-out
              ${toggle
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none'
              }
            `}
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
          >
            <ul className="list-none flex flex-col gap-2 !py-4 !px-2">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`rounded-lg !px-5 !py-3 text-[16px] font-medium cursor-pointer transition-all duration-300 ease-in-out ${active === link.title
                      ? 'text-white bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-md'
                      : 'text-[#aaa6c3] hover:text-white hover:bg-[#30336b]'
                    }`}
                  style={{ margin: '2px 0' }}
                  onClick={() => handleNavClick(link.title, link.id)}
                >
                  <span className="block w-full h-full">
                    {link.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
