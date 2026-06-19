import React from 'react';
import { motion } from 'framer-motion';

const skillBlocks = [
  {
    id: 1,
    lines: ["I BUILD", "MODERN WEB", "EXPERIENCES."],
    supporting: ["HTML", "JavaScript", "Responsive Interfaces"]
  },
  {
    id: 2,
    lines: ["I THINK", "ABOUT SECURITY", "FROM THE START."],
    supporting: ["Cybersecurity Fundamentals", "Vulnerability Awareness", "Secure Development"]
  },
  {
    id: 3,
    lines: ["I UNDERSTAND", "HOW SYSTEMS", "CONNECT."],
    supporting: ["Networking Fundamentals", "Internet Protocols", "Digital Infrastructure"]
  },
  {
    id: 4,
    lines: ["I USE AI", "TO WORK", "SMARTER."],
    supporting: ["AI-Assisted Development", "Research", "Productivity Workflows"]
  }
];

const Block: React.FC<{ block: typeof skillBlocks[0]; index: number }> = ({ block }) => {
  return (
    <div className="flex flex-col justify-center relative py-2 md:py-3 border-b border-border/10">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-center">
        {/* Number Indicator */}
        <div className="lg:col-span-1 hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="text-primary text-base font-light"
          >
            ◆
          </motion.div>
        </div>

        {/* Main Text */}
        <div className="lg:col-span-7">
          <div className="lg:hidden text-primary text-base font-light pb-3">
            ◆
          </div>
          {block.lines.map((line, i) => (
            <div key={i} className="overflow-hidden py-0.5">
              <motion.h3
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.15,
                  ease: [0.33, 1, 0.68, 1] 
                }}
                className="text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.88] font-semibold tracking-[-0.01em] text-text uppercase font-display italic"
              >
                {line}
              </motion.h3>
            </div>
          ))}
        </div>
        
        {/* Supporting Text */}
        <div className="lg:col-span-4 flex flex-col gap-2 border-l border-primary/20 pl-5 md:pl-6 mt-2 lg:mt-0">
          {block.supporting.map((skill, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + (i * 0.1),
                  ease: [0.33, 1, 0.68, 1] 
                }}
                className="text-muted text-sm md:text-base font-normal tracking-[0.25em] uppercase font-sans"
              >
                {skill}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="w-full bg-background relative z-10 py-6 md:py-8 overflow-hidden border-t border-border/10">
      {/* Section Header */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 xl:px-24 mb-3 lg:mb-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-primary"></div>
          <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-primary font-medium font-sans">
            Skills
          </span>
        </motion.div>
      </div>

      <div className="flex flex-col">
        {skillBlocks.map((block, i) => (
          <Block key={block.id} block={block} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
