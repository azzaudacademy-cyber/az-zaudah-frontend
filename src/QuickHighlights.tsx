import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookMarked, Shield, Globe } from "lucide-react";

const highlights = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Evaluated & Qualified Teachers",
    description:
      "Our male and female tutors are carefully selected for their deep knowledge, patience, and excellent adab (manners) to ensure a respectful learning environment.",
  },
  {
    icon: <BookMarked className="h-10 w-10 text-primary" />,
    title: "Personalised Qur’an Recitation",
    description:
      "Receive interactive feedback on your recitation. Teachers use digital tools to mark persistent mistakes, ensuring you master every verse.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Child-Safe & Parent-Friendly",
    description:
      "We provide a secure platform with lesson recordings, detailed progress reports, and full parental controls for complete peace of mind.",
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Local & Online Options",
    description:
      "Choose from live one-to-one online classes or connect with our growing network of evaluated local centers for in-person learning.",
  },
];

export const QuickHighlights = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Why Families Choose Az-Zaudah
          </h2>
          <p className="text-lg text-muted-foreground">
            A learning experience built on trust, quality, and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  {highlight.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {highlight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};