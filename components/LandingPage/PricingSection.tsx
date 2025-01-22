"use client";

import { motion } from "framer-motion";
import config from "@/config";
import { useConfigColors } from "@/hooks/useConfigColors";

const PricingSection = () => {
  const colors = useConfigColors();
  const { pricing } = config.landing;

  return (
    <section className="relative bg-white py-32 overflow-hidden" id="pricing">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#00000015_1px,transparent_1px)] [background-size:16px_16px]" />
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
            {pricing.title}
            <span 
              className="block bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.accent}, ${colors.accent}, ${colors.accent}50)`
              }}
            >
              {pricing.titleAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-zinc-600 max-w-2xl mx-auto"
          >
            {pricing.description}
          </motion.p>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group"
          >
            {/* Hover effect */}
            <div 
              className="absolute -inset-[1px] rounded-2xl blur-lg" 
              style={{ 
                background: `linear-gradient(to right, ${colors.accent}20, ${colors.accent}00)` 
              }}
            />
            
            {/* Card */}
            <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: colors.accent }}>
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">
                      {pricing.card.title}
                    </h3>
                    <p className="text-black/80">
                      {pricing.card.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-black">${pricing.card.price.amount}</span>
                        <span className="text-black/80">{pricing.card.price.label}</span>
                      </div>
                      <span className="text-sm text-black/60 line-through">{pricing.card.price.comparison}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 px-6 rounded-xl text-lg font-medium bg-black text-white hover:bg-black/90 transition-colors">
                  {pricing.card.cta}
                </button>

                <div className="mt-8 grid md:grid-cols-2 gap-4">
                  {pricing.card.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-black/80"
                    >
                      <svg
                        className="w-5 h-5 text-black flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-black/5 rounded-lg">
                  <p className="text-sm text-black/70 text-center">
                    {pricing.card.priceIncreaseNotice}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-zinc-600">
            {pricing.footer.text}{" "}
            <a href="#" style={{ color: colors.accent }} className="hover:opacity-80">
              {pricing.footer.linkText}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 