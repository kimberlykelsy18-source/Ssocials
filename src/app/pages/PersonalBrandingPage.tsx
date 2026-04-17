import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";

export function PersonalBrandingPage() {
  const { personalBrandingOfferings: offerings, personalBrandingAudiences: audiences } = useContentStore();

  return (
    <div className="overflow-x-hidden">
      <DocumentHead
        title="Personal Branding — S.Socials"
        description="Build a personal brand that builds trust. We position doctors and founders as trusted authorities in health, beauty, and wellness."
      />

      {/* Hero — manifesto-style */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[760px]"
        >
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-px w-10 bg-current opacity-25 origin-left"
            />
            <span className="text-[10px] tracking-[0.18em] opacity-35">PERSONAL BRANDING</span>
          </div>
          <h1 className="mb-5 md:mb-6 text-[24px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-0.02em]">
            Build a Personal Brand<br className="hidden md:block" /> That Builds Trust
          </h1>
        </motion.div>

        {/* Manifesto block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-[900px]"
        >
          <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-55 border-l border-border pl-4 md:pl-5">
            In the health, beauty, and wellness space, your personal presence directly influences how your business is perceived.
          </p>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-55 border-l border-border pl-4 md:pl-5">
            We help you position yourself as a trusted authority through strategy, image, and content.
          </p>
        </motion.div>
      </section>

      {/* What We Offer — numbered editorial grid */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <div className="h-px w-10 bg-current opacity-25" />
            <span className="text-[10px] tracking-[0.18em] opacity-35">WHAT WE OFFER</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
            {offerings.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
                className={`relative p-4 md:p-6 lg:p-8 border-border ${
                  index < offerings.length - 1 ? "border-b" : ""
                } ${index % 2 === 0 ? "md:border-r" : ""} ${
                  index < offerings.length - 2 ? "md:border-b" : "md:border-b-0"
                }`}
              >
                {/* Ghost number */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-5 text-[40px] font-light opacity-[0.06] leading-none select-none tracking-[-0.03em]"
                >
                  {item.number}
                </span>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.15em] opacity-30">{item.number}</span>
                  <h3 className="text-[16px] md:text-[18px] lg:text-[20px] tracking-[-0.01em]">
                    {item.title}
                  </h3>
                </div>

                {/* Animated underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.09 + 0.2, ease: "easeOut" }}
                  className="h-px bg-current opacity-12 origin-left mb-3"
                />

                <p className="text-[13px] md:text-[14px] leading-relaxed opacity-55">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-12 lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8 md:mb-10"
        >
          <div className="h-px w-10 bg-current opacity-25" />
          <span className="text-[10px] tracking-[0.18em] opacity-35">WHO THIS IS FOR</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {audiences.map((a, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className={`p-4 md:p-6 lg:p-8 ${
                index < audiences.length - 1 ? "border-b md:border-b-0 md:border-r border-border" : ""
              }`}
            >
              <h3 className="mb-2 text-[18px] md:text-[20px] lg:text-[22px] tracking-[-0.01em]">
                {a.title}
              </h3>
              <p className="mb-3 text-[13px] md:text-[14px] italic font-light opacity-70 leading-snug">
                "{a.statement}"
              </p>
              <p className="text-[12px] md:text-[13px] leading-relaxed opacity-45">
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
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
            <p className="text-[10px] tracking-[0.2em] opacity-40 mb-4">YOUR AUTHORITY STARTS HERE</p>
            <h2 className="mb-6 text-[24px] md:text-[32px] lg:text-[42px] leading-[1.15] tracking-[-0.02em]">
              Ready to build your authority?
            </h2>
            <Button to="/contact" variant="secondary">Book a Consultation</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
