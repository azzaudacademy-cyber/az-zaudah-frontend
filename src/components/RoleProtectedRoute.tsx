import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RoleProtectedRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role: string;
}) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/auth" />;
  if (user.role !== role) return <Navigate to="/" />;

  return children;
}