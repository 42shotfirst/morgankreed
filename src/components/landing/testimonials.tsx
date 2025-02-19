import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "An exceptional leader who transformed our engineering processes and delivered outstanding results.",
    author: "Sarah Chen",
    role: "CTO, TechCorp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    quote:
      "Brought technical excellence and strategic thinking to our digital transformation project.",
    author: "Michael Rodriguez",
    role: "VP Engineering, StartupX",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    quote:
      "Deep technical expertise combined with excellent communication and leadership skills.",
    author: "Emily Thompson",
    role: "Product Director, InnovateCo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Client Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="h-full">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
