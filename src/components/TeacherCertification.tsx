import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, BookOpen, Users } from "lucide-react";

export const TeacherCertification = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-elegant">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground">
                🌿 Az-Zaudah Teacher Development Program
              </h2>
            </div>
            
            <p className="text-center text-foreground/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              Dedicated to teachers who serve with sincerity and excellence. This certified training prepares Qur'an instructors with structured, gentle, and modern teaching tools while nurturing adab, patience, and clarity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Structured Training</h3>
                <p className="text-sm text-muted-foreground">Modern teaching methods with Islamic principles</p>
              </div>
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Official Certificate</h3>
                <p className="text-sm text-muted-foreground">Recognized Az-Zaudah Certified Teacher badge</p>
              </div>
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Preference in Matching</h3>
                <p className="text-sm text-muted-foreground">Priority placement with students</p>
              </div>
            </div>

            <div className="text-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/certification">Enroll for Certification</Link>
              </Button>
            </div>

            <div className="mt-6 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                <Award className="h-4 w-4" />
                Az-Zaudah Certified Teacher 🏅
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
