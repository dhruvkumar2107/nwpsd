"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Briefcase,
  Building2,
  ArrowRight,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: "article" | "service" | "case-study";
  url: string;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  article: FileText,
  service: Briefcase,
  "case-study": Building2,
};

const TYPE_LABELS: Record<string, string> = {
  article: "Articles",
  service: "Services",
  "case-study": "Case Studies",
};

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("recent-searches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const groupedResults = results.reduce(
    (acc: Record<string, SearchResult[]>, r) => {
      (acc[r.type] = acc[r.type] || []).push(r);
      return acc;
    },
    {} as Record<string, SearchResult[]>
  );

  const flatResults = results;

  const saveRecentSearch = (q: string) => {
    const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  };

  const navigateToResult = (url: string) => {
    saveRecentSearch(query);
    setIsOpen(false);
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatResults[selectedIndex]) {
      navigateToResult(flatResults[selectedIndex].url);
    }
  };

  const triggerSearch = () => {
    if (query.trim()) {
      saveRecentSearch(query);
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#0a1628]/10 bg-white/50 hover:bg-white transition-colors text-[#0a1628]/60 hover:text-[#0a1628]"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline text-sm">Search</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-[#0a1628]/5 rounded text-[#0a1628]/40">
          ⌘K
        </kbd>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0a1628]/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Search box */}
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#c8a44e]/15 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#0a1628]/8">
                <Search className="w-5 h-5 text-[#c8a44e] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search articles, services, case studies..."
                  className="flex-1 bg-transparent text-[#0a1628] text-lg placeholder:text-[#0a1628]/30 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      inputRef.current?.focus();
                    }}
                    className="p-1 rounded-md hover:bg-[#0a1628]/5"
                  >
                    <X className="w-4 h-4 text-[#0a1628]/40" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-[#0a1628]/40 hover:text-[#0a1628]/60 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() === "" ? (
                  <div className="p-5">
                    {recentSearches.length > 0 ? (
                      <div>
                        <p className="text-xs font-medium text-[#0a1628]/40 uppercase tracking-wider mb-3">
                          Recent Searches
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setQuery(s);
                                inputRef.current?.focus();
                              }}
                              className="px-3 py-1.5 rounded-full bg-[#f7f5f0] text-sm text-[#0a1628]/70 hover:bg-[#c8a44e]/10 hover:text-[#0a1628] transition-colors border border-[#0a1628]/5"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-[#0a1628]/40 text-center py-4">
                        Start typing to search...
                      </p>
                    )}
                  </div>
                ) : loading ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-6 h-6 border-2 border-[#c8a44e] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : flatResults.length === 0 ? (
                  <div className="text-center py-10 px-5">
                    <Search className="w-10 h-10 text-[#0a1628]/15 mx-auto mb-3" />
                    <p className="text-[#0a1628]/50 font-medium">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-sm text-[#0a1628]/30 mt-1">
                      Try different keywords or check your spelling.
                    </p>
                  </div>
                ) : (
                  <div className="py-2">
                    {Object.entries(groupedResults).map(([type, items]) => {
                      const Icon = TYPE_ICONS[type] || FileText;
                      return (
                        <div key={type}>
                          <p className="px-5 pt-3 pb-1 text-xs font-semibold text-[#0a1628]/40 uppercase tracking-wider">
                            {TYPE_LABELS[type] || type}
                          </p>
                          {items.map((item) => {
                            const idx = flatResults.indexOf(item);
                            return (
                              <button
                                key={item.id}
                                onClick={() => navigateToResult(item.url)}
                                onMouseEnter={() => setSelectedIndex(idx)}
                                className={`w-full flex items-start gap-4 px-5 py-3 text-left transition-colors ${
                                  idx === selectedIndex
                                    ? "bg-[#c8a44e]/8"
                                    : "hover:bg-[#f7f5f0]"
                                }`}
                              >
                                <div className="mt-0.5 p-2 rounded-lg bg-[#0a1628]/5 shrink-0">
                                  <Icon className="w-4 h-4 text-[#c8a44e]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-[#0a1628] truncate">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-[#0a1628]/50 mt-0.5 line-clamp-1">
                                    {item.excerpt}
                                  </p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#0a1628]/20 mt-1 shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              {query.trim() && flatResults.length > 0 && (
                <div className="px-5 py-3 border-t border-[#0a1628]/5 bg-[#f7f5f0]/50">
                  <button
                    onClick={triggerSearch}
                    className="flex items-center gap-2 text-sm text-[#c8a44e] hover:text-[#c8a44e]/80 font-medium transition-colors"
                  >
                    See all results for &ldquo;{query}&rdquo;
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
