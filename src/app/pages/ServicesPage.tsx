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

  return (
    <div>
      <DocumentHead
        title="Services — S.Socials"
        description="Comprehensive branding, marketing, and digital solutions for health, beauty, wellness, and private healthcare brands."
      />
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-32 md:py-48 lg:py-64">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-24 text-[28px] md:text-[48px] lg:text-[64px] leading-[1.2] tracking-[-0.02em]"
          >
            {servicesHeroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed opacity-60"
          >
            {servicesHeroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-32 md:pb-48 lg:pb-64">
        <div className="space-y-32 md:space-y-40">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 lg:gap-40 pb-32 md:pb-40 ${
                index !== services.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="lg:col-span-4">
                <h2 className="mb-12 md:mb-16 text-[20px] md:text-[24px] lg:text-[28px] tracking-[-0.01em]">
                  {service.title}
                </h2>
                <ul className="space-y-6 md:space-y-8">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[13px] md:text-[14px] lg:text-[16px] opacity-60 flex items-start">
                      <span className="mr-6 md:mr-8">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-8 lg:pt-8">
                <h3 className="mb-8 md:mb-12 text-[11px] md:text-[12px] tracking-[0.1em] opacity-40">
                  OUTCOME
                </h3>
                <p className="text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed opacity-60">
                  {service.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-40 md:py-56 lg:py-64">
          <div className="max-w-[700px] mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-24 md:mb-32 text-[24px] md:text-[32px] lg:text-[48px] leading-[1.2] tracking-[-0.01em]"
            >
              Let's build something exceptional
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <Button to="/contact" variant="secondary">Book a Consultation</Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}