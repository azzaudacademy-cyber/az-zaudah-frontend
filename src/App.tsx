import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";

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
import Dashboard from "@/pages/Dashboard"; // Check if this file exists
// Ensure the ProtectedRoute component is correctly imported
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import Settings from "@/pages/Settings";
import Wallet from "@/pages/Wallet";
import AdminDashboard from "@/pages/AdminDashboard";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

// Import dedicated course pages
// NOTE: The following imports are for dedicated course pages that have not been created yet.
// They are commented out to prevent compilation errors.
// Create these files in `src/pages/courses/` and then uncomment the lines below.
// import QuranRecitationPage from "@/pages/courses/QuranRecitation";
// import TajweedPage from "@/pages/courses/TajweedPage";
// import HifdhAndQiraahPage from "@/pages/courses/HifdhAndQiraah";
// import ArabicPage from "@/pages/courses/Arabic";
// import IslamicStudiesPage from "@/pages/courses/IslamicStudies";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/why-azzaudah" element={<WhyAzzaudah />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/find-teacher" element={<FindTeacher />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/donate" element={<Donate />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/parent-portal" element={<ParentPortal />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/wallet" element={<Wallet />} />

            {/* Admin-Only Route */}
            <Route element={<RoleProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

          </Route>

          {/* Dedicated Course Routes - Uncomment these as you create the pages */}
          {/* <Route path="/courses/quran-recitation" element={<QuranRecitationPage />} /> */}
          {/* <Route path="/courses/tajweed" element={<TajweedPage />} /> */}
          {/* <Route path="/courses/hifdh-qiraah" element={<HifdhAndQiraahPage />} /> */}
          {/* <Route path="/courses/arabic" element={<ArabicPage />} /> */}
          {/* <Route path="/courses/islamic-studies" element={<IslamicStudiesPage />} /> */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 pages */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;