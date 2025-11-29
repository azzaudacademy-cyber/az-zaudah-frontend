import { UserPlus, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    number: "1",
    title: "Register & Share Your Goal",
    description: "Tell us who you are and what you want to learn — Qur'an recitation, Tajweed, Hifdh, Arabic, or Islamic studies.",
  },
  {
    icon: Users,
    number: "2",
    title: "Get Matched with a Tutor",
    description: "We match you with a verified Ustādh/Ustādha. Choose live one-to-one online sessions or request nearby in-person options (where available).",
  },
  {
    icon: TrendingUp,
    number: "3",
    title: "Learn & Track Progress",
    description: "Submit recitation recordings, get teacher feedback, and watch steady improvement. Parents receive monthly reports and lesson archives.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Simple, structured, and designed for your success
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 rounded-xl bg-card shadow-card border border-border text-center hover:shadow-elegant transition-all duration-300"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-glow">
                {step.number}
              </div>
              <div className="h-16 w-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4 mt-6">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/auth">Start Your Free Trial</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
