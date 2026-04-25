import { DocumentHead } from "../components/DocumentHead";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";
import { Button } from "../components/Button";
import { CONTAINER } from "../lib/styles";

export function AboutPage() {
  const store = useContentStore();

  return (
    <div className="overflow-x-hidden">
      <DocumentHead title="About — S.Socials" description={store.aboutText1} />
      
      {/* Hero */}
      <section className={`${CONTAINER} pt-8 md:pt-10 lg:pt-12 pb-8 md:pb-10 lg:pb-12`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[900px]"
        >
          <h1 className="mb-4 md:mb-5 text-[24px] md:text-[34px] lg:text-[42px] xl:text-[48px] leading-[1.15] tracking-[-0.02em]">
            {store.aboutHeroTitle}
          </h1>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60 max-w-[700px]">
            {store.aboutText1}
          </p>
        </motion.div>
      </section>

      {/* Image */}
      <section className={`${CONTAINER} pb-10 md:pb-14 lg:pb-16`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="aspect-[16/9] overflow-hidden border border-border"
        >
          <ImageWithFallback
            src={store.aboutImages.hero}
            alt="Professional healthcare branding"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Content Grid */}
      <section className={`${CONTAINER} pb-10 md:pb-14 lg:pb-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-4 md:mb-5 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
              What We Do
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60">
              {store.aboutText2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="mb-4 md:mb-5 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
              Why It Matters
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60">
              {store.aboutText3}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary py-10 md:py-14 lg:py-16">
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-4 md:p-6 lg:p-8 xl:p-10 border border-border bg-card"
            >
              <h3 className="mb-4 md:mb-5 text-[16px] md:text-[17px] lg:text-[18px] tracking-[0.1em] opacity-60">
                MISSION
              </h3>
              <p className="text-[14px] md:text-[17px] lg:text-[20px] leading-relaxed">
                {store.aboutMission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="p-4 md:p-6 lg:p-8 xl:p-10 border border-border bg-card"
            >
              <h3 className="mb-4 md:mb-5 text-[16px] md:text-[17px] lg:text-[18px] tracking-[0.1em] opacity-60">
                VISION
              </h3>
              <p className="text-[14px] md:text-[17px] lg:text-[20px] leading-relaxed">
                {store.aboutVision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${CONTAINER} py-10 md:py-14 lg:py-16`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-[700px] mx-auto"
        >
          <h2 className="mb-4 md:mb-5 text-[24px] md:text-[32px] lg:text-[40px] xl:text-[44px] leading-[1.2] tracking-[-0.02em]">
            Let's work together.
          </h2>
          <p className="mb-5 md:mb-7 text-[14px] md:text-[15px] lg:text-[16px] opacity-60">
            Build a brand that doesn't just exist—it leads, influences, and transforms.
          </p>
          <Button to="/contact">Book a Consultation</Button>
        </motion.div>
      </section>
    </div>
  );
}
