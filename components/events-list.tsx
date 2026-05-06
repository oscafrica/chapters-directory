"use client";

import { useState, useMemo } from "react";
import { Event } from "@/types";
import { EventCard } from "./event-card";
import { EventFilters } from "./event-filters";
import { isUpcomingEvent, isPastEvent, sortEventsByDate } from "@/lib/data";

type EventFilter = "all" | "upcoming" | "past";

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<EventFilter>("all");

  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "upcoming" && isUpcomingEvent(event)) ||
        (filter === "past" && isPastEvent(event));

      return matchesSearch && matchesFilter;
    });

    // Sort upcoming events ascending (soonest first), past events descending (most recent first)
    const upcoming = sortEventsByDate(
      filtered.filter(isUpcomingEvent),
      true
    );
    const past = sortEventsByDate(filtered.filter(isPastEvent), false);

    return [...upcoming, ...past];
  }, [events, searchQuery, filter]);

  return (
    <div className="space-y-6">
      <EventFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No events found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
