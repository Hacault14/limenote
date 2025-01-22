"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import config from "@/config";
import { useConfigColors } from "@/hooks/useConfigColors";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const colors = useConfigColors();
  const { testimonials } = config.landing;

  return (
    <section className="relative bg-black py-32 overflow-hidden" id="testimonials">
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
            {testimonials.title}
            <span 
              className="block bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.accent}, ${colors.accent}, ${colors.accent}50)`
              }}
            >
              {testimonials.titleAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            {testimonials.description}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              className="absolute -inset-4 rounded-2xl blur-lg" 
              style={{ 
                background: `linear-gradient(to right, ${colors.accent}20, ${colors.accent}00)` 
              }}
            />
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10">
              {testimonials.items.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-300 ${
                    index === activeIndex ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full" style={{ backgroundColor: `${colors.accent}20` }} />
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-zinc-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        style={{ color: colors.accent }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg text-zinc-300 leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            {testimonials.items.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`text-left p-6 rounded-xl transition-all ${
                  index === activeIndex
                    ? "text-black"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
                style={index === activeIndex ? { backgroundColor: colors.accent } : undefined}
              >
                <h4 className="text-lg font-bold mb-1">{testimonial.name}</h4>
                <p className={index === activeIndex ? "text-black/80" : "text-zinc-400"}>
                  {testimonial.role}
                </p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 