import { useState } from "react";
import { Button } from "../components/Button";
import { DocumentHead } from "../components/DocumentHead";
import { motion } from "motion/react";
import { useContentStore } from "../store/contentStore";
import { submitContactForm } from "@backend/db";
import { sendContactEmails } from "@backend/email";

export function ContactPage() {
  const store = useContentStore();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    industry: "",
    serviceNeeded: "",
    budgetRange: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const result = await submitContactForm({
      name: formData.name,
      business_name: formData.businessName,
      industry: formData.industry,
      service_needed: formData.serviceNeeded,
      budget_range: formData.budgetRange || null,
      email: formData.email,
      phone: formData.phone || null,
    });

    if (result.ok) {
      // Fire-and-forget — failures are logged, never block the user
      sendContactEmails({
        client_name:    formData.name,
        client_email:   formData.email,
        business_name:  formData.businessName,
        industry:       formData.industry,
        service_needed: formData.serviceNeeded,
        budget_range:   formData.budgetRange || "Not specified",
        phone:          formData.phone || "Not provided",
      });
      setSubmitted(true);
    } else {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
        <DocumentHead
          title="Thank You — S.Socials"
          description="Thank you for your consultation request. We'll be in touch shortly."
        />
        <div className="max-w-[600px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-20 text-[24px] md:text-[32px] lg:text-[36px] tracking-[-0.01em]"
          >
            Thank You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mb-20 md:mb-24 text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60"
          >
            Thank you for your consultation request. We'll be in touch within 24 hours to discuss how we can help elevate your brand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Button to="/">Return Home</Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <DocumentHead title="Contact — S.Socials" description={store.contactSubtitle} />
      
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-10 lg:pt-12 pb-6 md:pb-8">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4 md:mb-5 text-[24px] md:text-[32px] lg:text-[40px] xl:text-[44px] leading-[1.15] tracking-[-0.02em]"
          >
            {store.contactHeroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed opacity-60 max-w-[600px] mx-auto"
          >
            {store.contactSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-10 md:pb-14 lg:pb-16">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="max-w-[700px] mx-auto"
        >
          <div className="space-y-5 md:space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-[12px] md:text-[13px] tracking-[0.05em]">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block mb-2 text-[12px] md:text-[13px] tracking-[0.05em]">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                placeholder="Your Business Name"
              />
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="block mb-2 text-[12px] md:text-[13px] tracking-[0.05em]">
                Industry *
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Select an industry</option>
                <option value="aesthetic-clinic">Aesthetic Clinic</option>
                <option value="beauty-skincare">Beauty & Skincare</option>
                <option value="wellness">Wellness</option>
                <option value="private-healthcare">Private Healthcare</option>
                <option value="medical-spa">Medical Spa</option>
                <option value="dental">Dental Practice</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Service Needed */}
            <div>
              <label htmlFor="serviceNeeded" className="block mb-2 text-[12px] md:text-[13px] tracking-[0.05em]">
                Service Needed *
              </label>
              <select
                id="serviceNeeded"
                name="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Select a service</option>
                <option value="brand-identity">Brand & Identity</option>
                <option value="marketing">Marketing & Growth</option>
                <option value="digital-presence">Digital Presence</option>
                <option value="personal-branding">Personal Branding</option>
                <option value="full-package">Full Package</option>
                <option value="consulting">Consulting</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budgetRange" className="block mb-2 text-[12px] md:text-[13px] tracking-[0.05em]">
                Budget Range
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Select a range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-[12px] md:text-[13px] tracking-[0.05em]">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-[12px] md:text-[13px] tracking-[0.05em]">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-border bg-input-background text-[14px] md:text-[15px] focus:outline-none focus:border-primary transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 md:pt-3">
              <Button type="submit" className="w-full">
                {isSubmitting ? "Submitting..." : "Book Consultation"}
              </Button>
              {submitError && (
                <p className="mt-3 text-[13px] text-red-500 text-center">{submitError}</p>
              )}
            </div>
          </div>
        </motion.form>
      </section>
    </div>
  );
}
