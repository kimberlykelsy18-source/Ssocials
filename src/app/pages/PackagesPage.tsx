import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";

export function PackagesPage() {
  const { packagesHeroTitle, packagesHeroSubtitle } = useContentStore();
  
  const packages = [
    {
      name: "The Foundation",
      subtitle: "For new or rebranding businesses",
      includes: ["Brand strategy", "Logo design", "Brand guidelines"],
      result: "A strong, professional brand foundation.",
    },
    {
      name: "The Growth",
      subtitle: "For scaling brands",
      includes: ["Content creation", "Social media management", "Marketing strategy"],
      result: "Consistent visibility and client acquisition.",
    },
    {
      name: "The Authority",
      subtitle: "For brands ready to dominate",
      includes: ["Full brand management", "Marketing execution", "Digital systems integration"],
      result: "Market leadership and premium positioning.",
    },
    {
      name: "The Healthcare Elevation",
      subtitle: "For private hospitals and healthcare providers",
      includes: ["Brand audit & repositioning", "Website redesign", "Booking systems & CRM", "Patient journey optimization"],
      result: "Improved patient trust, efficiency, and overall experience.",
    },
    {
      name: "The Authority Presence",
      subtitle: "For doctors and founders",
      includes: ["Personal brand strategy", "Image consultancy", "Content direction", "Profile optimization"],
      result: "Authority, trust, and premium personal positioning.",
    },
  ];

  return (
    <div>
      <DocumentHead
        title="Packages — S.Socials"
        description="Structured brand growth packages designed to meet your business at every stage, from foundation to market leadership."
      />
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-48 md:py-64">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 md:gap-32 lg:gap-40">
          <div className="lg:col-span-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-20 text-[32px] md:text-[48px] lg:text-[64px] leading-[1.2] tracking-[-0.02em]"
            >
              {packagesHeroTitle}
            </motion.h1>
          </div>
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed opacity-60"
            >
              {packagesHeroSubtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 pb-48 md:pb-64">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="p-16 md:p-24 lg:p-32 border border-border bg-card"
            >
              <h2 className="mb-8 text-[20px] md:text-[24px] lg:text-[28px] tracking-[-0.01em]">
                {pkg.name}
              </h2>
              <p className="mb-20 md:mb-24 text-[13px] md:text-[14px] opacity-60">
                {pkg.subtitle}
              </p>
              
              <div className="mb-20 md:mb-24">
                <h3 className="mb-12 text-[11px] md:text-[12px] tracking-[0.1em] opacity-40">
                  INCLUDES
                </h3>
                <ul className="space-y-8">
                  {pkg.includes.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[13px] md:text-[14px] opacity-60 flex items-start">
                      <span className="mr-8">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-12 text-[11px] md:text-[12px] tracking-[0.1em] opacity-40">
                  RESULT
                </h3>
                <p className="text-[13px] md:text-[14px] opacity-60">
                  {pkg.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-56 md:py-64">
          <div className="max-w-[700px] mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-32 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em]"
            >
              Ready to get started?
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