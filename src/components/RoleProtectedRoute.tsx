import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface RoleProtectedRouteProps {
  requiredRole: string;
}

export const RoleProtectedRoute = ({ requiredRole }: RoleProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div>Loading...</div>; // Or a spinner component
  }

  const userRole = session?.user?.user_metadata?.role;

  return session && userRole === requiredRole ? <Outlet /> : <Navigate to="/dashboard" />;
};