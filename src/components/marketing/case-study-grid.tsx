"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CaseStudyItem {
  slug: string;
  frontmatter: {
    title: string;
    client: string;
    country: string;
    programType: string;
    metric: string;
    outcome: string;
  };
}

export function CaseStudyGrid({ caseStudies }: { caseStudies: CaseStudyItem[] }) {
  const [activeCountry, setActiveCountry] = useState("");
  const [activeProgramType, setActiveProgramType] = useState("");

  const countries = useMemo(
    () => [...new Set(caseStudies.map((cs) => cs.frontmatter.country))].sort(),
    [caseStudies]
  );
  const programTypes = useMemo(
    () => [...new Set(caseStudies.map((cs) => cs.frontmatter.programType))].sort(),
    [caseStudies]
  );

  const filtered = useMemo(() => {
    return caseStudies.filter((cs) => {
      if (activeCountry && cs.frontmatter.country !== activeCountry) return false;
      if (activeProgramType && cs.frontmatter.programType !== activeProgramType) return false;
      return true;
    });
  }, [caseStudies, activeCountry, activeProgramType]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <select
          value={activeCountry}
          onChange={(e) => setActiveCountry(e.target.value)}
          className="h-10 rounded-lg border border-surface-alt bg-white px-3 text-sm text-ink"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={activeProgramType}
          onChange={(e) => setActiveProgramType(e.target.value)}
          className="h-10 rounded-lg border border-surface-alt bg-white px-3 text-sm text-ink"
        >
          <option value="">All Program Types</option>
          {programTypes.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cs) => (
          <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">{cs.frontmatter.metric}</Badge>
                  <Badge variant="outline">{cs.frontmatter.programType}</Badge>
                </div>
                <CardTitle className="mt-3">{cs.frontmatter.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-ink-light">{cs.frontmatter.client}</p>
                <p className="mt-1 text-xs text-ink-light">{cs.frontmatter.country}</p>
                <p className="mt-3 text-sm text-ink line-clamp-2">{cs.frontmatter.outcome}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-ink-light">No case studies match your filters.</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => {
              setActiveCountry("");
              setActiveProgramType("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
}
