import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedLine: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "120%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: "120%", opacity: 0 }}
        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section className="w-full bg-background text-text flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Section 1 */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 flex items-center py-16 md:py-20">
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
          <AnimatedLine className="text-[clamp(2rem,5.5vw,4.8rem)] leading-[0.9] font-bold tracking-tighter font-display italic" delay={0.1}>
            PASSIONATE ABOUT
          </AnimatedLine>
          <AnimatedLine className="text-[clamp(2rem,5.5vw,4.8rem)] leading-[0.9] font-bold tracking-tighter font-display italic" delay={0.2}>
            BUILDING PRODUCTS
          </AnimatedLine>
          <AnimatedLine className="text-[clamp(2rem,5.5vw,4.8rem)] leading-[0.9] font-bold tracking-tighter text-muted font-display italic" delay={0.3}>
            THAT PEOPLE REMEMBER.
          </AnimatedLine>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-end py-14 md:py-20">
        <div className="max-w-2xl flex flex-col gap-12 text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-tight tracking-wider font-serif italic">
          
          <div>
            <AnimatedLine delay={0.1}>Based in India.</AnimatedLine>
          </div>

          <div>
            <AnimatedLine delay={0.2}>Cybersecurity Student.</AnimatedLine>
            <AnimatedLine delay={0.3}>Developer.</AnimatedLine>
            <AnimatedLine delay={0.4}>Lifelong Learner.</AnimatedLine>
          </div>

          <div className="text-muted">
            <AnimatedLine delay={0.5}>Exploring web technologies,</AnimatedLine>
            <AnimatedLine delay={0.6}>security practices,</AnimatedLine>
            <AnimatedLine delay={0.7}>and modern digital experiences.</AnimatedLine>
          </div>
          
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-center py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-4">
          <AnimatedLine className="text-[clamp(2.9rem,8vw,7.5rem)] leading-[0.8] font-bold tracking-tighter font-sans" delay={0.1}>
            DESIGN.
          </AnimatedLine>
          <AnimatedLine className="text-[clamp(2.9rem,8vw,7.5rem)] leading-[0.8] font-bold tracking-tighter font-sans" delay={0.3}>
            DEVELOP.
          </AnimatedLine>
          <AnimatedLine className="text-[clamp(2.9rem,8vw,7.5rem)] leading-[0.8] font-bold tracking-tighter text-primary font-display italic" delay={0.5}>
            SECURE.
          </AnimatedLine>
        </div>
      </div>

    </section>
  );
};

export default About;
