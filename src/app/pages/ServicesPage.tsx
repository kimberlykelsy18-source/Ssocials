import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";

export function ServicesPage() {
  const { servicesHeroTitle, servicesHeroSubtitle } = useContentStore();

  const services = [
    {
      title: "Brand & Identity",
      items: ["Brand strategy", "Logo design", "Brand guidelines"],
      outcome: "A clear, credible, and premium brand foundation.",
    },
    {
      title: "Marketing & Growth",
      items: ["Social media management", "Campaign strategy", "Influencer marketing", "Events and pop ups"],
      outcome: "Increased visibility, engagement, and client acquisition.",
    },
    {
      title: "Creative & Content",
      items: ["Graphic design", "Content direction", "Visual storytelling"],
      outcome: "A strong, cohesive, and engaging brand presence.",
    },
    {
      title: "Digital Presence",
      items: ["Website design & development", "Landing pages"],
      outcome: "Platforms that convert visitors into clients.",
    },
    {
      title: "Digital Systems & Automation",
      items: ["Booking systems", "CRM integrations", "Sales funnels", "Email automation"],
      outcome: "Streamlined operations and scalable growth.",
    },
    {
      title: "Healthcare Branding & Patient Experience",
      items: ["Institutional branding", "Department branding", "Patient journey optimization"],
      outcome: "Improved trust, credibility, and patient experience.",
    },
    {
      title: "Personal Branding & Image Consultancy",
      items: ["Personal brand positioning", "Image consultancy", "Content strategy"],
      outcome: "Authority, trust, and visibility.",
    },
    {
      title: "Consulting",
      items: ["Brand audits", "Strategy sessions"],
      outcome: "Clear direction and actionable growth plans.",
    },
  ];

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
  } as const;

  return (
    <div className="overflow-x-hidden">
      <DocumentHead
        title="Services — S.Socials"
        description="Comprehensive branding, marketing, and digital solutions for health, beauty, wellness, and private healthcare brands."
      />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-[720px]"
        >
          {/* Eyebrow line */}
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-px w-10 bg-current opacity-25 origin-left"
            />
            <span className="text-[10px] tracking-[0.18em] opacity-35">WHAT WE DO</span>
          </div>

          <h1 className="mb-4 text-[24px] md:text-[38px] lg:text-[48px] leading-[1.1] tracking-[-0.02em]">
            {servicesHeroTitle}
          </h1>
          <p className="text-[14px] md:text-[15px] leading-relaxed opacity-55 max-w-[520px]">
            {servicesHeroSubtitle}
          </p>
        </motion.div>
      </section>

      {/* Services — editorial numbered list */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-14 md:pb-18 lg:pb-24">
        {/* Top divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-px bg-current opacity-10 origin-left mb-0"
        />

        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 py-8 md:py-10 border-b border-border overflow-hidden"
          >
            {/* Step number — small, bottom-right, purely decorative */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              aria-hidden="true"
              className="absolute right-4 bottom-3 text-[11px] tracking-[0.2em] font-light leading-none select-none pointer-events-none opacity-[0.25]"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>

            {/* Left: number badge + title + items */}
            <div className="lg:col-span-5 relative z-10">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[11px] tracking-[0.15em] opacity-50 font-light">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-[17px] md:text-[19px] lg:text-[21px] tracking-[-0.01em]">
                  {service.title}
                </h2>
              </div>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className="h-px bg-current opacity-15 origin-left mb-4 md:mb-5"
              />

              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-2"
              >
                {service.items.map((item, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3 text-[13px] md:text-[14px] opacity-55"
                  >
                    <span className="w-3 h-px bg-current opacity-50 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Right: outcome — large, confident */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-center relative z-10"
            >
              <span className="text-[10px] tracking-[0.18em] opacity-55 mb-3 block">
                OUTCOME
              </span>
              <p className="text-[18px] md:text-[22px] lg:text-[26px] font-light leading-[1.25] opacity-85 tracking-[-0.01em]">
                {service.outcome}
              </p>
            </motion.div>
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
            <p className="text-[10px] tracking-[0.2em] opacity-40 mb-4">READY TO BEGIN</p>
            <h2 className="mb-6 text-[24px] md:text-[32px] lg:text-[42px] leading-[1.15] tracking-[-0.02em]">
              Let's build something exceptional
            </h2>
            <Button to="/contact" variant="secondary">Book a Consultation</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
