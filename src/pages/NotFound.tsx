import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="text-2xl text-muted-foreground">Oops! The page you're looking for could not be found.</p>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
