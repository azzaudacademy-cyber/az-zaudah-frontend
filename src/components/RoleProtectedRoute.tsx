import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Role = "student" | "teacher" | "admin";

interface ProfileRow {
  role: Role;
}

export function RoleProtectedRoute({ allowedRoles }: { allowedRoles: Role[] }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          setAllowed(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select<"role", ProfileRow>("role")
          .eq("id", session.user.id)
          .single();

        if (error || !data) {
          console.error("Error loading profile:", error);
          setAllowed(false);
        } else {
          setAllowed(allowedRoles.includes(data.role));
        }
      } catch (error) {
        console.error("Error loading session or profile:", error);
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [allowedRoles]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-muted-foreground">
        Checking permissions...
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}