import Image from "next/image";

import { getAllChaptersWithEvents } from "@/lib/data";
import { ChaptersList } from "@/components/chapters-list";
import { Footer } from "@/components/footer";

export default async function HomePage() {
  const chapters = await getAllChaptersWithEvents();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Image
                src="/logo-white.svg"
                alt="OSCA Logo"
                width={30}
                height={30}
                className="my-2"
              />
            </div>
            <h1 className="text-3xl font-bold">
              Open Source Community Africa <br /> Chapters Program 🌍
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Open Source Community Africa (OSCA) is an inclusive community for
            open-source lovers, enthusiasts, advocates, and experts within
            Africa. The chapters program is a group of city-based contributors
            and maintainers, seeking to collaborate, learn, and grow together.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ChaptersList chapters={chapters} />
      </main>

      <Footer />
    </div>
  );
}
