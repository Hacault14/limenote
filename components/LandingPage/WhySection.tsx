"use client";

import { motion } from "framer-motion";
import config from "@/config";
import { useConfigColors } from "@/hooks/useConfigColors";
import WhyIcon from "@/components/ui/WhyIcon";
import Link from "next/link";

const WhySection = () => {
  const colors = useConfigColors();
  const { why } = config.landing;

  return (
    <section className="relative bg-black py-32 overflow-hidden" id="why">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-inter text-5xl lg:text-6xl text-white mb-6 font-bold"
          >
            Why choose
            <span 
              className="block bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.accent}, ${colors.accent}, ${colors.accent}50)`
              }}
            >
              <span className="font-naturaly font-normal">{why.titleAccent.replace('?', '')}</span>?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            {why.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {why.items.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FFC325]/5 to-[#FFC325]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
              <div className="relative">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div 
                      className="flex items-center justify-center w-16 h-16 rounded-2xl text-black"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <WhyIcon icon={feature.icon} className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <button 
            className="px-8 py-4 rounded-xl text-lg font-medium text-black hover:opacity-90 transition-colors"
            style={{ backgroundColor: colors.accent }}
          >
            <Link href="/signup">Get Started</Link>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection; 