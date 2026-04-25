import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";
import { CONTAINER, EYEBROW, SECTION_HEADING } from "../lib/styles";

export function PackagesPage() {
  const { packagesHeroTitle, packagesHeroSubtitle, packages } = useContentStore();

  return (
    <div className="overflow-x-hidden">
      <DocumentHead
        title="Packages — S.Socials"
        description="Structured brand growth packages designed to meet your business at every stage, from foundation to market leadership."
      />

      {/* Hero */}
      <section className={`${CONTAINER} pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-px w-10 bg-current opacity-25 origin-left"
              />
              <span className={EYEBROW}>INVESTMENT</span>
            </div>
            <h1 className="text-[24px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-0.02em]">
              {packagesHeroTitle}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <p className="text-[14px] md:text-[15px] leading-relaxed opacity-55 max-w-[480px]">
              {packagesHeroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className={`${CONTAINER} pb-14 md:pb-18 lg:pb-24`}>
        {/* Top divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px bg-current opacity-10 origin-left mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {packages.map((pkg, index) => {
            const isFeatured = pkg.featured;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
                className={`relative flex flex-col border overflow-hidden ${
                  isFeatured
                    ? "border-primary bg-primary text-primary-foreground lg:col-span-2"
                    : "border-border bg-card"
                }`}
              >
                {/* Tier bar — top accent */}
                <div className={`h-[3px] w-full ${isFeatured ? "bg-primary-foreground/20" : "bg-border"}`}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.07 + 0.2, ease: "easeOut" }}
                    className={`h-full origin-left ${
                      isFeatured ? "bg-primary-foreground/60" : "bg-primary/40"
                    }`}
                    style={{ width: `${(pkg.tier / 3) * 100}%` }}
                  />
                </div>

                <div className="p-4 md:p-6 lg:p-7 flex flex-col flex-1">
                  {/* Package name + subtitle */}
                  <div className="mb-6 pb-5 border-b border-current/10">
                    {isFeatured && (
                      <span className="text-[9px] tracking-[0.2em] opacity-50 mb-2 block">
                        FLAGSHIP
                      </span>
                    )}
                    <h2 className={`mb-1.5 ${SECTION_HEADING}`}>
                      {pkg.name}
                    </h2>
                    <p className={`text-[12px] tracking-[0.03em] ${
                      isFeatured ? "opacity-55" : "opacity-45"
                    }`}>
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Includes */}
                  <div className="mb-6 flex-1">
                    <p className={`text-[9px] tracking-[0.18em] mb-3 ${
                      isFeatured ? "opacity-60" : "opacity-55"
                    }`}>
                      INCLUDES
                    </p>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 + i * 0.06 }}
                          className={`flex items-center gap-3 text-[13px] md:text-[14px] ${
                            isFeatured ? "opacity-75" : "opacity-60"
                          }`}
                        >
                          <span className={`w-3 h-px flex-shrink-0 ${
                            isFeatured ? "bg-primary-foreground/50" : "bg-current opacity-30"
                          }`} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Result */}
                  <div className={`pt-5 border-t border-current/10`}>
                    <p className={`text-[9px] tracking-[0.18em] mb-2 ${
                      isFeatured ? "opacity-60" : "opacity-55"
                    }`}>
                      RESULT
                    </p>
                    <p className={`text-[14px] md:text-[15px] font-light leading-snug ${
                      isFeatured ? "opacity-90" : "opacity-80"
                    }`}>
                      {pkg.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            <p className="text-[10px] tracking-[0.2em] opacity-40 mb-4">TAKE THE FIRST STEP</p>
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
