import Link from "next/link";
import Image from "next/image";
import { Chapter } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar } from "lucide-react";

interface ChapterCardProps {
  chapter: Chapter;
  eventCount?: number;
}

export function ChapterCard({ chapter, eventCount = 0 }: ChapterCardProps) {
  return (
    <Link href={`/c/${chapter.slug}`}>
      <Card className="py-8 h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 group">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={chapter.coverImage || "/pattern.png"}
            alt={chapter.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute bottom-3 left-3" variant="secondary">
            <MapPin className="w-3 h-3 mr-1" />
            {chapter.city}, {chapter.state}, {chapter.country}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {chapter.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {chapter.leads.length}{" "}
                {chapter.leads.length === 1 ? "Lead" : "Leads"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {eventCount} {eventCount === 1 ? "Event" : "Events"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
