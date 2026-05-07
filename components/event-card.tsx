import Image from "next/image";
import { Event } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { isUpcomingEvent } from "@/lib/data";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const upcoming = isUpcomingEvent(event);
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className={`overflow-hidden py-4 ${!upcoming ? "opacity-75" : ""}`}>
      <div className="flex flex-col sm:flex-row">
        {event.image && (
          <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge
                  variant={upcoming ? "default" : "secondary"}
                  className="mb-2"
                >
                  {upcoming ? "Upcoming" : "Past"}
                </Badge>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </div>
            </div>
            <CardDescription className="line-clamp-2">
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap ml-2 gap-4 text-sm text-black mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>
            {event.rsvpUrl && upcoming && (
              <Button asChild size="sm" className="ml-2">
                <a
                  href={event.rsvpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSVP Now
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
