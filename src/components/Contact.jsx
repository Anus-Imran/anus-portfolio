import { styles } from '../style';
import Earth from './canvas/Earth';
import { FaLinkedin, FaInstagram, FaYoutube, FaGithub, FaTiktok, FaPaperPlane } from 'react-icons/fa';
import { HiOutlineUser, HiOutlineMail, HiOutlineChat } from 'react-icons/hi';
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socials = [
  {
    icon: <FaLinkedin className="text-[#0077B5]" />,
    label: "Let's Connect",
    subtext: 'on LinkedIn',
    url: 'https://linkedin.com/in/anusimran/',
    full: true,
  },
  {
    icon: <FaGithub className="text-white" />,
    label: 'Github',
    subtext: '@Anus-Imran',
    url: 'https://github.com/Anus-Imran',
  },
  {
    icon: <FaInstagram className="text-[#E4405F]" />,
    label: 'Instagram',
    subtext: '@call_me_anus',
    url: 'https://www.instagram.com/anusimrann/',
  },
  {
    icon: <FaYoutube className="text-[#FF0000]" />,
    label: 'Videos',
    subtext: '@JTT.Anus_Imran',
    url: 'https://www.youtube.com/@JTT.Anus_Imran',
  },
  {
    icon: <FaTiktok className="text-[#010101]" />,
    label: 'Tiktok',
    subtext: '@anus_imran',
    url: 'https://tiktok.com',
  },
];

const initialState = { name: '', email: '', message: '' };

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = 'Name is required';
  } else if (!/^[A-Za-z\s]{2,30}$/.test(values.name.trim())) {
    errors.name = 'Name should be 2-30 letters';
  }
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email.trim())) {
    errors.email = 'Invalid email address';
  }
  if (!values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters';
  } else if (values.message.trim().length > 500) {
    errors.message = 'Message should be less than 500 characters';
  }
  return errors;
};

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Contact = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((msg) => toast.error(msg, { position: 'top-center' }));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setValues(initialState);
      toast.success('Message sent successfully!', { position: 'top-center' });
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again!', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen flex flex-col items-center justify-center !px-4 !py-12 gap-6"
      style={{ background: 'linear-gradient(135deg, #050816 0%, #150025 50%, #050816 100%)' }}
    >
      <ToastContainer theme="dark" />
      {/* Centered Title at Top, always above everything */}
      <div className="w-full flex flex-col items-center justify-center !mb-4">
        <p className={`${styles.sectionSubText} text-center`}>GOT A QUESTION ?</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Contact <span className="text-[#915eff]">Me</span>
        </h2>
      </div>
      {/* Main Content: Earth + Form/Socials */}
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-12">
        {/* Left: Form + Social Cards */}
        <div className="md:w-[50%] w-full max-w-lg flex flex-col gap-8">
          {/* Contact Form */}
          <div
            className="w-full !p-8 flex flex-col gap-6 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              className="w-full !p-8 flex flex-col gap-6 rounded-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-purple-300 !mb-2 text-center">Get in Touch</h2>
                <div className="w-[200px] h-[7px] rounded-full bg-[#915eff] drop-shadow-[0_0_10px_rgba(145,94,255,0.7)]"></div>
              </div>
              <p className="text-gray-300 !mb-4 text-center">Have something to discuss? Send me a message and let's talk.</p>
              <form className="flex flex-col gap-4" ref={formRef} onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-xl">
                    <HiOutlineUser />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`bg-white/10 border border-white/20 rounded-lg !pl-10 !pr-4 !py-3 text-white placeholder-gray-400 outline-none w-full`}
                  />
                </div>
                {/* Email */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-xl">
                    <HiOutlineMail />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`bg-white/10 border border-white/20 rounded-lg !pl-10 !pr-4 !py-3 text-white placeholder-gray-400 outline-none w-full`}
                  />
                </div>
                {/* Message */}
                <div className="relative">
                  <span className="absolute left-3 top-4 text-purple-400 text-xl">
                    <HiOutlineChat />
                  </span>
                  <textarea
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={4}
                    className={`bg-white/10 border border-white/20 rounded-lg !pl-10 !pr-4 !py-3 text-white placeholder-gray-400 outline-none resize-none w-full`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="!mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold !py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="text-lg" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

            {/* Connect With Me */}
            <div
              className="w-full !p-8 flex flex-col gap-6 rounded-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="border-none">
                <div className="flex items-center justify-start !mb-5">
                  <div className="w-[30px] lg:w-[60px] h-[7px] rounded-full bg-[#915eff] drop-shadow-[0_0_10px_rgba(145,94,255,0.7)] !mr-2"></div>
                  <h3 className="text-lg font-semibold text-purple-200">Connect With Me</h3>
                </div>

                {/* Full Width LinkedIn Card */}
                {socials
                  .filter((s) => s.full)
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg !p-4 text-white hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 shadow-md mb-3"
                    >
                      <div className="flex justify-start items-center">
                        <div className="text-4xl">{s.icon}</div>
                        <div className="flex flex-col text-left !ml-3">
                          <span className="text-sm font-semibold">{s.label}</span>
                          <span className="text-xs text-gray-300">{s.subtext}</span>
                        </div>
                      </div>
                    </a>
                  ))}

                {/* Other Socials Grid */}
                <div
                  className="flex flex-col gap-3 !mt-3 sm:grid sm:grid-cols-2"
                >
                  {socials.filter((s) => !s.full).map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-white/5 border border-white/10 rounded-lg !py-3 !px-3 text-white hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 shadow-md"
                    >
                      <div className="text-2xl">{s.icon}</div>
                      <div className="flex flex-col !ml-3 overflow-hidden">
                        <span className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{s.label}</span>
                        <span className="text-xs text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{s.subtext}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Earth (moves to top on mobile) */}
        <div className="md:w-[50%] w-full !h-[300px] md:!h-[500px] flex items-center justify-center">
          <Earth />
        </div>
      </div>
    </section>
  );
};

export default Contact;
