import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCourse(data);
      }
      setLoading(false);
    }
    fetchCourse();
  }, [id]);

  async function handleEnroll() {
    setEnrolling(true);

    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (!user) {
      alert("Please sign in first.");
      navigate("/auth");
      return;
    }

    // Insert enrollment
    const { error } = await supabase.from("enrollments").insert({
      course_id: id,
      student_id: user.id,
    });

    setEnrolling(false);

    if (error) {
      if (error.code === "23505") {
        alert("You are already enrolled in this course.");
      } else {
        alert("Enrollment failed: " + error.message);
      }
      return;
    }

    alert("Successfully enrolled! 🎉");
    navigate("/dashboard");
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!course) return <div className="p-6">Course not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <p className="text-gray-700 mb-6">{course.description}</p>

      <button
        onClick={handleEnroll}
        disabled={enrolling}
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {enrolling ? "Enrolling..." : "Enroll Now"}
      </button>
    </div>
  );
}