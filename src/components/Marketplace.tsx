import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Package } from "lucide-react";

export const Marketplace = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/10 border border-secondary/30 shadow-elegant">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="h-8 w-8 text-secondary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                📖 Shop Islamic Learning Essentials — With Purpose
              </h2>
            </div>
            
            <p className="text-center text-foreground/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Every purchase here supports our mission to make Qur'an learning free and accessible for all. Explore books, learning kits, and authentic Islamic resources carefully selected to benefit students, parents, and teachers.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium text-foreground border border-border">
                📚 Books
              </span>
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium text-foreground border border-border">
                ✍️ Arabic Tools
              </span>
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium text-foreground border border-border">
                🎒 Madrasah Kits
              </span>
              <span className="px-4 py-2 rounded-full bg-card text-sm font-medium text-foreground border border-border">
                🤲 Dua Cards
              </span>
            </div>

            <div className="text-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/marketplace">Shop Learning Tools</Link>
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4 italic">
              A portion of proceeds directly funds free lessons for children and reverts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
