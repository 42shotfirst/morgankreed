import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
  link: string;
}

interface SpeakingSectionProps {
  pastEvents?: Event[];
  upcomingEvents?: Event[];
}

const SpeakingSection = ({
  pastEvents = [
    {
      title: "AI in Enterprise: Practical Applications",
      date: "2023-12-15",
      location: "Tech Conference 2023, San Francisco",
      description:
        "Keynote speech on implementing AI solutions in enterprise environments",
      type: "Keynote",
      link: "#",
    },
    {
      title: "Digital Transformation Leadership",
      date: "2023-10-20",
      location: "Leadership Summit, New York",
      description:
        "Panel discussion on leading digital transformation initiatives",
      type: "Panel",
      link: "#",
    },
  ],
  upcomingEvents = [
    {
      title: "Future of Tech Leadership",
      date: "2024-06-15",
      location: "Global Tech Forum, London",
      description:
        "Keynote presentation on emerging trends in technology leadership",
      type: "Keynote",
      link: "#",
    },
    {
      title: "Cybersecurity in the AI Era",
      date: "2024-07-01",
      location: "Security Conference 2024, Berlin",
      description: "Workshop on integrating AI in cybersecurity strategies",
      type: "Workshop",
      link: "#",
    },
  ],
}: SpeakingSectionProps) => {
  const EventCard = ({ event }: { event: Event }) => (
    <Card className="mb-4 bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <CalendarDays className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              {event.location}
            </div>
          </div>
          <Badge variant="secondary">{event.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{event.description}</p>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => window.open(event.link, "_blank")}
        >
          Event Details
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Speaking Engagements
        </h2>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No upcoming events scheduled
              </p>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SpeakingSection;
