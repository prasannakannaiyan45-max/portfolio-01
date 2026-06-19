import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    number: "01",
    title: "EVENT MANAGEMENT PORTAL",
    description: "A modern platform for managing events, registrations, scheduling, and participant engagement.",
    href: "#",
  },
  {
    number: "02",
    title: "CYBERSECURITY AWARENESS PLATFORM",
    description: "An educational web application focused on cyber threats, digital safety, and security awareness.",
    href: "#",
  },
  {
    number: "03",
    title: "PERSONAL PORTFOLIO EXPERIENCE",
    description: "A creative portfolio centered on storytelling, motion design, and premium user experiences.",
    href: "#",
  },
];

const ProjectRow: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  return (
    <div className="relative border-b border-border/20 group">
      {/* Hover fill bar */}
      <motion.div
        className="absolute inset-0 bg-primary/5 origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      />

      <motion.a
        href={project.href}
        className="relative max-w-[1400px] w-full mx-auto px-6 md:px-12 xl:px-24 py-4 md:py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 cursor-pointer block"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.9, delay: 0.05, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Left: Number + Title */}
        <div className="flex flex-col gap-0 flex-1 overflow-hidden">
          {/* Number */}
          <motion.span
            className="text-[clamp(3.5rem,12vw,10rem)] font-bold leading-none tracking-tighter text-text/10 select-none font-serif italic transition-colors duration-500 group-hover:text-primary/20"
          >
            {project.number}
          </motion.span>

          {/* Title */}
          <div className="overflow-hidden -mt-2 md:-mt-4">
            <motion.h3
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, delay: index * 0.08, ease: [0.33, 1, 0.68, 1] }}
              className="text-[clamp(1.6rem,4.5vw,4rem)] font-bold leading-[1] tracking-tighter text-text uppercase font-display italic group-hover:text-primary transition-colors duration-500"
            >
              {project.title}
            </motion.h3>
          </div>
        </div>

        {/* Right: Description + CTA */}
        <div className="flex flex-col items-start lg:items-end gap-5 lg:max-w-[380px] shrink-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: [0.33, 1, 0.68, 1] }}
            className="text-muted text-base md:text-lg font-light leading-relaxed lg:text-right font-sans"
          >
            {project.description}
          </motion.p>

          {/* CTA */}
          {project.number === "03" && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, delay: 0.35 + index * 0.08 }}
              className="flex items-center gap-3 group/cta"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium font-sans transition-all duration-300 group-hover/cta:tracking-[0.4em]">
                View Project
              </span>
              <span className="block h-[1px] w-6 bg-primary transition-all duration-300 group-hover/cta:w-10" />
              <svg
                className="w-3 h-3 text-primary transition-transform duration-300 group-hover/cta:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.a>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="w-full bg-background relative z-10 overflow-hidden border-t border-border/10">
      {/* Section Header */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 xl:px-24 pt-8 md:pt-10 pb-4 md:pb-6 flex items-center justify-between border-b border-border/20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-primary" />
          <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-primary font-medium font-sans">
            Selected Work
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted text-xs tracking-widest uppercase"
        >
          {projects.length} Projects
        </motion.span>
      </div>

      {/* Project Rows */}
      <div className="w-full">
        {projects.map((project, i) => (
          <ProjectRow key={project.number} project={project} index={i} />
        ))}
      </div>

      {/* Bottom padding */}
      <div className="pb-6 md:pb-8" />
    </section>
  );
};

export default Projects;
