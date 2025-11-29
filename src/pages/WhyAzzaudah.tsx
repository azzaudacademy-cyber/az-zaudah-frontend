import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Award, BookOpen, Globe, HandHeart } from "lucide-react";

export default function WhyAzzudah() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-warm py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Az-Zaudah Academy?
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Learn, Grow, and Illuminate — our mission and vision explained. A place where sincerity meets structure.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-warm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                What Makes Us Different
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: BookOpen,
                    title: "Authenticity with Structure",
                    description: "Curriculum reviewed by qualified ʿUlamāʾ; Tajweed & Fiqh sourced from recognised texts."
                  },
                  {
                    icon: Heart,
                    title: "Gentle Learning Philosophy",
                    description: "No harsh correction, only encouragement and clarity. We nurture a love for learning."
                  },
                  {
                    icon: Globe,
                    title: "Adaptive Pathways",
                    description: "Learn online, in-person, or through blended study options tailored to your needs."
                  },
                  {
                    icon: Users,
                    title: "Verified Teachers",
                    description: "Male & female instructors vetted for knowledge, character (adab), and teaching competence."
                  },
                  {
                    icon: HandHeart,
                    title: "Community Growth",
                    description: "Students, parents, and teachers connected through respect and shared motives for Allah's pleasure."
                  },
                  {
                    icon: Award,
                    title: "Sincerity First",
                    description: "Built for Allah's pleasure, not for profit. Many foundational lessons are free to access."
                  }
                ].map((item, index) => (
                  <Card key={index} className="bg-card/80 backdrop-blur shadow-card hover:shadow-glow transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <item.icon className="w-8 h-8 text-primary mr-4 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-primary shadow-glow border-0">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                    Our Promise to You
                  </h2>
                  <div className="space-y-4 text-primary-foreground/90 text-lg leading-relaxed">
                    <p>We treat every learner as an Amanah (a sacred trust). Your progress, privacy, and dignity are guarded with the same care we give our own students in person. We teach not only how to recite, but the patience, humility, and light that come with learning the Qur'an.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}