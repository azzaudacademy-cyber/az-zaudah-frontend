import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero pattern-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Ready to Begin?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            For every step you take is a path to success here at Az-Zaudah
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/auth">Begin Learning</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/find-teacher">Find Tutor</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/auth">Enroll Your Child</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
