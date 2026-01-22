import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowUpRight,
  Terminal,
  Cpu
} from 'lucide-react';


// --- Official Brand Icons (High Fidelity SVGs) ---
const SocialIcons = {
  LinkedIn: () => (
    <svg width="45" height="45" viewBox="0 0 24 24" fill="#0077B5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#1DA1F2" aria-hidden="true">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id="insta-grad" cx="30%" cy="107%" r="150%" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f09433"/><stop offset="0.05" stopColor="#e6683c"/><stop offset="0.1" stopColor="#dc2743"/><stop offset="0.2" stopColor="#cc2366"/><stop offset="0.25" stopColor="#bc1888"/><stop offset="0.3" stopColor="#8a3ab9"/><stop offset="0.35" stopColor="#4c68d7"/>
        </radialGradient>
      </defs>
      <path fill="url(#insta-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  TikTok: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M12.525.02c1.31 0 2.591.215 3.794.613V6.4a5.132 5.132 0 01-3.257-1.127v11.182a5.552 5.552 0 11-5.552-5.552c.224 0 .444.013.66.038V5.334a10.97 10.97 0 00-1.215-.07 10.975 10.975 0 000 21.95 10.975 10.975 0 0010.975-10.975V0h-5.405z"/>
    </svg>
  ),
  YouTube: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Snapchat: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFC00" aria-hidden="true">
      <path d="M11.996 0c-4.103 0-6.19 2.594-6.19 5.378 0 1.25.438 2.062 1.094 2.844-1.03.625-2.094 1.719-2.094 3.906 0 2.156 1.156 3.125 2.125 3.125.125 0 .281-.031.438-.063-.532 1.031-1.031 2.375-1.031 4 0 4.125 5.657 4.813 5.657 4.813 0 0 5.657-.688 5.657-4.813 0-1.625-.5-2.969-1.031-4 .156.031.312.063.438.063.969 0 2.125-.969 2.125-3.125 0-2.188-1.063-3.281-2.094-3.906.656-.781 1.094-1.594 1.094-2.844 0-2.784-2.087-5.378-6.19-5.378z"/>
    </svg>
  )
};

const SocialOrbitSection = () => {
  const planets = useMemo(() => [
    { icon: <SocialIcons.Facebook />, label: "Facebook", dur: 25, radius: '150px' },
    { icon: <SocialIcons.Instagram />, label: "Instagram", dur: 35, radius: '240px' },
    { icon: <SocialIcons.YouTube />, label: "YouTube", dur: 50, radius: '330px' },
    { icon: <SocialIcons.Twitter />, label: "Twitter", dur: 20, radius: '180px' },
    { icon: <SocialIcons.TikTok />, label: "TikTok", dur: 45, radius: '280px' },
    { icon: <SocialIcons.Snapchat />, label: "Snapchat", dur: 60, radius: '380px' },
  ], []);

  return (
    <section className="py-60 px-8 bg-[#050505] relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-tech text-6xl md:text-9xl uppercase tracking-tighter mb-24 z-20 text-center"
      >
        LET'S <span className="text-[#EAFF00]">BOND</span>
      </motion.h2>

      <div className="relative w-full max-w-5xl aspect-square flex items-center justify-center scale-75 md:scale-100">
        <motion.a 
          href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          aria-label="Connect on LinkedIn"
          className="z-50 w-28 h-28 bg-[#111] border-2 border-[#0077B5]/50 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(0,119,181,0.4)] group cursor-pointer"
        >
          <SocialIcons.LinkedIn />
        </motion.a>

        {planets.map((p, i) => (
          <React.Fragment key={i}>
            <div 
              style={{ width: `calc(${p.radius} * 2)`, height: `calc(${p.radius} * 2)` }}
              className="absolute border border-white/5 rounded-full pointer-events-none" 
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "linear" }}
              style={{ width: `calc(${p.radius} * 2)`, height: `calc(${p.radius} * 2)` }}
              className="absolute pointer-events-none"
            >
              <motion.a
                href="#" target="_blank" rel="noopener noreferrer"
                aria-label={p.label}
                style={{ top: '-20px', left: '50%', marginLeft: '-20px' }}
                animate={{ rotate: -360 }}
                transition={{ duration: p.dur, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.4 }}
                className="absolute w-10 h-10 md:w-14 md:h-14 bg-[#111] border border-white/10 rounded-full flex items-center justify-center shadow-xl pointer-events-auto cursor-pointer hover:border-white/40 transition-all"
              >
                {p.icon}
              </motion.a>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (inView) {
      const endValue = value.toString().replace(/[^0-9]/g, '');
      const end = parseInt(endValue);
      if (isNaN(end)) return;
      let start = 0;
      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) { setCount(end); clearInterval(timer); }
      }, (duration * 1000) / (end || 1));
      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);
  return <span ref={ref}>{count}{value.toString().includes('+') ? '+' : value.toString().includes('%') ? '%' : ''}</span>;
};

const Navbar = () => (
  <header className="fixed top-0 left-0 w-full z-[1000] px-8 md:px-16 py-10 flex justify-between items-center bg-transparent pointer-events-none">
    <div className="text-2xl font-black tracking-tighter text-white font-tech mix-blend-difference pointer-events-auto cursor-pointer">R<span className="text-[#EAFF00]">C</span>.</div>
    <nav className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white mix-blend-difference pointer-events-auto">
      {['Work', 'Services', 'Contact'].map(item => (<a key={item} href={`#work`} className="hover:opacity-50 transition-opacity uppercase">{item}</a>))}
    </nav>
    <div className="mix-blend-difference pointer-events-auto">
      <a href="https://wa.me/233592232062" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#EAFF00] transition-all inline-block">Start Project</a>
    </div>
  </header>
);

const Home = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-[#EAFF00] selection:text-black font-body overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        .font-tech { font-family: 'Archivo Black', sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-code { font-family: 'JetBrains Mono', monospace; }
        .outline-text { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.2); }
        .grid-pattern { background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 40px 40px; }
        
        /* Neon Glow Effect */
        .neon-glow {
          text-shadow: 0 0 10px rgba(234, 255, 0, 0.4),
                       0 0 20px rgba(234, 255, 0, 0.2);
        }
      `}</style>

      <Navbar />

      <main>
        {/* --- HERO --- */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 md:px-16 pt-20">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 0.05 }} transition={{ duration: 1.5 }} className="font-tech text-[22vw] leading-none tracking-tighter text-white uppercase">CREATIVE</motion.h1>
          </div>
          <div className="relative z-20 w-full max-w-7xl flex flex-col items-center justify-center">
            <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }} className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center">
              <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-[80%] h-[80%] bg-[#EAFF00] blur-[140px] rounded-full" />
              <motion.img 
                style={{ y: yParallax }} 
                src="/me.png" 
                alt="RedCharger Studio Creative Lead"
                decoding="async"
                loading="eager"
                className="relative z-10 h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center">
                <motion.h2 
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(234, 255, 0, 0)",
                      "0 0 40px rgba(234, 255, 0, 0.6)",
                      "0 0 20px rgba(234, 255, 0, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="font-tech text-[12vw] leading-none tracking-tighter uppercase neon-glow"
                >
                  <span className="block text-white">REDCHARGER</span>
                  <span className="outline-text block">STUDIO</span>
                </motion.h2>
              </div>
            </motion.div>
            <div className="mt-6 text-center z-30">
              <p className="text-white/50 uppercase tracking-[0.4em] text-[10px] font-bold mb-8">Creative Tech & Motion Direction</p>
              <motion.button 
                onClick={() => document.getElementById('work').scrollIntoView({behavior:'smooth'})} 
                className="bg-[#EAFF00] text-black px-12 py-5 rounded-full font-tech text-xs tracking-widest shadow-[0_20px_40px_rgba(234,255,0,0.2)] flex items-center gap-4 group transition-transform hover:scale-105"
                aria-label="View Projects"
              >
                SEE THE WORK <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* --- STATS --- */}
        <section className="py-32 px-8 md:px-16 border-y border-white/5 bg-[#070707]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[{ val: "24+", label: "Completed Projects" }, { val: "08", label: "Industry Awards" }, { val: "99%", label: "Client Satisfaction" }, { val: "05+", label: "Years in Tech" }].map((stat, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start">
                <div className="font-tech text-6xl md:text-8xl text-[#EAFF00] mb-4"><Counter value={stat.val} /></div>
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="py-40 px-8 md:px-16 bg-[#050505] relative grid-pattern overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 flex items-center border-b border-white/10 pb-6 text-white/40 uppercase">
               <Terminal className="text-[#EAFF00] mr-4" size={20} />
               <span className="font-code text-[10px] tracking-widest">System_Profile // Student_v2.0</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <h2 className="font-tech text-4xl md:text-7xl uppercase mb-12 tracking-tighter leading-none">Decoding <br /> <span className="text-[#EAFF00]">Digital Dreams.</span></h2>
                <div className="font-body text-xl md:text-2xl text-white/40 space-y-8 max-w-2xl">
                  <p>I am a <span className="text-white font-bold">Computer Science student</span> at the prestigious <span className="text-white bg-white/10 px-2">Accra Technical University</span>.</p>
                  <p className="text-white/40 text-lg leading-relaxed">My fascination with machines evolved into a mastery of web development. I bridge the gap between client visions and high-performance digital reality.</p>
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 font-code group relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity"><Cpu size={40} className="text-[#EAFF00]" /></div>
                  <h4 className="text-[#EAFF00] text-xs font-bold mb-8 uppercase tracking-widest border-l-2 border-[#EAFF00] pl-4">Tech Stack // ATU</h4>
                  <ul className="space-y-6 text-xs uppercase">
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Institution</span><span className="text-white">ATU - Accra</span></li>
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Major</span><span className="text-white">Comp Science</span></li>
                    <li className="flex justify-between"><span>Status</span><span className="text-white flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" />Active</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- WORK SECTION --- */}
        <section id="work" className="py-40 px-8 md:px-16 bg-[#080808]">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-tech text-[15vw] md:text-[12vw] mb-32 outline-text uppercase text-center block whitespace-nowrap">MY WORK</h2>
            
            <div className="space-y-40">
  {[
    { 
      id: '01', 
      title: 'SOHO Restaurant', 
      cat: 'Website', 
      img: '/soho.webp',
      url: 'https://soho-eosin.vercel.app/'
    },
    { 
      id: '02', 
      title: 'Passco', 
      cat: 'Web App', 
      img: '/passco.webp', // Fixed typo
      url: 'http://paxco.pythonanywhere.com/'
    },
    { 
      id: '03', 
      title: 'RedCharger', 
      cat: 'Web App', 
      img: '/hsk.webp',
      url: 'https://redcharger.pythonanywhere.com/'
    }
  ].map((project, i) => (
    <div key={i} className="group cursor-pointer">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-1 text-white/10 font-tech text-7xl md:text-9xl">{project.id}</div>
        <div className="lg:col-span-7 rounded-[40px] overflow-hidden">
          <img 
            src={project.img} 
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
        </div>
        <div className="lg:col-span-4">
          <p className="text-[#EAFF00] font-tech text-xs tracking-widest mb-4 uppercase">{project.cat}</p>
          <h3 className="font-tech text-5xl md:text-7xl leading-none group-hover:translate-x-4 transition-transform">{project.title}</h3>
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] uppercase border-b border-white/20 pb-2 w-fit mt-6 hover:border-[#EAFF00] transition-colors group/link"
          >
            View Project 
            <ArrowUpRight 
              size={14} 
              className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" 
            />
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
        </section>

        {/* --- SOCIAL ORBIT SECTION --- */}
        <SocialOrbitSection />
      </main>

      {/* --- FOOTER --- */}
      <footer id="contact" className="py-40 px-8 md:px-16 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
           <h2 className="font-tech text-center text-6xl md:text-[12vw] leading-none mb-20 uppercase">LET'S <br /> <span className="text-[#EAFF00]">TALK.</span></h2>
           <a href="mailto:redcharger000@gmail.com" className="font-tech text-xl md:text-3xl lg:text-4xl hover:text-[#EAFF00] transition-colors underline underline-offset-8">REDCHARGER000@GMAIL.COM</a>
           <div className="w-full flex justify-between items-center text-[8px] font-bold tracking-[0.5em] text-white/20 uppercase mt-40">
             <span>© 2026 BENJAMIN JOHN STUDIO</span>
             <span>Accra, Ghana</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;