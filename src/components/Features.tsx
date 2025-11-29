import { CheckCircle, Users, Heart, Globe } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Evaluated and Qualified Teachers",
    description: "Male & female tutors selected for knowledge, patience, and adab.",
  },
  {
    icon: Heart,
    title: "Personalised Qur'an Recitation",
    description: "Interactive feedback, persistent mistake-marks, and teacher annotations.",
  },
  {
    icon: Users,
    title: "Child-safe & Parent-friendly",
    description: "Recordings, progress reports, and parental controls.",
  },
  {
    icon: Globe,
    title: "Community Growth",
    description: "Students, parents, and teachers connected through respect & shared motives, with flexibility for in-person continuity.",
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Why Families Choose Az-Zaudah
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Authentic learning with care, structure, and verified teachers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card shadow-card border border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
