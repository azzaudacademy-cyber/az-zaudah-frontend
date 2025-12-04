import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

interface EnrollButtonProps {
  courseId: number;
  user: User | null;
}

export function EnrollButton({ courseId, user }: EnrollButtonProps) {
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const checkEnrollment = async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("id")
        .eq("course_id", courseId)
        .eq("student_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking enrollment:", error);
      } else {
        setIsEnrolled(!!data);
      }
      setLoading(false);
    };

    checkEnrollment();
  }, [courseId, user]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error("You must be logged in to enroll.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("enrollments").insert({
      course_id: courseId,
      student_id: user.id,
    });

    if (error) {
      toast.error("Enrollment failed", {
        description: error.code === '23505' ? "You are already enrolled in this course." : error.message,
      });
    } else {
      toast.success("Successfully enrolled!");
      setIsEnrolled(true);
    }
    setLoading(false);
  };

  if (isEnrolled) {
    return (
      <Button disabled className="w-full">
        Enrolled
      </Button>
    );
  }

  return (
    <Button onClick={handleEnroll} disabled={loading || !user} className="w-full" variant="hero">
      {loading ? "Loading..." : "Enroll Now"}
    </Button>
  );
}