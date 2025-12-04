import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const courses = [
  {
    id: "quran-recitation",
    title: "Quran Recitation",
    description: "Master the art of reciting the Holy Quran with proper articulation and flow",
    longDescription: "Learn the fundamental and advanced rules of Tajweed to recite the Quran with precision and beauty. This course covers Makharij (articulation points), Sifaat (characteristics of letters), and practical application.",
    duration: "12 weeks",
    level: "Beginner to Advanced",
    students: "250+",
    features: [
      "One-on-one sessions with certified teachers",
      "Comprehensive Tajweed rules coverage",
      "Practice sessions with feedback",
      "Digital learning materials",
      "Certificate upon completion"
    ],
    price: "FREE"
  },
  {
    id: "tajweed",
    title: "Tajweed",
    description: "Perfect your Quranic pronunciation and application of Tajweed rules",
    longDescription: "A structured program for Quran memorization (Hifdh) combined with beautiful recitation (Qiraa'ah). Personalized pace and regular revision schedules to ensure long-term retention.",
    duration: "Flexible",
    level: "All Levels",
    students: "180+",
    features: [
      "Personalized memorization schedule",
      "Daily revision techniques",
      "Multiple Qiraa'at styles available",
      "Regular assessment and testing",
      "Family progress tracking"
    ],
    price: "FREE"
  },
  {
    id: "hifdh-qiraah",
    title: "Hifdh & Qiraa'ah",
    description: "Memorize the Holy Quran and learn various Qiraa'at (recitation styles)",
    longDescription: "Comprehensive course covering daily Du'as, their meanings, and Islamic etiquettes (Aadaab) for various aspects of life. Perfect for children and adults seeking to strengthen their connection with Allah.",
    duration: "8 weeks",
    level: "Beginner",
    students: "320+",
    features: [
      "Daily Du'as with translations",
      "Islamic etiquettes and manners",
      "Memorization techniques",
      "Audio pronunciations",
      "Illustrated guidebook included"
    ],
    price: "FREE"
  },
  {
    id: "arabic",
    title: "Arabic",
    description: "Learn to read, write, and understand classical Arabic, the language of the Quran",
    longDescription: "Explore the authentic sayings and actions of Prophet Muhammad (ﷺ) through major Hadith collections. Learn Hadith terminology, authentication methods, and practical implementation.",
    duration: "16 weeks",
    level: "Intermediate to Advanced",
    students: "150+",
    features: [
      "Study of Sahih Bukhari & Muslim",
      "Hadith terminology (Mustalah)",
      "Chain of narration analysis",
      "Contemporary applications",
      "Weekly discussion sessions"
    ],
    price: "FREE"
  }
];
const islamicStudiesCourse = {
  id: "islamic-studies",
  title: "Islamic Studies",
  description: "Comprehensive study of Aqeedah, Fiqh, Seerah, and Islamic ethics",
  longDescription: "Delve into the foundational aspects of Islam including Aqeedah (creed), Fiqh (jurisprudence), Seerah (Prophet's biography), and general Islamic ethics to build a strong understanding of your faith.",
  duration: "Ongoing",
  level: "All Levels",
  students: "400+",
  features: [
    "Structured curriculum on core Islamic sciences",
    "Interactive lessons and discussions",
    "Qualified instructors",
    "Practical application of knowledge",
    "Community learning environment"
  ],
  price: "FREE"
};
courses.push(islamicStudiesCourse); // Add Islamic Studies to the list
const Courses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEnroll = (courseId: string, courseTitle: string) => {
    // For now, redirect to auth page. Later this will be enhanced with actual enrollment
    toast({
      title: "Enrollment Starting",
      description: `Please sign in to enroll in ${courseTitle}`,
    });
    navigate("/auth");
  };

  return (
    <Layout>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-georgia">
                Our Courses
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Comprehensive Islamic education programs designed for all ages and levels. 
                Learn from certified teachers in a supportive online environment.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Certified Teachers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Flexible Schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>One-on-One Sessions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Model Section */}
        <section className="py-12 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Free Learning — Support Teachers Directly
                </h2>
                <p className="text-lg text-primary-foreground/90">
                  All courses are free to access. You pay teachers directly for their time and expertise.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card/90 backdrop-blur border-primary-foreground/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">📚</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">All Courses FREE</h3>
                    <p className="text-sm text-muted-foreground">
                      Access quality Islamic education without barriers. Knowledge should be accessible to all.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/90 backdrop-blur border-primary-foreground/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">💰</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Pay Teachers Directly</h3>
                    <p className="text-sm text-muted-foreground">
                      Compensate teachers directly for their time. Flexible rates based on teacher experience.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/90 backdrop-blur border-primary-foreground/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Wallet System</h3>
                    <p className="text-sm text-muted-foreground">
                      Use our convenient wallet system for seamless payments and session management.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <span className="text-2xl font-bold text-primary">{course.price}</span>
                    </div>
                    <CardTitle className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {course.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {course.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{course.students} students</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        What's Included:
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-3">
                    <Button 
                      className="flex-1"
                      onClick={() => handleEnroll(course.id, course.title)}
                    >
                      Enroll Now
                    </Button>
                    <Link to={`/courses/${course.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                      View Details
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Not Sure Which Course to Choose?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our educational consultants are here to help you find the perfect course 
              for your learning goals and schedule.
            </p>
            <Button 
              size="lg" 
              variant="default"
              onClick={() => navigate("/find-teacher")}
            >
              Get Free Consultation
            </Button>
          </div>
        </section>
    </Layout>
  );
};

export default Courses;
