"use client";

import { motion } from "framer-motion";
import config from "@/config";
import { useConfigColors } from "@/hooks/useConfigColors";
import ConfigIcon from "@/components/ui/ConfigIcon";

const FeaturesSection = () => {
  const colors = useConfigColors();
  const { features } = config.landing;

  return (
    <section className="relative bg-white py-32 overflow-hidden" id="features">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[128px]"
          style={{ backgroundColor: colors.accent }}
        />
        <div 
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[128px]"
          style={{ backgroundColor: colors.accentOpacity80 }}
        />
        <div 
          className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[128px]"
          style={{ backgroundColor: colors.accentOpacity60 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-inter text-5xl lg:text-6xl text-black mb-6 font-bold"
          >
            {features.title}
            <span 
              className="block bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.accent}, ${colors.accentLight})`
              }}
            >
              {features.titleAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-zinc-600 max-w-2xl mx-auto"
          >
            {features.description}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.items.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-px bg-gradient-to-b from-black/5 to-black/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-black/5 rounded-xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="flex items-center justify-center w-12 h-12 rounded-xl text-white"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <ConfigIcon icon={feature.icon} className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 