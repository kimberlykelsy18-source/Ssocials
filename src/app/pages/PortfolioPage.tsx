import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "motion/react";

export function PortfolioPage() {
  const caseStudies = [
    {
      title: "Aesthetic Clinic",
      problem: "Weak branding and low perceived value",
      solution: "Full rebrand + marketing strategy",
      result: "Increased bookings and higher-value clients",
      image: "https://images.unsplash.com/photo-1759262151080-e05ba1c6294f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZXN0aGV0aWMlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU3NTAzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Private Hospital",
      problem: "Outdated perception and poor digital experience",
      solution: "Website redesign + system integration",
      result: "Improved trust and patient experience",
      image: "https://images.unsplash.com/photo-1670665352618-49ae2ae914ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3NTcxMTE4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Beauty Brand",
      problem: "No clear identity in a saturated market",
      solution: "Branding + launch strategy",
      result: "Strong recognition and engagement",
      image: "https://images.unsplash.com/photo-1760614034530-a0d34463e03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBza2luY2FyZSUyMHByb2R1Y3RzfGVufDF8fHx8MTc3NTc1MDM2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Wellness Brand",
      problem: "Low conversions",
      solution: "Website + funnel optimization",
      result: "Increased bookings and engagement",
      image: "https://images.unsplash.com/photo-1773924093206-9a433a14bb44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHNwYSUyMGludGVyaW9yfGVufDF8fHx8MTc3NTc0NzMwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div>
      <DocumentHead
        title="Portfolio — S.Socials"
        description="Case studies showcasing how we transform brands into high-performing assets in health, beauty, wellness, and healthcare."
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
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed opacity-60"
          >
            We don't just create, we transform brands into high-performing assets.
          </motion.p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-32 md:pb-48 lg:pb-64">
        <div className="space-y-32 md:space-y-40 lg:space-y-48">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 lg:gap-40 ${
                index !== caseStudies.length - 1 ? "pb-32 md:pb-40 lg:pb-48 border-b border-border" : ""
              }`}
            >
              <div className={`${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                <ImageWithFallback
                  src={study.image}
                  alt={study.title}
                  className="w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover border border-border"
                />
              </div>
              <div className={`flex flex-col justify-center ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                <h2 className="mb-16 md:mb-20 text-[20px] md:text-[28px] lg:text-[32px] tracking-[-0.01em]">
                  {study.title}
                </h2>
                <div className="space-y-12 md:space-y-16">
                  <div>
                    <h3 className="mb-6 md:mb-8 text-[11px] md:text-[12px] tracking-[0.1em] opacity-40">
                      PROBLEM
                    </h3>
                    <p className="text-[13px] md:text-[14px] lg:text-[16px] leading-relaxed opacity-60">
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-6 md:mb-8 text-[11px] md:text-[12px] tracking-[0.1em] opacity-40">
                      SOLUTION
                    </h3>
                    <p className="text-[13px] md:text-[14px] lg:text-[16px] leading-relaxed opacity-60">
                      {study.solution}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-6 md:mb-8 text-[11px] md:text-[12px] tracking-[0.1em] opacity-40">
                      RESULT
                    </h3>
                    <p className="text-[13px] md:text-[14px] lg:text-[16px] leading-relaxed opacity-60">
                      {study.result}
                    </p>
                  </div>
                </div>
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
              Ready to transform your brand?
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