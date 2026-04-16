import { DocumentHead } from "../components/DocumentHead";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";
import { Button } from "../components/Button";

export function AboutPage() {
  const store = useContentStore();

  return (
    <div className="overflow-x-hidden">
      <DocumentHead title="About — S.Socials" description={store.aboutText1} />
      
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[900px]"
        >
          <h1 className="mb-16 md:mb-20 text-[28px] md:text-[36px] lg:text-[44px] xl:text-[52px] leading-[1.15] tracking-[-0.02em]">
            {store.aboutHeroTitle}
          </h1>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60 max-w-[700px]">
            {store.aboutText1}
          </p>
        </motion.div>
      </section>

      {/* Image */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-20 md:pb-32 lg:pb-40">
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
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-20 md:pb-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-12 md:mb-16 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
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
            <h2 className="mb-12 md:mb-16 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
              Why It Matters
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60">
              {store.aboutText3}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary py-20 md:py-32 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-20 md:p-24 lg:p-32 border border-border bg-card"
            >
              <h3 className="mb-12 md:mb-16 text-[16px] md:text-[17px] lg:text-[18px] tracking-[0.1em] opacity-60">
                MISSION
              </h3>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed">
                {store.aboutMission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="p-20 md:p-24 lg:p-32 border border-border bg-card"
            >
              <h3 className="mb-12 md:mb-16 text-[16px] md:text-[17px] lg:text-[18px] tracking-[0.1em] opacity-60">
                VISION
              </h3>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed">
                {store.aboutVision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-[700px] mx-auto"
        >
          <h2 className="mb-12 md:mb-16 text-[24px] md:text-[32px] lg:text-[40px] xl:text-[44px] leading-[1.2] tracking-[-0.02em]">
            Let's work together.
          </h2>
          <p className="mb-16 md:mb-20 text-[14px] md:text-[15px] lg:text-[16px] opacity-60">
            Build a brand that doesn't just exist—it leads, influences, and transforms.
          </p>
          <Button to="/contact">Book a Consultation</Button>
        </motion.div>
      </section>
    </div>
  );
}
