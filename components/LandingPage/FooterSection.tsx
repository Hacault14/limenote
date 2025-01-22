"use client";

import { motion } from "framer-motion";
import config from "@/config";
import { useConfigColors } from "@/hooks/useConfigColors";
import SocialIcon from "@/components/ui/SocialIcon";

const FooterSection = () => {
  const colors = useConfigColors();
  const { footer } = config.landing;

  return (
    <footer className="relative bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="relative max-w-7xl mx-auto py-12 px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-naturaly text-3xl text-black">
                {config.appName}
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-zinc-600"
            >
              {footer.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex space-x-6"
            >
              {footer.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 transition-colors"
                  style={{ color: "currentColor" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                  onMouseLeave={(e) => e.currentTarget.style.color = "currentColor"}
                >
                  <span className="sr-only">{item.name}</span>
                  <SocialIcon icon={item.icon} className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </motion.div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="md:grid md:grid-cols-1 md:gap-8"
              >
                <div>
                  <h3 className="text-sm font-semibold text-black">Legal</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {footer.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm text-zinc-600 transition-colors"
                          style={{ color: "currentColor" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                          onMouseLeave={(e) => e.currentTarget.style.color = "currentColor"}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 border-t border-zinc-200 pt-8"
        >
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} F*ck Subscription. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection; 