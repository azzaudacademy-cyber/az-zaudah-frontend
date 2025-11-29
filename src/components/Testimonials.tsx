import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "A caring place to learn — my child loves the teacher and the progress is steady.",
    author: "Fatimah",
    location: "Lagos",
  },
  {
    text: "Finally, I have seen a platform that balances tradition and modern tools.",
    author: "Ahmed",
    location: "Abuja",
  },
  {
    text: "The recitation feedback is so precise, I love it — my tajweed improved in days.",
    author: "Hafsa",
    location: "UK",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          What Our Students Say
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Real experiences from our learning community
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-card border border-border hover:shadow-elegant transition-all duration-300">
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-4 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-foreground">— {testimonial.author}</span>
                <span className="text-muted-foreground">{testimonial.location}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
