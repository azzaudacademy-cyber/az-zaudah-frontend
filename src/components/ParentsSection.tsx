import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Eye, FileText } from "lucide-react";

export const ParentsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            For Parents: Your Peace of Mind Matters
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            We provide parental dashboards, lesson recording archives, and monthly progress reports. Want extra reassurance? Request a female teacher or explore our evaluated local maktabs for additional in-person support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-card shadow-card border border-border">
              <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Safe Environment</h3>
              <p className="text-sm text-muted-foreground">Child-safe learning with verified teachers</p>
            </div>
            <div className="p-6 rounded-xl bg-card shadow-card border border-border">
              <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Full Transparency</h3>
              <p className="text-sm text-muted-foreground">Access lesson recordings anytime</p>
            </div>
            <div className="p-6 rounded-xl bg-card shadow-card border border-border">
              <div className="h-12 w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Progress Reports</h3>
              <p className="text-sm text-muted-foreground">Monthly detailed progress updates</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6 italic">
            We treat every student as an amanah (trust)
          </p>

          <Button variant="outline" size="lg" asChild>
            <Link to="/parents">Parent Portal — Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
