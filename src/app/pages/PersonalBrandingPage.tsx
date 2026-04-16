import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";

export function PersonalBrandingPage() {
  return (
    <div>
      <DocumentHead
        title="Personal Branding — S.Socials"
        description="Build a personal brand that builds trust. We position doctors and founders as trusted authorities in health, beauty, and wellness."
      />
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-48 md:py-64">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="mb-24 text-[40px] md:text-[56px] lg:text-[64px] leading-[1.2] tracking-[-0.02em]">
            Build a Personal Brand That Builds Trust
          </h1>
          <p className="mb-24 text-[18px] md:text-[20px] leading-relaxed opacity-60">
            In the health, beauty, and wellness space, your personal presence directly influences how your business is perceived.
          </p>
          <p className="text-[18px] md:text-[20px] leading-relaxed opacity-60">
            We help you position yourself as a trusted authority through strategy, image, and content.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-48 md:py-64">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="mb-40 text-[32px] md:text-[40px] tracking-[-0.01em] text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-40">
              <div className="border-l-2 border-primary pl-20">
                <h3 className="mb-12 text-[20px] md:text-[24px] tracking-[-0.01em]">
                  Personal Brand Strategy
                </h3>
                <p className="text-[14px] md:text-[16px] leading-relaxed opacity-60">
                  Define your unique positioning, voice, and value proposition in your industry.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-20">
                <h3 className="mb-12 text-[20px] md:text-[24px] tracking-[-0.01em]">
                  Image Consultancy
                </h3>
                <p className="text-[14px] md:text-[16px] leading-relaxed opacity-60">
                  Refine how you present yourself online and offline to align with your brand goals.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-20">
                <h3 className="mb-12 text-[20px] md:text-[24px] tracking-[-0.01em]">
                  Content Strategy
                </h3>
                <p className="text-[14px] md:text-[16px] leading-relaxed opacity-60">
                  Develop content that positions you as a thought leader and builds credibility.
                </p>
              </div>
              <div className="border-l-2 border-primary pl-20">
                <h3 className="mb-12 text-[20px] md:text-[24px] tracking-[-0.01em]">
                  Profile Optimization
                </h3>
                <p className="text-[14px] md:text-[16px] leading-relaxed opacity-60">
                  Audit and enhance your digital presence across platforms for impact and trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-48 md:py-64">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="mb-32 text-[32px] md:text-[40px] tracking-[-0.01em]">
            Who This Is For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 text-left">
            <div>
              <h3 className="mb-12 text-[18px] md:text-[20px] tracking-[-0.01em]">
                Doctors
              </h3>
              <p className="text-[14px] leading-relaxed opacity-60">
                Build trust beyond your clinic.
              </p>
            </div>
            <div>
              <h3 className="mb-12 text-[18px] md:text-[20px] tracking-[-0.01em]">
                Clinic Founders
              </h3>
              <p className="text-[14px] leading-relaxed opacity-60">
                Become the face of your brand.
              </p>
            </div>
            <div>
              <h3 className="mb-12 text-[18px] md:text-[20px] tracking-[-0.01em]">
                Wellness Leaders
              </h3>
              <p className="text-[14px] leading-relaxed opacity-60">
                Position yourself as an authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-[1440px] mx-auto px-16 md:px-24 lg:px-32 py-56 md:py-64">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="mb-32 text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.01em]">
              Ready to build your authority?
            </h2>
            <Button to="/contact" variant="secondary">Book a Consultation</Button>
          </div>
        </div>
      </section>
    </div>
  );
}