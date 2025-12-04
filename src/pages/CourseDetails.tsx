import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Course = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  // add any extra fields you added in Supabase, e.g. level, category, etc.
};

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      if (!id) return;

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error loading course:", error.message);
      } else {
        setCourse(data as Course);
      }

      setLoading(false);
    }

    fetchCourse();
  }, [id]);

  async function handleEnroll() {
    if (!id) return;

    if (!user) {
      // not logged in – take them to login screen
      navigate("/auth", { state: { from: `/courses/${id}` } });
      return;
    }

    setEnrolling(true);

    // Insert enrollment
    const { error } = await supabase.from("enrollments").insert({
      course_id: id,
      student_id: user.id,
    });

    setEnrolling(false);

    if (error) {
      // Duplicate enrollment (unique constraint) is Postgres code 23505
      if (error.code === "23505") {
        alert("You are already enrolled in this course.");
      } else {
        console.error(error);
        alert("Enrollment failed: " + error.message);
      }
      return;
    }

    alert("Alhamdulillah! You have enrolled successfully. 🎉");
    navigate("/dashboard");
  }

  return (
    <Layout>
      <section className="py-16 bg-muted/40">
        <div className="container max-w-3xl mx-auto px-4">
          {loading && <p>Loading course...</p>}
          {!loading && !course && <p>Course not found.</p>}

          {course && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  {course.title}
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Deepen your understanding of the Deen with this course.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="font-semibold text-lg mb-2">About this course</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {course.description || "No description yet."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Once enrolled, you will see this course in your dashboard in shaa Allah.
                  </p>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={handleEnroll}
                    disabled={enrolling}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </Layout>
  );
}