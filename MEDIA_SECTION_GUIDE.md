# Media Section Usage Guide

## Overview
The Media Section displays your media appearances including YouTube videos, articles, podcasts, interviews, and other media types.

## Adding Media Items

### YouTube Videos
```typescript
{
  title: "AI in Enterprise: A Practical Guide",
  description: "Keynote presentation on implementing AI solutions",
  type: "youtube",
  date: "2024-01-15",
  youtubeId: "dQw4w9WgXcQ", // Just the ID, or full URL
  tags: ["AI", "Enterprise", "Technology"],
}
```

**YouTube ID Examples:**
- Just the ID: `"dQw4w9WgXcQ"`
- Full URL: `"https://www.youtube.com/watch?v=dQw4w9WgXcQ"`
- Short URL: `"https://youtu.be/dQw4w9WgXcQ"`

All formats are automatically converted to the correct embed format.

### Articles/Writing
```typescript
{
  title: "The Future of Digital Transformation",
  description: "An in-depth article exploring the latest trends",
  type: "article",
  date: "2024-01-10",
  url: "https://example.com/article",
  thumbnail: "https://example.com/article-thumbnail.jpg", // Optional
  tags: ["Digital Transformation", "Leadership"],
}
```

### Podcasts
```typescript
{
  title: "Tech Leadership Podcast",
  description: "Interview discussing technology leadership",
  type: "podcast",
  date: "2023-12-20",
  url: "https://example.com/podcast",
  tags: ["Leadership", "Podcast"],
}
```

### Interviews
```typescript
{
  title: "Interview with Tech Magazine",
  description: "Featured interview discussing AI and innovation",
  type: "interview",
  date: "2024-01-05",
  url: "https://example.com/interview",
  thumbnail: "https://example.com/interview-image.jpg", // Optional
  tags: ["Interview", "AI"],
}
```

### Other Media Types
```typescript
{
  title: "Conference Presentation",
  description: "Slides and recording from tech conference",
  type: "other",
  date: "2024-01-01",
  url: "https://example.com/presentation",
  thumbnail: "https://example.com/thumbnail.jpg", // Optional
  tags: ["Conference", "Presentation"],
}
```

## Where to Add Media Items

Edit `src/components/landing/MediaSection.tsx` and update the default `mediaItems` array:

```typescript
const MediaSection = ({
  mediaItems = [
    // Add your media items here
    {
      title: "Your Video Title",
      description: "Description here",
      type: "youtube",
      youtubeId: "YOUR_YOUTUBE_ID",
      // ... other properties
    },
    // ... more items
  ],
}: MediaSectionProps) => {
  // ...
}
```

## Features

### Automatic Organization
- Media items are automatically grouped by type
- Tabs are shown only for media types that have items
- Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)

### YouTube Embedding
- YouTube videos are embedded directly (no redirect)
- Responsive video player (16:9 aspect ratio)
- Fullscreen support enabled

### Thumbnails
- Optional thumbnails for non-YouTube items
- Falls back to gray placeholder if no thumbnail provided

### Tags
- Add tags to categorize and filter content
- Displayed as badges below the description

### Dates
- Optional date field for all media types
- Formatted as "Month Day, Year" (e.g., "January 15, 2024")

## Customization

### Change Section Title
Edit the `h2` element in `MediaSection.tsx`:
```tsx
<h2 className="text-4xl font-bold tracking-tight mb-3">
  Media Appearances
</h2>
```

### Change Description
Edit the `p` element:
```tsx
<p className="text-muted-foreground max-w-2xl mx-auto">
  Your custom description here
</p>
```

### Adjust Grid Layout
Modify the grid classes in the TabsContent:
```tsx
// Current: 3 columns on large screens
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// For 4 columns:
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

## Navigation
The Media section is automatically added to the header navigation with the anchor `#media`.

## Styling
The component uses the same design system as other sections:
- Same card styling
- Same badge styles
- Same button variants
- Consistent spacing and colors
- Responsive design





