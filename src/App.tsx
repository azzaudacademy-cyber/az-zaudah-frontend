import { Routes, Route } from "react-router-dom";

// Import all your page components
import Index from "@/pages/Index";
import About from "@/pages/About";
import TermsOfService from "@/pages/Terms";
import Marketplace from "@/pages/Marketplace";
import Courses from "@/pages/Courses";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import Donate from "@/pages/Donate";
import ParentPortal from "@/pages/ParentPortal";
import WhyAzzaudah from "@/pages/WhyAzzaudah";
import Contact from "@/pages/Contact";
import FindTeacher from "@/pages/FindTeacher";
import TeacherProfile from "@/pages/TeacherProfile";
// Ensure the Dashboard component is correctly imported
// Ensure the ProtectedRoute component is correctly imported
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import Settings from "@/pages/Settings";
import Wallet from "@/pages/Wallet";
import AdminDashboard from "@/pages/AdminDashboard";
import Dashboard from "@/pages/Dashboard";
import CourseDetails from "@/pages/CourseDetails";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/why-azzaudah" element={<WhyAzzaudah />} />
      <Route path="/find-teacher" element={<FindTeacher />} />
      <Route path="/teachers/:id" element={<TeacherProfile />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/parent-portal" element={<ParentPortal />} />

      {/* Auth page */}
      <Route path="/auth" element={<Auth />} />

      {/* Authenticated students/teachers */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/wallet" element={<Wallet />} />
      </Route>

      {/* Admin-only section */}
      <Route
        element={<RoleProtectedRoute allowedRoles={["admin"]} />}
      >
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;