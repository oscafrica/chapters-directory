import { Chapter, Event, ChapterWithEvents } from "@/types";
import chaptersData from "@/data/chapters.json";

export function getChapters(): Chapter[] {
  return chaptersData.chapters as Chapter[];
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chaptersData.chapters.find((chapter) => chapter.slug === slug) as
    | Chapter
    | undefined;
}

export async function getEventsForChapter(slug: string): Promise<Event[]> {
  try {
    const events = await import(`@/data/events/${slug}.json`);
    return events.default as Event[];
  } catch {
    return [];
  }
}

export async function getChapterWithEvents(
  slug: string
): Promise<ChapterWithEvents | null> {
  const chapter = getChapterBySlug(slug);
  if (!chapter) return null;

  const events = await getEventsForChapter(slug);
  return { ...chapter, events };
}

export async function getAllChaptersWithEvents(): Promise<ChapterWithEvents[]> {
  const chapters = getChapters();
  const chaptersWithEvents = await Promise.all(
    chapters.map(async (chapter) => {
      const events = await getEventsForChapter(chapter.slug);
      return { ...chapter, events };
    })
  );
  return chaptersWithEvents;
}

export function isUpcomingEvent(event: Event): boolean {
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

export function isPastEvent(event: Event): boolean {
  return !isUpcomingEvent(event);
}

export function sortEventsByDate(events: Event[], ascending = true): Event[] {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}
