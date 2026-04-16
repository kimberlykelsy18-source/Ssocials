import { Button } from "../components/Button";
import { Link } from "react-router";
import { DocumentHead } from "../components/DocumentHead";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";

export function HomePage() {
  const store = useContentStore();

  const services = store.services.slice(0, 4); // Show only 4 services

  const workWith = [
    "Aesthetic clinics",
    "Beauty & skincare brands",
    "Wellness businesses",
    "Private healthcare providers",
  ];

  const process = [
    { number: "01", title: "Strategy", description: "We define your positioning, audience, and direction." },
    { number: "02", title: "Build", description: "We develop your brand identity and systems." },
    { number: "03", title: "Execute", description: "We launch across platforms with precision." },
    { number: "04", title: "Scale", description: "We optimize and grow your brand sustainably." },
  ];

  return (
    <div className="overflow-x-hidden">
      <DocumentHead />
      
      {/* Hero Section - Mobile First */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="mb-12 md:mb-16 text-[24px] md:text-[32px] lg:text-[40px] xl:text-[44px] leading-[1.15] tracking-[-0.02em]">
              {store.homeHeroTitle}
            </h1>
            <p className="mb-16 md:mb-20 text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60 max-w-[600px]">
              {store.homeHeroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
              <Button to="/contact">Book a Consultation</Button>
              <Button to="/portfolio" variant="secondary">View Our Work</Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative aspect-[4/3] lg:aspect-square overflow-hidden border border-border"
          >
            <ImageWithFallback
              src={store.homeImages.hero}
              alt="Luxury wellness branding"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="border-y border-border">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-14">
          <p className="text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.05em] text-center opacity-60">
            {store.credibilityText}
          </p>
        </div>
      </section>

      {/* About + Image Section - Mobile First */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1 aspect-[4/3] overflow-hidden border border-border"
          >
            <ImageWithFallback
              src={store.homeImages.aboutSection}
              alt="Modern aesthetic clinic"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12 md:mb-16 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]"
            >
              {store.homeAboutTitle}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="space-y-12 md:space-y-16"
            >
              <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60">
                {store.homeAboutText1}
              </p>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60">
                {store.homeAboutText2}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-16 md:mt-20"
            >
              <Button to="/about">Learn More About Us</Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid - Mobile First */}
      <section className="bg-secondary py-20 md:py-32 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-24 lg:mb-32"
          >
            <h2 className="mb-8 md:mb-12 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
              Our Services
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] opacity-60 max-w-[600px]">
              We build brands that lead and grow in the health, beauty, wellness, and private healthcare space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="p-16 md:p-20 lg:p-24 border border-border bg-card"
              >
                <h3 className="mb-8 md:mb-12 text-[16px] md:text-[17px] lg:text-[18px] tracking-[-0.01em]">
                  {service.title}
                </h3>
                <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed opacity-60">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Button to="/services">View All Services</Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Work - Mobile First */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <h2 className="mb-8 md:mb-12 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
            Featured Work
          </h2>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] opacity-60 max-w-[600px]">
            Real brands. Real growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="aspect-[4/3] overflow-hidden border border-border"
          >
            <ImageWithFallback
              src={store.homeImages.featuredWork1}
              alt="Featured work 1"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="aspect-[4/3] overflow-hidden border border-border"
          >
            <ImageWithFallback
              src={store.homeImages.featuredWork2}
              alt="Featured work 2"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Button to="/portfolio">View All Work</Button>
        </motion.div>
      </section>

      {/* Process - Mobile First */}
      <section className="bg-secondary py-20 md:py-32 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-24 lg:mb-32"
          >
            <h2 className="mb-8 md:mb-12 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
              How We Work
            </h2>
            <p className="text-[14px] md:text-[15px] lg:text-[16px] opacity-60 max-w-[600px]">
              A proven, strategic approach to building brands that scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="mb-8 md:mb-12 text-[36px] md:text-[40px] lg:text-[48px] font-light opacity-20 tracking-tight">
                  {step.number}
                </div>
                <h3 className="mb-6 md:mb-8 text-[16px] md:text-[17px] lg:text-[18px] tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed opacity-60">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With - Mobile First */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24 lg:mb-32"
        >
          <h2 className="mb-8 md:mb-12 text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] leading-[1.2] tracking-[-0.01em]">
            Who We Work With
          </h2>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] opacity-60 max-w-[600px]">
            We specialize in brands that require credibility, trust, and premium positioning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {workWith.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="p-16 md:p-20 lg:p-24 border border-border bg-card text-center"
            >
              <p className="text-[13px] md:text-[14px] lg:text-[15px] tracking-[0.05em]">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-12 md:mb-16 text-[24px] md:text-[32px] lg:text-[40px] xl:text-[44px] leading-[1.2] tracking-[-0.02em]">
              Ready to build a brand that leads?
            </h2>
            <p className="mb-16 md:mb-20 text-[14px] md:text-[15px] lg:text-[16px] opacity-80 max-w-[600px] mx-auto">
              Let's create something built to scale and designed to convert.
            </p>
            <Link
              to="/contact"
              className="inline-block px-24 md:px-32 py-12 md:py-14 bg-primary-foreground text-primary text-[13px] md:text-[14px] tracking-[0.05em] transition-opacity duration-200 hover:opacity-90"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
