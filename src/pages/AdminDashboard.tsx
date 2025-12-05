import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface AdminEnrollmentRow {
  id: string;
  created_at: string;
  student_id: string;

  courses: {
    id: string;
    title: string;
  }[];

  profiles: {
    id: string;
    full_name: string;
    email: string;
  }[];
}

export default function AdminDashboard() {
  const [enrollments, setEnrollments] = useState<AdminEnrollmentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("enrollments")
        .select(`
      id,
      created_at,
      student_id,
      courses ( id, title ),
      profiles:profiles ( id, full_name, email )
  `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading admin data:", error.message);
      } else {
        setEnrollments(data as AdminEnrollmentRow[]);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <Layout>
      <section className="py-10 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Overview of course enrollments. (You can expand this later with
              more analytics.)
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <p>Loading...</p>}

              {!loading && enrollments.length === 0 && (
                <p className="text-muted-foreground">No enrollments yet.</p>
              )}

              {!loading && enrollments.length > 0 && (
                <div className="space-y-4">
                  {enrollments.map((row) => (
                    <div
                      key={row.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-semibold">
                          {row.courses?.[0]?.title || "No course"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Student: {row.profiles?.[0]?.full_name || "Unknown"} ({row.profiles?.[0]?.email || "Unknown"})
                        </p>
                      </div> 
                      <p className="text-xs text-muted-foreground mt-2 md:mt-0">
                        {new Date(row.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}