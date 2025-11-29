import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Award, BookOpen, Globe, HandHeart } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-warm py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Az-Zaudah Academy
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                A warm, caring, structured platform created to make Qur'anic and Islamic learning truly accessible
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="leading-relaxed">
                  Az-Zaudah Academy began with a single, simple niyyah — to serve the Muslim Ummah by making authentic Islamic learning very accessible, organised, and compassionate. Born from years of madrasa study and the yearning to continue the Khidmah of the Deen, our founder and team envisioned a learning home where sincerity meets structure.
                </p>
                <p className="leading-relaxed">
                  During long nights of reflection and planning, the idea took form: an Online Qur'an and Islamic-studies platform that honours classical teaching while embracing modern tools. No distractions, no confusion — only clarity, care, and guided progress for every student, whether child, adult, or revert.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inspired by Teachers */}
        <section className="py-16 md:py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <Heart className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Inspired by Teachers & Mentors
                </h2>
              </div>
              <Card className="bg-card/50 backdrop-blur shadow-elegant border-border/50">
                <CardContent className="p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    This vision was shaped by many luminous figures whose dedication became silent mentorship:
                  </p>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span><strong>Bro Sameer (Qutor)</strong> — whose innovative Qur'an-teaching model inspired the digital backbone of our work.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span><strong>Shaykh Allāmah ʿAlī Nūḥ ʿAlī, Qāri Marūf ʿAbdul-ʿAzeez, and Shaykh Ibrāhīm Farayola</strong> — whose humility, mastery, and spiritual refinement became our compass.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">•</span>
                      <span>And the brothers in learning who stood beside our founder in madrasa, pledging together to carry the Qur'an with honour, sincerity, and patience.</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-6 italic">
                    Their example reminds us that knowledge is a light to be carried with adab, not a badge to be worn.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Mission */}
                <Card className="shadow-card border-border hover:shadow-glow transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Globe className="w-10 h-10 text-primary mr-4" />
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">Our Mission</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      To make authentic Qur'ānic and Islamic education very accessible, structured, and dignified — connecting hearts to the Book of Allah through verified and reliable teachers, trusted technology, and compassionate mentorship.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      We believe every learner — whether a child beginning her first letters, an adult rediscovering recitation, or a new Muslim seeking guidance — deserves gentle, guided support, free from intimidation or confusion.
                    </p>
                  </CardContent>
                </Card>

                {/* Vision */}
                <Card className="shadow-card border-border hover:shadow-glow transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Award className="w-10 h-10 text-primary mr-4" />
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">Our Vision</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We strive to build a global learning Ummah that begins locally and grows universally. Starting in Nigeria, we serve families and students at home and abroad, then expand to connect learners across continents.
                    </p>
                    <div className="space-y-3 mt-6">
                      <div className="flex items-start">
                        <span className="text-primary font-bold mr-3">70%</span>
                        <span className="text-muted-foreground">Online Excellence — Live one-to-one sessions, digital Mushaf correction, parental dashboards</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-primary font-bold mr-3">30%</span>
                        <span className="text-muted-foreground">Verified Local Support — A growing network of evaluated maktabs and accredited madrasahs</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-6 italic text-center">
                      In every home, one light of Qur'an. In every heart, a trace of its guidance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
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
                    description: "Curriculum reviewed by qualified ʿUlamāʾ; Tajweed & Fiqh sourced from recognised texts"
                  },
                  {
                    icon: Heart,
                    title: "Gentle Learning Philosophy",
                    description: "No harsh correction, only encouragement + clarity"
                  },
                  {
                    icon: Globe,
                    title: "Adaptive Pathways",
                    description: "Learn online, in person, or through blended study"
                  },
                  {
                    icon: Users,
                    title: "Verified Teachers",
                    description: "Male & female instructors vetted for adab and competence"
                  },
                  {
                    icon: HandHeart,
                    title: "Community Growth",
                    description: "Students, parents, and teachers connected through respect & shared motives"
                  },
                  {
                    icon: Award,
                    title: "Sincerity First",
                    description: "Built for Allah's pleasure, not profit. Many foundational lessons are free"
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

        {/* Our Promise */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-primary shadow-glow border-0">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                    Our Promise
                  </h2>
                  <div className="space-y-4 text-primary-foreground/90 text-lg leading-relaxed">
                    <p>We treat every learner as an Amanah (trust).</p>
                    <p>Your progress, privacy, and dignity are guarded with the same care we give our own students in person.</p>
                    <p>Each recitation, each correction, and each smile of understanding is a witness to our mission.</p>
                    <p className="font-semibold pt-4">
                      We teach not only how to recite but the patience, humility, and light that come with learning them.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beyond the Screen */}
        <section className="py-16 md:py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Beyond the Screen — The Evaluated Learning Network
              </h2>
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Az-Zaudah's commitment extends beyond digital boundaries. Alongside our online classrooms, we are establishing a verified network of nearby Ustādhs, maktabs, and accredited madrasahs across Nigeria and beyond.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span className="text-muted-foreground">Carefully evaluated for authenticity, safety, and teaching quality</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span className="text-muted-foreground">Linked externally from our website once verification is complete</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span className="text-muted-foreground">Accessible via our "Find Centres & Teachers" directory</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">
                    This ensures families who prefer physical study can connect confidently while remaining under Az-Zaudah's umbrella of quality and trust.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Founder's Message */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic mb-6">
                "Know that this academy is built for every Muslim who wished to learn but did not know where to begin. May Allah accept it from us and from you. May He make it a sadaqah jāriyah that continues to benefit hearts and generations."
              </blockquote>
              <p className="text-foreground font-semibold text-lg">
                — Qāri ʿAbdullāh A. Saheb
              </p>
              <p className="text-muted-foreground">
                Khaadim, Founder & Director
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Join Our Learning Journey
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Bismillah — Let's begin your learning with sincerity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/auth")}
                  className="text-lg px-8"
                >
                  Begin Learning
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/courses")}
                  className="text-lg px-8 bg-primary-foreground/10 hover:bg-primary-foreground/20"
                >
                  Explore Courses
                </Button>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  );
};

export default About;
