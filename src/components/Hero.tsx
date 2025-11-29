import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, BookOpen, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pattern-bg">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Learn the Qur'an with Guidance, Care, and Clarity
          </h1>
          
          <h2 className="text-xl md:text-2xl text-muted-foreground font-normal max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            A gentle, modern learning home for children, adults, reverts, and families — Online Primary, Local Ready
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="lg" asChild className="min-w-[200px]">
              <Link to="/auth">Begin Learning (Free Trial)</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="min-w-[200px]">
              <Link to="/find-teacher">Find a Tutor</Link>
            </Button>
          </div>

          {/* Donation Banner */}
          <div className="mt-8 p-6 rounded-xl bg-card shadow-card border border-accent/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">🌙 Support Our Mission</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Be Part of the Khidmah — Your donation sustains free Qur'an learning globally
            </p>
            <Button variant="donation" size="lg" asChild>
              <Link to="/donate">Give Sadaqah Jāriyah</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4 max-w-2xl mx-auto">
            Online lessons + a growing network of verified nearby Ustādh, Maktabs & Madrasahs — choose what suits your family
          </p>
        </div>
      </div>
    </section>
  );
};
