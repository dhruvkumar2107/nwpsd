"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Hero } from "@/components/marketing/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  institution: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Hero
        headline="Get in Touch"
        subhead="Ready to transform your institution's internationalization journey? Let's talk."
        primaryCta={{ label: "Schedule a Call", href: "#form" }}
        secondaryCta={{ label: "Learn About Us", href: "/about" }}
      />

      <section className="py-16 sm:py-20" id="form">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">Send Us a Message</h2>
              <p className="mt-4 text-ink-light">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <Card className="mt-8">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl">✓</div>
                    <h3 className="mt-4 text-xl font-semibold text-ink">Thank You!</h3>
                    <p className="mt-2 text-ink-light">
                      We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    required
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@institution.edu.in"
                    required
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    {...register("phone")}
                  />
                  <Input
                    label="Institution Name"
                    placeholder="Your institution name"
                    required
                    error={errors.institution?.message}
                    {...register("institution")}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ink">
                      Message <span className="ml-0.5 text-danger">*</span>
                    </label>
                    <textarea
                      placeholder="Tell us about your internationalization goals..."
                      rows={4}
                      className="w-full rounded-lg border border-surface-alt bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-light/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-danger">{errors.message.message}</p>
                    )}
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">Schedule a Call</h2>
              <p className="mt-4 text-ink-light">
                Prefer to speak directly? Book a 30-minute consultation with our team.
              </p>
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Calendly Embed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-surface-alt bg-surface">
                    <p className="text-sm text-ink-light">
                      Calendly embed will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="font-semibold text-ink">Email</h3>
                  <p className="text-ink-light">hello@unitide.in</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Phone</h3>
                  <p className="text-ink-light">+91 22 XXXX XXXX</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ink">Office</h3>
                  <p className="text-ink-light">
                    Unitide Educations Pvt. Ltd.<br />
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
