"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2,
  Search,
  Image,
  AlertCircle,
  Check,
  Building2,
  FileText,
  Link,
} from "lucide-react";

const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  contactEmail: z.string().email("Must be a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  youtube: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  seoTitle: z.string().max(60, "SEO title should be under 60 characters").optional(),
  seoDescription: z.string().max(160, "SEO description should be under 160 characters").optional(),
  seoKeywords: z.string().optional(),
  logoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  faviconUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "Nyay Saathis",
      tagline:
        "Premium Higher Education Consulting & Advisory",
      contactEmail: "info@nyaysaathis.com",
      phone: "+91 98765 43210",
      address:
        "42, Knowledge Park, Sector 15, Gurugram, Haryana 122001, India",
      facebook: "https://facebook.com/nyaysaathis",
      twitter: "https://twitter.com/nyaysaathis",
      linkedin: "https://linkedin.com/company/nyaysaathis",
      instagram: "https://instagram.com/nyaysaathis",
      youtube: "",
      seoTitle: "Nyay Saathis - Premium Higher Education Consulting",
      seoDescription:
        "Expert guidance for admissions, scholarships, and visa processing at top universities worldwide.",
      seoKeywords:
        "study abroad, education consulting, university admissions, scholarships, visa assistance",
      logoUrl: "",
      faviconUrl: "",
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log("Settings saved:", data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "social", label: "Social Media", icon: Share2 },
    { id: "seo", label: "SEO Defaults", icon: Search },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1117]">Settings</h1>
          <p className="mt-1 text-sm text-black/50">
            Configure your site settings and preferences
          </p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-[#0a1628] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0a1628]/90 hover:shadow-md disabled:opacity-50"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="rounded-xl border border-black/5 bg-white p-2 shadow-sm">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-[#0a1628] text-white"
                      : "text-black/60 hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                    <Building2 className="h-4 w-4 text-[#c8a44e]" />
                    Site Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-black/60">
                        Site Name
                      </label>
                      <input
                        {...register("siteName")}
                        className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                      />
                      {errors.siteName && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {errors.siteName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-black/60">
                        Tagline
                      </label>
                      <input
                        {...register("tagline")}
                        className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                      />
                      {errors.tagline && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {errors.tagline.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                    <Image className="h-4 w-4 text-[#c8a44e]" />
                    Branding
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-black/60">
                        Logo URL
                      </label>
                      <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5">
                        <Image className="h-4 w-4 text-black/30" />
                        <input
                          {...register("logoUrl")}
                          placeholder="https://example.com/logo.png"
                          className="min-w-0 flex-1 bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                        />
                      </div>
                      {errors.logoUrl && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {errors.logoUrl.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-black/60">
                        Favicon URL
                      </label>
                      <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5">
                        <Image className="h-4 w-4 text-black/30" />
                        <input
                          {...register("faviconUrl")}
                          placeholder="https://example.com/favicon.ico"
                          className="min-w-0 flex-1 bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                        />
                      </div>
                      {errors.faviconUrl && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {errors.faviconUrl.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                  <Phone className="h-4 w-4 text-[#c8a44e]" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-black/60">
                      Contact Email
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5">
                      <Mail className="h-4 w-4 text-black/30" />
                      <input
                        {...register("contactEmail")}
                        type="email"
                        className="min-w-0 flex-1 bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                      />
                    </div>
                    {errors.contactEmail && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.contactEmail.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-black/60">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5">
                      <Phone className="h-4 w-4 text-black/30" />
                      <input
                        {...register("phone")}
                        className="min-w-0 flex-1 bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-black/60">
                      Address
                    </label>
                    <div className="flex items-start gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-black/30" />
                      <textarea
                        {...register("address")}
                        rows={3}
                        className="min-w-0 flex-1 resize-none bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "social" && (
              <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                  <Share2 className="h-4 w-4 text-[#c8a44e]" />
                  Social Media Links
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
                    { name: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/..." },
                    { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/..." },
                    { name: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
                    { name: "youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
                  ].map((social) => (
                    <div key={social.name}>
                      <label className="mb-1.5 block text-xs font-medium text-black/60">
                        {social.label}
                      </label>
                      <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5">
                        <Link className="h-4 w-4 text-black/30" />
                        <input
                          {...register(social.name as keyof SettingsFormData)}
                          placeholder={social.placeholder}
                          className="min-w-0 flex-1 bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                        />
                      </div>
                      {errors[social.name as keyof SettingsFormData] && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {
                            errors[social.name as keyof SettingsFormData]
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                  <Search className="h-4 w-4 text-[#c8a44e]" />
                  Default SEO Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-black/60">
                      Default SEO Title
                    </label>
                    <input
                      {...register("seoTitle")}
                      placeholder="Default meta title for all pages"
                      className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                    />
                    {errors.seoTitle && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.seoTitle.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-black/60">
                      Default Meta Description
                    </label>
                    <textarea
                      {...register("seoDescription")}
                      rows={3}
                      placeholder="Default meta description for all pages"
                      className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                    />
                    {errors.seoDescription && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.seoDescription.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-black/60">
                      Default Keywords (comma-separated)
                    </label>
                    <textarea
                      {...register("seoKeywords")}
                      rows={2}
                      placeholder="e.g. study abroad, scholarships, university admissions"
                      className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
