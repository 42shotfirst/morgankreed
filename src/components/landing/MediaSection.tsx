import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Video, FileText, Mic, Calendar } from "lucide-react";

interface MediaItem {
  title: string;
  description: string;
  type: "youtube" | "article" | "podcast" | "interview" | "other";
  date?: string;
  youtubeId?: string; // For YouTube videos (just the ID, e.g., "dQw4w9WgXcQ")
  url?: string; // For articles, podcasts, etc.
  thumbnail?: string; // Optional thumbnail for non-YouTube items
  tags?: string[];
}

interface MediaSectionProps {
  mediaItems?: MediaItem[];
}

const MediaSection = ({
  mediaItems = [
    {
      title: "AI in Enterprise: A Practical Guide",
      description:
        "Keynote presentation on implementing AI solutions in enterprise environments",
      type: "youtube",
      date: "2024-01-15",
      youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      tags: ["AI", "Enterprise", "Technology"],
    },
    {
      title: "The Future of Digital Transformation",
      description:
        "An in-depth article exploring the latest trends in digital transformation",
      type: "article",
      date: "2024-01-10",
      url: "https://example.com/article",
      tags: ["Digital Transformation", "Leadership"],
    },
    {
      title: "Tech Leadership Podcast",
      description:
        "Interview discussing technology leadership and innovation strategies",
      type: "podcast",
      date: "2023-12-20",
      url: "https://example.com/podcast",
      tags: ["Leadership", "Podcast"],
    },
  ],
}: MediaSectionProps) => {
  // Extract YouTube ID from various YouTube URL formats
  const extractYouTubeId = (urlOrId: string): string => {
    if (!urlOrId) return "";
    
    // If it's already just an ID
    if (!urlOrId.includes("youtube.com") && !urlOrId.includes("youtu.be")) {
      return urlOrId;
    }
    
    // Extract from full URL
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = urlOrId.match(regex);
    return match ? match[1] : urlOrId;
  };

  // Group media by type
  const mediaByType = {
    youtube: mediaItems.filter((item) => item.type === "youtube"),
    article: mediaItems.filter((item) => item.type === "article"),
    podcast: mediaItems.filter((item) => item.type === "podcast"),
    interview: mediaItems.filter((item) => item.type === "interview"),
    other: mediaItems.filter(
      (item) =>
        !["youtube", "article", "podcast", "interview"].includes(item.type)
    ),
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "youtube":
        return <Video className="h-5 w-5" />;
      case "article":
        return <FileText className="h-5 w-5" />;
      case "podcast":
        return <Mic className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "youtube":
        return "Video";
      case "article":
        return "Article";
      case "podcast":
        return "Podcast";
      case "interview":
        return "Interview";
      default:
        return "Media";
    }
  };

  const MediaCard = ({ item }: { item: MediaItem }) => {
    const isYouTube = item.type === "youtube" && item.youtubeId;
    const youtubeId = item.youtubeId
      ? extractYouTubeId(item.youtubeId)
      : null;

    return (
      <Card className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
        {isYouTube && youtubeId && (
          <div className="relative w-full pb-[56.25%] bg-gray-100">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {item.thumbnail && !isYouTube && (
          <div className="relative w-full h-48 bg-gray-100">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold mb-2">
                {item.title}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {item.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
                <Badge variant="secondary" className="gap-1">
                  {getTypeIcon(item.type)}
                  {getTypeLabel(item.type)}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{item.description}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {item.url && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(item.url, "_blank")}
            >
              View {getTypeLabel(item.type)}
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  // Determine which tabs to show
  const availableTabs = [
    mediaByType.youtube.length > 0 && "videos",
    mediaByType.article.length > 0 && "articles",
    mediaByType.podcast.length > 0 && "podcasts",
    mediaByType.interview.length > 0 && "interviews",
    mediaByType.other.length > 0 && "other",
  ].filter(Boolean) as string[];

  const defaultTab =
    availableTabs.length > 0 ? availableTabs[0] : "videos";

  return (
    <section
      id="media"
      className="py-24 px-4 bg-gradient-to-b from-muted/50 to-background"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Media Appearances
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Videos, articles, podcasts, and interviews featuring my insights on
            technology, leadership, and innovation
          </p>
        </div>

        {availableTabs.length > 1 ? (
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 max-w-4xl mx-auto mb-8">
              {mediaByType.youtube.length > 0 && (
                <TabsTrigger value="videos">Videos</TabsTrigger>
              )}
              {mediaByType.article.length > 0 && (
                <TabsTrigger value="articles">Articles</TabsTrigger>
              )}
              {mediaByType.podcast.length > 0 && (
                <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              )}
              {mediaByType.interview.length > 0 && (
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
              )}
              {mediaByType.other.length > 0 && (
                <TabsTrigger value="other">Other</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="videos" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaByType.youtube.length > 0 ? (
                mediaByType.youtube.map((item, index) => (
                  <MediaCard key={index} item={item} />
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-full">
                  No videos available
                </p>
              )}
            </TabsContent>

            <TabsContent value="articles" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaByType.article.length > 0 ? (
                mediaByType.article.map((item, index) => (
                  <MediaCard key={index} item={item} />
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-full">
                  No articles available
                </p>
              )}
            </TabsContent>

            <TabsContent value="podcasts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaByType.podcast.length > 0 ? (
                mediaByType.podcast.map((item, index) => (
                  <MediaCard key={index} item={item} />
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-full">
                  No podcasts available
                </p>
              )}
            </TabsContent>

            <TabsContent value="interviews" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaByType.interview.length > 0 ? (
                mediaByType.interview.map((item, index) => (
                  <MediaCard key={index} item={item} />
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-full">
                  No interviews available
                </p>
              )}
            </TabsContent>

            <TabsContent value="other" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaByType.other.length > 0 ? (
                mediaByType.other.map((item, index) => (
                  <MediaCard key={index} item={item} />
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-full">
                  No other media available
                </p>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item, index) => (
              <MediaCard key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaSection;





