"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ChapterFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  countries: string[];
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
}

export function ChapterFilters({
  searchQuery,
  onSearchChange,
  countries,
  selectedCountry,
  onCountryChange,
}: ChapterFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search chapters..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCountry === null ? "default" : "outline"}
          size="sm"
          onClick={() => onCountryChange(null)}
        >
          All Countries
        </Button>
        {countries.map((country) => (
          <Button
            key={country}
            variant={selectedCountry === country ? "default" : "outline"}
            size="sm"
            onClick={() => onCountryChange(country)}
          >
            {country}
          </Button>
        ))}
      </div>
    </div>
  );
}
