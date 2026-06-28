import React from 'react';
import { motion } from 'framer-motion';

/**
 * Refined section header: small uppercase "kicker" + display title (+ optional
 * accent word in red) and optional subtitle. Replaces the repeated chunky red bar.
 */
export default function SectionHeading({ kicker, title, accent, subtitle, align = 'center' }) {
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignCls} mb-14 md:mb-16`}
    >
      {kicker && <span className="eyebrow mb-4">{kicker}</span>}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.02em] text-white uppercase leading-[1.05]">
        {title}{accent && <> <span className="text-[#E8003A]">{accent}</span></>}
      </h2>
      {subtitle && (
        <p className="mt-5 text-[#9A9A9A] max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
