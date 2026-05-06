export interface ChapterLead {
  name: string;
  linkedin?: string;
  discord?: string;
  github?: string;
  image?: string;
}

export interface Chapter {
  slug: string;
  name: string;
  city: string;
  state?: string;
  country: string;
  region: string;
  email?: string;
  x?: string;
  leads: ChapterLead[];
  alumniLeads?: ChapterLead[];
  coverImage?: string;
}

export interface Event {
  id: string;
  chapterSlug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  rsvpUrl?: string;
  image?: string;
}

export interface ChapterWithEvents extends Chapter {
  events: Event[];
}
