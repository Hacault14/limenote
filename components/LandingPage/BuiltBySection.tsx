"use client";

import { motion } from "framer-motion";
import config from "@/config";
import { useConfigColors } from "@/hooks/useConfigColors";

const BuiltBySection = () => {
  const colors = useConfigColors();
  const { builtBy } = config.landing;

  return (
    <section className="relative bg-black py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col gap-2 mb-8">
              <span className="font-naturaly text-4xl text-white">
                Built by
              </span>
              <a 
                href={builtBy.cta.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2"
              >
                <span 
                  className="font-naturaly text-4xl group-hover:opacity-90 transition-colors"
                  style={{ color: colors.accent }}
                >
                  F*ck Subscription
                </span>
                <svg 
                  className="w-6 h-6 transition-colors" 
                  style={{ color: `${colors.accent}80` }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>

            <div className="space-y-6 text-zinc-400">
              {builtBy.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              {builtBy.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-zinc-400">
                  <svg 
                    className="w-5 h-5" 
                    style={{ color: colors.accent }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a 
                href={builtBy.cta.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:opacity-80 transition-colors"
                style={{ color: colors.accent }}
              >
                <span>{builtBy.cta.text}</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square"
          >
            <div 
              className="absolute inset-0 blur-[100px] opacity-20" 
              style={{ backgroundColor: colors.accent }}
            />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-full">
              <div 
                className="absolute inset-0 bg-gradient-to-br via-transparent to-transparent"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${colors.accent}20, transparent)` }}
              />
              <div className="relative h-full flex flex-col items-center justify-center p-8 gap-8">
                <div className="text-center">
                  <div 
                    className="text-[8rem] font-naturaly"
                    style={{ color: colors.accent }}
                  >
                    $300B+
                  </div>
                  <div className="text-zinc-400 mt-4">
                    Spent yearly on SaaS
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="text-[4rem] font-naturaly"
                    style={{ color: colors.accent }}
                  >
                    80%
                  </div>
                  <div className="text-zinc-400 mt-4">
                    Features never used
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuiltBySection; 