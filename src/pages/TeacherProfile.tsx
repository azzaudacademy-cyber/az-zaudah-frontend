import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { MessageTeacherModal } from "@/components/MessageTeacherModal";
import { SchedulingModal } from "@/components/SchedulingModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Book, Award, Clock, MessageSquare, Calendar, Video } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import the Button component

// In a real application, this data would be fetched from an API
const teachers = [
    {
      id: 1,
      name: "Ustadh Ahmed",
      avatar: "https://github.com/shadcn.png",
      rating: 4.8,
      reviews: 125,
      bio: "Expert in Tajweed and Qur'an Memorization with a passion for helping students connect with the words of Allah. My approach is patient, structured, and tailored to each student's pace. I have successfully guided over 100 students in their Hifdh journey.",
      courses: ["Tajweed", "Hifdh & Qiraa'ah"],
      experience: "5+ years",
      calendlyUrl: "https://calendly.com/d/cn3-p2v-p8c/30-minute-meeting", // Example URL
      location: "Online",
      availability: "Evenings & Weekends",
      studentReviews: [
        { name: "Yusuf K.", rating: 5, comment: "Ustadh Ahmed is incredibly patient and knowledgeable. My recitation has improved significantly." },
        { name: "Aisha B.", rating: 5, comment: "The best teacher for Hifdh. His methods for revision are very effective." },
      ]
    },
    {
      id: 2,
      name: "Ustadha Fatima",
      avatar: "https://avatars.githubusercontent.com/u/8761684?s=48&v=4",
      rating: 4.9,
      reviews: 98,
      bio: "I specialize in making Islamic learning fun and engaging for children and new Muslims. My classes on Du'a, Aadaab, and basic Arabic are designed to build a strong and loving foundation in the Deen.",
      courses: ["Islamic Studies", "Arabic"],
      availability: "Weekdays",
      calendlyUrl: "https://calendly.com/d/cn3-p2v-p8c/30-minute-meeting", // Example URL
      experience: "3-5 years",
      location: "Online",
      studentReviews: [
        { name: "Parent of Ali", rating: 5, comment: "My son loves his classes with Ustadha Fatima. He is always excited to learn." },
        { name: "Sarah J.", rating: 5, comment: "As a revert, her classes were exactly what I needed. Gentle, clear, and so welcoming." },
      ]
    },
    {
      id: 3,
      name: "Qari Yusuf",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.7,
      reviews: 88,
      bio: "With a focus on the beauty of Quranic recitation, I help beginners and intermediate students find their voice. We work on Makharij (articulation) and Sifaat (qualities of letters) to ensure a proper and beautiful recitation.",
      courses: ["Quran Recitation", "Tajweed"],
      availability: "Weekends",
      calendlyUrl: "https://calendly.com/d/cn3-p2v-p8c/30-minute-meeting", // Example URL
      experience: "5+ years",
      location: "Online",
      studentReviews: [
        { name: "Omar F.", rating: 4.5, comment: "Very detailed and helpful. My confidence in reciting has grown." },
      ]
    },
    {
      id: 4,
      name: "Ustadha Aisha",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5.0,
      reviews: 150,
      bio: "I teach advanced topics in Fiqh and Seerah, connecting classical knowledge to contemporary issues. My goal is to empower students to think critically and apply Islamic principles in their daily lives.",
      courses: ["Islamic Studies"],
      availability: "Weekdays",
      calendlyUrl: "https://calendly.com/d/cn3-p2v-p8c/30-minute-meeting", // Example URL
      experience: "10+ years",
      location: "Online",
      studentReviews: [
        { name: "Khadija M.", rating: 5, comment: "An amazing teacher, Masha'Allah. Her depth of knowledge is inspiring." },
        { name: "Abdullah S.", rating: 5, comment: "Ustadha Aisha makes complex topics easy to understand. Highly recommended." },
      ]
    }
];

export default function TeacherProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const teacher = teachers.find(t => t.id.toString() === id);

  if (!teacher) {
    return (
      <Layout>
        <div className="container text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Teacher Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find a profile for this teacher.</p>
          <Button onClick={() => navigate('/find-teacher')}>Back to Search</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Profile Header */}
        <Card className="p-6 md:p-8 mb-8 shadow-lg bg-muted/20">
          <div className="flex flex-col md:flex-row items-center">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 mr-0 md:mr-8 mb-4 md:mb-0 border-4 border-primary">
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback className="text-4xl">{teacher.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{teacher.name}</h1>
              <div className="flex items-center justify-center md:justify-start text-muted-foreground mt-2">
                <Star className="w-5 h-5 mr-1 text-yellow-500" />
                <span className="font-semibold">{teacher.rating.toFixed(1)}</span>
                <span className="mx-2">·</span>
                <span>{teacher.reviews} reviews</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {teacher.courses.map(course => (
                  <span key={course} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{course}</span>
                ))}
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <MessageTeacherModal teacherName={teacher.name} />
              <SchedulingModal teacherName={teacher.name} calendlyUrl={teacher.calendlyUrl} />
            </div>
          </div>
        </Card>

        {/* Profile Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
              <CardContent className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-foreground">
                <p>{teacher.bio}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Student Reviews ({teacher.studentReviews.length})</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {teacher.studentReviews.map((review, index) => (
                  <div key={index} className="flex items-start">
                    <Avatar className="w-10 h-10 mr-4">
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <p className="font-semibold text-foreground mr-2">{review.name}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Details</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-muted-foreground">Experience: </span>
                  <span className="font-semibold ml-1">{teacher.experience}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-muted-foreground">Availability: </span>
                  <span className="font-semibold ml-1">{teacher.availability}</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-5 h-5 mr-3 text-primary" />
                  <span className="text-muted-foreground">Teaching: </span>
                  <span className="font-semibold ml-1">{teacher.location}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Schedule</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Teacher's calendar will be displayed here.</p>
                {/* Placeholder for a calendar component */}
                <div className="mt-4 h-48 bg-muted rounded-md flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}