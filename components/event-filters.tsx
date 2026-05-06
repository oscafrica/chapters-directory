"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type EventFilter = "all" | "upcoming" | "past";

interface EventFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: EventFilter;
  onFilterChange: (filter: EventFilter) => void;
}

export function EventFilters({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
}: EventFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
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
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All Events
        </Button>
        <Button
          variant={filter === "upcoming" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("upcoming")}
        >
          Upcoming
        </Button>
        <Button
          variant={filter === "past" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("past")}
        >
          Past
        </Button>
      </div>
    </div>
  );
}
