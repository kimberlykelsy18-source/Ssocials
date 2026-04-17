import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";

export function PortfolioPage() {
  const { caseStudies } = useContentStore();

  return (
    <div className="overflow-x-hidden">
      <DocumentHead
        title="Portfolio — S.Socials"
        description="Case studies showcasing how we transform brands into high-performing assets in health, beauty, wellness, and healthcare."
      />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[640px]"
        >
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-px w-10 bg-current opacity-25 origin-left"
            />
            <span className="text-[10px] tracking-[0.18em] opacity-35">OUR WORK</span>
          </div>
          <h1 className="mb-4 text-[24px] md:text-[38px] lg:text-[50px] leading-[1.1] tracking-[-0.02em]">
            Portfolio
          </h1>
          <p className="text-[14px] md:text-[15px] leading-relaxed opacity-55">
            We don't just create — we transform brands into high-performing assets.
          </p>
        </motion.div>
      </section>

      {/* Case Studies */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-14 md:pb-18 lg:pb-24">
        {/* Top divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px bg-current opacity-10 origin-left mb-0"
        />

        {caseStudies.map((study, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 py-10 md:py-12 border-b border-border"
          >
            {/* Image — number lives inside here, never over text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`lg:col-span-6 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
            >
              <div className="overflow-hidden border border-border relative">
                <ImageWithFallback
                  src={study.image}
                  alt={study.title}
                  className="w-full h-[220px] md:h-[280px] lg:h-[340px] object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Case number overlaid on image — purely decorative */}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  aria-hidden="true"
                  className="absolute bottom-3 right-4 text-[40px] md:text-[52px] font-light leading-none select-none pointer-events-none text-white opacity-30 tracking-[-0.04em]"
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </div>
            </motion.div>

            {/* Content */}
            <div
              className={`lg:col-span-6 flex flex-col justify-center relative z-10 ${
                index % 2 === 0 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              {/* Study title */}
              <div className="mb-5 md:mb-6">
                <span className="text-[10px] tracking-[0.18em] opacity-55 block mb-2">
                  CASE STUDY — {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-[20px] md:text-[24px] lg:text-[28px] tracking-[-0.01em]">
                  {study.title}
                </h2>
                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
                  className="h-px bg-current opacity-15 origin-left mt-3"
                />
              </div>

              {/* P / S / R — editorial three-column on lg */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                <div>
                  <p className="text-[9px] tracking-[0.18em] opacity-55 mb-1.5">PROBLEM</p>
                  <p className="text-[13px] md:text-[14px] leading-snug opacity-55">
                    {study.problem}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.18em] opacity-55 mb-1.5">SOLUTION</p>
                  <p className="text-[13px] md:text-[14px] leading-snug opacity-55">
                    {study.solution}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.18em] opacity-55 mb-1.5">RESULT</p>
                  <p className="text-[13px] md:text-[15px] leading-snug opacity-85 font-normal">
                    {study.result}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-14 md:py-18 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[680px] mx-auto text-center"
          >
            <p className="text-[10px] tracking-[0.2em] opacity-40 mb-4">YOUR BRAND, NEXT</p>
            <h2 className="mb-6 text-[24px] md:text-[32px] lg:text-[42px] leading-[1.15] tracking-[-0.02em]">
              Ready to transform your brand?
            </h2>
            <Button to="/contact" variant="secondary">Book a Consultation</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
