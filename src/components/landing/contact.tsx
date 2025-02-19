import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 bg-muted/50">
      <div className="container max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss how I can help your organization achieve its
              technical goals.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:morgan@morgankreed.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Mail className="h-5 w-5" /> morgan@morgankreed.com
              </a>
              <a
                href="https://www.linkedin.com/in/morgankreed/"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" /> LinkedIn
              </a>
              <a
                href="https://github.com/yourusername"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" /> GitHub
              </a>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form and I'll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Input type="email" placeholder="Your Email" />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Your Message"
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
