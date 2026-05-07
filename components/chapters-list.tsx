"use client";

import { useState, useMemo } from "react";
import { ChapterWithEvents } from "@/types";
import { ChapterCard } from "./chapter-card";
import { ChapterFilters } from "./chapter-filters";

interface ChaptersListProps {
  chapters: ChapterWithEvents[];
}

export function ChaptersList({ chapters }: ChaptersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = useMemo(() => {
    const uniqueCountries = new Set(chapters.map((c) => c.country));
    return Array.from(uniqueCountries).sort();
  }, [chapters]);

  const filteredChapters = useMemo(() => {
    return chapters.filter((chapter) => {
      const matchesSearch =
        searchQuery === "" ||
        chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry =
        selectedCountry === null || chapter.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  }, [chapters, searchQuery, selectedCountry]);

  return (
    <div className="space-y-8">
      <ChapterFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        chapters={chapters}
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
      />

      {filteredChapters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No OSCA chapters found matching your search entry.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChapters
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                chapter={chapter}
                eventCount={chapter.events.length}
              />
            ))}
        </div>
      )}
    </div>
  );
}
