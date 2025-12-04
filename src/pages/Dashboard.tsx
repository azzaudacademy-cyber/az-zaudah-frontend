import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Profile {
  full_name: string | null;
  role: "student" | "teacher" | "admin";
}

interface EnrolledCourse {
  courses: {
    id: number;
    title: string;
    description: string;
  } | null;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) return;

        // Fetch profile
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          throw error;
        }
        setProfile(data as Profile);
      } catch (error) {
        console.error("Error loading dashboard profile:", error);
        // Optionally, show a toast notification to the user
        // toast.error("Could not load your profile information.");
      }
    };

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // simple redirect
  };

  const title =
    profile?.role === "teacher"
      ? "Teacher Dashboard"
      : profile?.role === "admin"
      ? "Admin Dashboard"
      : "Student Dashboard";

  return (
    <Layout>
      <section className="py-10 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              <p className="text-muted-foreground mt-1">
                {profile?.full_name
                  ? `Welcome, ${profile.full_name}.`
                  : "Welcome to Az-Zaudah Academy."}
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>

          {/* Overview cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">My Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Courses you are enrolled in
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Sessions
                </CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">–</div>
                <p className="text-xs text-muted-foreground">
                  Next booked classes (wire up later)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Teachers</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">–</div>
                <p className="text-xs text-muted-foreground">
                  Favourite / saved teachers
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Placeholders for future sections */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
              </CardHeader>
              <CardContent>
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.map(({ courses }) => courses && (
                      <Link to={`/courses/${courses.id}`} key={courses.id}>
                        <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                          <h3 className="font-semibold">{courses.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{courses.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">You are not enrolled in any courses yet. <Link to="/courses" className="text-primary hover:underline">Browse courses</Link>.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This area can show platform announcements, new courses, Ramadan
                  programs, etc.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}