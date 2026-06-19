import React from 'react';
import { motion } from 'framer-motion';

const contactLinks = [
  { label: 'Email', href: 'mailto:prasannacyx460@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/prasannakannaiyan45-max' },
];

const headingLines = ['LET\'S CREATE', 'SOMETHING', 'MEANINGFUL.'];

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="w-full bg-background relative z-10 overflow-hidden border-t border-border/20"
    >
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 xl:px-24 pt-12 md:pt-16 pb-12 md:pb-16 flex flex-col gap-10 md:gap-14">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-primary" />
          <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.4em] text-primary font-medium font-sans">
            Contact
          </span>
        </motion.div>

        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-14 lg:gap-20">

          {/* Oversized Heading */}
          <div className="flex-1">
            {headingLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: '110%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.12,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] font-semibold tracking-[-0.01em] text-text uppercase font-display italic"
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* Right Column: Description + CTA + Links */}
          <div className="flex flex-col gap-10 lg:max-w-[360px] lg:pb-2 shrink-0">

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="text-muted text-base md:text-lg font-light leading-relaxed font-sans tracking-wide"
            >
              Whether it's a project, collaboration, or simply a conversation
              about technology, I'm always open to connecting.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
            >
              <span
                className="group inline-flex items-center gap-4 relative cursor-pointer"
              >
                {/* Background underline sweep */}
                <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]" />
                <span className="text-text text-sm md:text-base uppercase tracking-[0.25em] font-medium font-sans transition-colors duration-300 group-hover:text-primary">
                  Get in Touch
                </span>
                <svg
                  className="w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </motion.div>

            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-3 border-l border-primary/20 pl-6"
            >
              {contactLinks.map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    initial={{ y: '100%' }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.65 + i * 0.1,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="group flex items-center gap-3 w-fit"
                  >
                    <span className="text-muted text-sm uppercase tracking-[0.25em] font-sans font-normal transition-colors duration-300 group-hover:text-primary">
                      {link.label}
                    </span>
                    <span className="block h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-5" />
                  </motion.a>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Divider Row */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="origin-left h-[1px] w-full bg-border/20"
        />

      </div>
    </section>
  );
};

export default Contact;
