import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getChapterWithEvents, getChapters } from "@/lib/data";
import { EventsList } from "@/components/events-list";
import { LeadCard } from "@/components/lead-card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ArrowLeft, MapPin, Mail } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const chapters = getChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = await getChapterWithEvents(slug);

  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `${chapter.name} | OSCA Chapter`,
    description:
      "Open Source Community Africa (OSCA) is an inclusive community for open-source lovers, enthusiasts, advocates, and experts within Africa. The chapters program is a group of city-based contributors and maintainers, seeking to collaborate, learn, and grow together.",
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = await getChapterWithEvents(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-64 md:h-80">
          <Image
            src={chapter.coverImage || "/pattern.png"}
            alt={chapter.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className={chapter.coverImage ? "-mt-24 relative z-10" : "pt-8"}>
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Chapters
              </Link>
            </Button>

            <div className="bg-card rounded-lg border p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {chapter.name}
              </h1>

              <p className="text-muted-foreground max-w-3xl">
                This OSCA chapter brings together open source contributors and
                maintainers from different backgrounds with shared struggles in
                to collaborate, learn, and grow together via regular meetups,
                workshops, and hackathons.{" "}
                <b>
                  To join our private chatroom, kindly contact us via email or
                  social media below
                </b>
                .
              </p>

              {/* Chapter Location */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t">
                <span className="text-sm font-medium">Location:</span>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <MapPin className="w-4 h-4" />
                  {chapter.city}, {chapter.state}, {chapter.country},{" "}
                  {chapter.region}
                </div>
              </div>

              {/* Chapter Contact */}
              {(chapter.email || chapter.x) && (
                <div className="flex flex-wrap items-center gap-4 pt-6">
                  <span className="text-sm font-medium">Contact:</span>
                  {chapter.email && (
                    <a
                      href={`mailto:${chapter.email}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {chapter.email}
                    </a>
                  )}
                  {chapter.x && (
                    <a
                      href={`https://x.com/${chapter.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <XIcon className="w-4 h-4" />@{chapter.x}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Chapter Leads Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Chapter Leads</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapter.leads.map((lead, index) => (
              <LeadCard key={index} lead={lead} />
            ))}
          </div>
        </section>

        {/* Alumni Leads Section */}
        {chapter.alumniLeads && chapter.alumniLeads.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Alumni Leads</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapter.alumniLeads.map((lead, index) => (
                <LeadCard key={index} lead={lead} isAlumni />
              ))}
            </div>
          </section>
        )}

        {/* Events Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Events ({chapter.events.length})
          </h2>
          {chapter.events.length > 0 ? (
            <EventsList events={chapter.events} />
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/50">
              <p className="text-muted-foreground">
                No events scheduled for this chapter yet.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
