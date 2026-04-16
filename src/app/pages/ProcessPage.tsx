import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";

export function ProcessPage() {
  const steps = [
    {
      number: "01",
      title: "Strategy",
      description: "We define your positioning, audience, and direction.",
      details: "Through in-depth discovery sessions, we understand your business goals, target audience, competitive landscape, and brand aspirations. We develop a comprehensive strategy that guides all subsequent work.",
    },
    {
      number: "02",
      title: "Build",
      description: "We develop your brand identity and systems.",
      details: "With strategy in place, we craft your visual identity, messaging framework, and brand guidelines. Every element is designed to reflect your positioning and resonate with your target audience.",
    },
    {
      number: "03",
      title: "Execute",
      description: "We launch across platforms with precision.",
      details: "We implement your brand across all touchpoints—website, social media, marketing materials, and digital systems. Every execution is carefully crafted to maintain consistency and drive results.",
    },
    {
      number: "04",
      title: "Scale",
      description: "We optimize and grow your brand sustainably.",
      details: "Post-launch, we monitor performance, gather insights, and continuously optimize. We help you scale strategically, ensuring your brand maintains its premium positioning as you grow.",
    },
  ];

  return (
    <div>
      <DocumentHead
        title="Our Process — S.Socials"
        description="A systematic approach to building and scaling premium brands in health, beauty, wellness, and private healthcare."
      />
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-48 md:py-64">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="mb-24 text-[40px] md:text-[56px] lg:text-[64px] leading-[1.2] tracking-[-0.02em]">
            Our Process
          </h1>
          <p className="text-[18px] md:text-[20px] leading-relaxed opacity-60">
            A systematic approach to building and scaling premium brands.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 pb-48 md:pb-64">
        <div className="max-w-[1000px] mx-auto space-y-48">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-32 lg:gap-40 pb-48 ${
                index !== steps.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="lg:col-span-3">
                <div className="text-[56px] md:text-[72px] tracking-[-0.02em] opacity-20 leading-none">
                  {step.number}
                </div>
              </div>
              <div className="lg:col-span-9">
                <h2 className="mb-12 text-[28px] md:text-[36px] tracking-[-0.01em]">
                  {step.title}
                </h2>
                <p className="mb-20 text-[16px] md:text-[18px] leading-relaxed opacity-60">
                  {step.description}
                </p>
                <p className="text-[14px] md:text-[16px] leading-relaxed opacity-50">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-56 md:py-64">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="mb-32 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em]">
              Ready to get started?
            </h2>
            <Button to="/contact" variant="secondary">Book a Consultation</Button>
          </div>
        </div>
      </section>
    </div>
  );
}