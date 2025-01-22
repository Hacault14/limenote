"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-animate steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mockupSteps = [
    {
      title: "Customer Feedback",
      description: "How likely are you to recommend us?",
      preview: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium
                    ${currentStep === 0 && num <= 8 ? "bg-[#FFC325] text-black" : "bg-white/10 text-white"}`}
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>Not likely</span>
            <span>Very likely</span>
          </div>
        </div>
      ),
    },
    {
      title: "Product Survey",
      description: "What features would you like to see?",
      preview: (
        <div className="space-y-3">
          {[
            "AI Form Generation",
            "Advanced Analytics",
            "Custom Branding",
            "Team Collaboration"
          ].map((feature, i) => (
            <motion.div
              key={feature}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`group relative overflow-hidden rounded-xl ${
                currentStep === 1 && i === 0 ? "bg-[#FFC325]" : "bg-white/10"
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FFC325] to-[#FFC325]/60"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: currentStep === 1 && i === 0 ? "none" : "block" }}
              />
              <div className="relative p-4 flex items-center justify-between">
                <span className={currentStep === 1 && i === 0 ? "text-black" : "text-white"}>
                  {feature}
                </span>
                {currentStep === 1 && i === 0 && (
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      title: "Event Registration",
      description: "Select your workshop sessions",
      preview: (
        <div className="space-y-4">
          {[
            { time: "9:00 AM", title: "Form Design Mastery", spots: "5 spots left" },
            { time: "11:00 AM", title: "Conversion Optimization", spots: "2 spots left" },
            { time: "2:00 PM", title: "Analytics Workshop", spots: "7 spots left" },
          ].map((session, i) => (
            <motion.div
              key={session.time}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl ${
                currentStep === 2 && i === 1 ? "bg-[#FFC325]" : "bg-white/10"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${
                    currentStep === 2 && i === 1 ? "text-black/60" : "text-white/60"
                  }`}>{session.time}</p>
                  <p className={
                    currentStep === 2 && i === 1 ? "text-black font-medium" : "text-white"
                  }>{session.title}</p>
                </div>
                <div className={`text-xs ${
                  currentStep === 2 && i === 1 ? "text-black/60" : "text-white/60"
                }`}>
                  {session.spots}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Mouse gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, #FFC32526, transparent 80%)`,
        }}
      />

      {/* Background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8 h-screen flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-16 w-full">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left pt-20"
          >
            <h1 className="font-inter text-5xl lg:text-7xl text-white mb-8 font-bold">
              Forms that
              <span className="block text-[#FFC325] font-naturaly font-normal">
                actually convert
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 max-w-xl">
              Create stunning forms in minutes.
              Just pure conversion-focused forms that get results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#FFC325] text-black rounded-xl text-lg font-medium hover:bg-[#FFC325]/90 transition-colors"
              >
                Start Building
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-xl text-lg font-medium hover:bg-white/10 transition-colors"
              >
                View Examples
              </motion.button>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start text-zinc-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FFC325]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Just $7 today</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FFC325]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited everything</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative pt-20"
          >
            <div className="relative mx-auto max-w-[480px]">
              {/* Glow effect */}
              <motion.div 
                className="absolute inset-0 bg-[#FFC325] blur-[100px] opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main form container */}
              <motion.div 
                className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-[2rem] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <motion.h3
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl font-medium text-white"
                      >
                        {mockupSteps[currentStep].title}
                      </motion.h3>
                      <motion.p
                        key={`desc-${currentStep}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-white/60"
                      >
                        {mockupSteps[currentStep].description}
                      </motion.p>
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((step) => (
                        <motion.div
                          key={step}
                          className={`w-2 h-2 rounded-full ${
                            step === currentStep ? "bg-[#FFC325]" : 
                            step < currentStep ? "bg-white" : "bg-white/20"
                          }`}
                          animate={step === currentStep ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Form content */}
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="min-h-[300px]"
                  >
                    {mockupSteps[currentStep].preview}
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -right-8 top-10 p-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFC325]/20 flex items-center justify-center">
                    📈
                  </div>
                  <div>
                    <div className="h-2 w-16 bg-white/30 rounded-full" />
                    <div className="h-2 w-12 bg-white/20 rounded-full mt-2" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-20 p-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl"
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#FFC325]/20 flex items-center justify-center">
                    ⚡
                  </div>
                  <div className="h-8 w-20 bg-white/20 rounded-xl" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Transition gradient */}
      <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-b from-black to-black" />
    </section>
  );
};

export default HeroSection; 