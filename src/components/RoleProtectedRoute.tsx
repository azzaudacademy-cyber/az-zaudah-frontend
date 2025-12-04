import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  allowedRoles: string[];
  children?: ReactNode;
};
export function RoleProtectedRoute({ allowedRoles, children }: Props) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-muted-foreground">
        Checking permissions...
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  const userRole = profile?.role ?? "student";

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ?? <Outlet />;
}