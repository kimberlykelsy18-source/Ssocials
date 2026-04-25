import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";
import { CONTAINER, EYEBROW } from "../lib/styles";

export function ProcessPage() {
  const { processSteps: steps } = useContentStore();

  return (
    <div className="overflow-x-hidden">
      <DocumentHead
        title="Our Process — S.Socials"
        description="A systematic approach to building and scaling premium brands in health, beauty, wellness, and private healthcare."
      />

      {/* Hero */}
      <section className={`${CONTAINER} pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12`}>
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
            <span className={EYEBROW}>HOW WE WORK</span>
          </div>
          <h1 className="mb-4 text-[24px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-0.02em]">
            Our Process
          </h1>
          <p className="text-[14px] md:text-[15px] leading-relaxed opacity-55">
            A systematic approach to building and scaling premium brands.
          </p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className={`${CONTAINER} pb-14 md:pb-18 lg:pb-24`}>
        <div className="max-w-[900px] mx-auto">
          {/* Vertical connector wrapper */}
          <div className="relative">
            {/* The continuous vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute left-[19px] md:left-[23px] top-3 bottom-3 w-px bg-border origin-top hidden md:block"
            />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                className="relative flex gap-8 md:gap-12 lg:gap-16 pb-12 md:pb-14 last:pb-0"
              >
                {/* Step indicator */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2, ease: "backOut" }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border bg-background flex items-center justify-center relative z-10"
                  >
                    <span className="text-[11px] md:text-[12px] tracking-[0.1em] opacity-50 font-light">
                      {step.number}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="relative mb-3">
                    {/* Step number — far right, tucked, non-intrusive */}
                    <span
                      aria-hidden="true"
                      className="absolute right-0 top-0 text-[11px] tracking-[0.18em] opacity-20 font-light select-none pointer-events-none"
                    >
                      {step.number}
                    </span>

                    <h2 className="text-[20px] md:text-[24px] lg:text-[28px] tracking-[-0.01em] mb-2 relative z-10">
                      {step.title}
                    </h2>

                    {/* Animated underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: 0.25, ease: "easeOut" }}
                      className="h-px bg-current opacity-12 origin-left mb-4"
                    />
                  </div>

                  {/* Short bold description */}
                  <p className="text-[15px] md:text-[16px] lg:text-[17px] font-normal opacity-80 leading-snug mb-3">
                    {step.description}
                  </p>

                  {/* Supporting detail */}
                  <p className="text-[13px] md:text-[14px] leading-relaxed opacity-45">
                    {step.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className={`${CONTAINER} py-14 md:py-18 lg:py-24`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[700px] mx-auto text-center"
          >
            <p className="text-[10px] tracking-[0.2em] opacity-40 mb-4">START YOUR JOURNEY</p>
            <h2 className="mb-6 text-[24px] md:text-[32px] lg:text-[42px] leading-[1.15] tracking-[-0.02em]">
              Ready to get started?
            </h2>
            <Button to="/contact" variant="secondary">Book a Consultation</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
