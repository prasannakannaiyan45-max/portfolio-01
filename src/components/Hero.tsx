import React from 'react';
import { motion, type Variants } from 'framer-motion';
import HudRadar from './HudRadar';

const Hero: React.FC = () => {
  // Stagger variants for the main text reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const letterVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
    },
  };

  const name = "PRASANNA";

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-background py-16 md:py-20">
      {/* Subtle background grain/texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 xl:px-24 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content (Text) */}
        <motion.div 
          className="w-full lg:w-[55%] flex flex-col justify-center z-20 order-2 lg:order-1 mt-12 lg:mt-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-primary"></div>
            <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-medium font-sans">
              Cybersecurity Student
            </span>
          </motion.div>

          {/* Huge Typography with Letter Reveal */}
          <div className="overflow-hidden mb-4 py-2">
            <motion.h1 
              className="text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.85] font-bold tracking-tighter text-text flex whitespace-nowrap font-display italic"
              aria-label="PRASANNA"
            >
              {name.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-light text-text mt-4 mb-6 tracking-tight max-w-2xl font-sans"
          >
            Cybersecurity Student & Web Developer
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-muted text-base md:text-lg lg:text-xl max-w-md mb-12 font-light font-sans tracking-wide"
          >
            Building secure digital experiences.
          </motion.p>

          <motion.div variants={itemVariants}>
            <a 
              href="#projects" 
              className="group relative inline-flex items-center gap-4 text-sm md:text-base uppercase tracking-[0.2em] font-medium font-sans overflow-hidden"
            >
              <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-full">Explore Work</span>
              <span className="absolute z-10 top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-primary">Explore Work</span>
              
              <span className="relative z-10 w-8 h-[1px] bg-white transition-all duration-300 group-hover:w-12 group-hover:bg-primary"></span>
              
              {/* Arrow SVG */}
              <svg 
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-primary" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content (HUD Radar) */}
        <motion.div 
          className="w-full lg:w-[45%] h-[50vh] lg:h-[60vh] relative flex lg:justify-end justify-center items-center order-1 lg:order-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        >
          {/* Soft ambient glow behind radar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <motion.div
            className="w-full h-full max-w-[500px] max-h-[500px] relative"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <HudRadar />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
