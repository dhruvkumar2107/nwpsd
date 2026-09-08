"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Save,
  Eye,
  Image,
  Globe,
  FileText,
  User,
  Tag,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Check,
} from "lucide-react";

const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().optional(),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  seoTitle: z.string().max(60, "SEO title should be under 60 characters").optional(),
  seoDescription: z.string().max(160, "SEO description should be under 160 characters").optional(),
  author: z.string().min(1, "Author is required"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const categories = [
  "Admissions",
  "Scholarships",
  "Visa",
  "Rankings",
  "Finance",
  "Test Prep",
  "Research",
  "Career",
  "Accommodation",
];

const authors = [
  "Dr. Ananya Verma",
  "Rajesh Kumar",
  "Priya Sharma",
  "Dr. Suresh Patel",
  "Meera Joshi",
];

export default function NewArticlePage() {
  const router = useRouter();
  const [isPublished, setIsPublished] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      featuredImage: "",
      seoTitle: "",
      seoDescription: "",
      author: "",
    },
  });

  const titleValue = watch("title");

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const slugValue = useMemo(() => {
    if (titleValue) {
      const slug = generateSlug(titleValue);
      setValue("slug", slug);
      return slug;
    }
    return "";
  }, [titleValue, setValue]);

  const onSubmit = (data: ArticleFormData) => {
    console.log("Article data:", { ...data, status: isPublished ? "published" : "draft" });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/articles"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white transition-colors hover:bg-black/[0.02]"
          >
            <ArrowLeft className="h-4 w-4 text-black/60" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0d1117]">New Article</h1>
            <p className="mt-0.5 text-sm text-black/50">
              Create a new article for your knowledge base
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPublished(!isPublished)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
              isPublished
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-black/10 bg-white text-black/60 hover:bg-black/[0.02]"
            }`}
          >
            {isPublished ? (
              <ToggleRight className="h-4 w-4" />
            ) : (
              <ToggleLeft className="h-4 w-4" />
            )}
            {isPublished ? "Published" : "Draft"}
          </button>
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
                Save Article
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                <FileText className="h-4 w-4 text-[#c8a44e]" />
                Content
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Title
                  </label>
                  <input
                    {...register("title")}
                    placeholder="Enter article title..."
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                  />
                  {errors.title && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Slug
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-black/[0.02] px-4 py-2.5">
                    <Globe className="h-4 w-4 text-black/30" />
                    <span className="text-xs text-black/40">/blog/</span>
                    <input
                      {...register("slug")}
                      placeholder="article-slug"
                      className="min-w-0 flex-1 bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                    />
                  </div>
                  {errors.slug && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.slug.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Excerpt
                  </label>
                  <textarea
                    {...register("excerpt")}
                    rows={2}
                    placeholder="Brief summary of the article..."
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                  />
                  {errors.excerpt && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.excerpt.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Content (MDX)
                  </label>
                  <textarea
                    {...register("content")}
                    rows={16}
                    placeholder="Write your article content in MDX format..."
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 font-mono text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                  />
                  {errors.content && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.content.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                <Tag className="h-4 w-4 text-[#c8a44e]" />
                Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Category
                  </label>
                  <select
                    {...register("category")}
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Tags (comma-separated)
                  </label>
                  <input
                    {...register("tags")}
                    placeholder="e.g. sop, admissions, tips"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Author
                  </label>
                  <select
                    {...register("author")}
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                  >
                    <option value="">Select author</option>
                    {authors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                  {errors.author && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.author.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    Featured Image URL
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5">
                    <Image className="h-4 w-4 text-black/30" />
                    <input
                      {...register("featuredImage")}
                      placeholder="https://example.com/image.jpg"
                      className="min-w-0 flex-1 bg-transparent text-sm text-[#0d1117] placeholder-black/30 focus:outline-none"
                    />
                  </div>
                  {errors.featuredImage && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.featuredImage.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0d1117]">
                <Globe className="h-4 w-4 text-[#c8a44e]" />
                SEO
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-black/60">
                    SEO Title
                  </label>
                  <input
                    {...register("seoTitle")}
                    placeholder="Custom title for search engines"
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
                    SEO Description
                  </label>
                  <textarea
                    {...register("seoDescription")}
                    rows={3}
                    placeholder="Meta description for search engines"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#0d1117] placeholder-black/30 transition-colors focus:border-[#c8a44e] focus:outline-none focus:ring-1 focus:ring-[#c8a44e]"
                  />
                  {errors.seoDescription && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.seoDescription.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
