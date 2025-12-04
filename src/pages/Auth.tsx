import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Mode = "login" | "signup";

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student" | "teacher">("student");
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;
    const fullName = (formData.get("fullName") as string)?.trim();

    if (!email || !password || (mode === "signup" && !fullName)) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Welcome back!");
        navigate("/dashboard", { replace: true });
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role,
            },
          },
        });

        if (error) throw error;

        if (!data.user) {
          toast("Check your email to confirm your account.");
        } else {
          toast.success("Account created. Welcome!");
        }

        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Authentication failed", {
        description: err.message ?? "Please check your details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-elegant">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold">
                {mode === "login" ? "Sign In" : "Create an Account"}
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                {mode === "login"
                  ? "Sign in to access your dashboard and continue learning."
                  : "Join Az-Zaudah Academy as a student or teacher."}
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" name="fullName" required />
                    </div>

                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select
                        defaultValue="student"
                        onValueChange={(value) => setRole(value as "student" | "teacher")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? "Please wait..."
                    : mode === "login"
                    ? "Sign In"
                    : "Sign Up"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                {mode === "login" ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      className="text-primary hover:underline"
                      onClick={() => setMode("signup")}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="text-primary hover:underline"
                      onClick={() => setMode("login")}
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
