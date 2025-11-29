import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Github } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase"; // Import Supabase client

type AuthView = 'SIGN_IN' | 'SIGN_UP' | 'VERIFY_MFA' | 'FORGOT_PASSWORD' | 'UPDATE_PASSWORD';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"student" | "tutor" | "admin">("student");
  const [authView, setAuthView] = useState<AuthView>('SIGN_IN');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthView('UPDATE_PASSWORD');
        toast.info("Create a new password", {
          description: "You have successfully verified your recovery email. Please enter a new password.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Sign In Failed", { description: error.message });
    } else if (data.session?.user?.factors?.length) {
      // User has MFA enabled, prompt for verification
      setAuthView('VERIFY_MFA');
      toast.info("Check your authenticator app", { description: "Enter the code to complete sign-in." });
    } else {
      toast.success("Successfully signed in!");
      // Supabase automatically manages session and redirects if needed
    }
    setLoading(false);
  };

  const handleMfaSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;

    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: (await supabase.auth.mfa.listFactors()).data?.all[0].id || '',
      code,
    });

    if (error) {
      toast.error("Invalid 2FA code.", { description: error.message });
    } else {
      toast.success("Successfully signed in!");
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin, // Redirect back to the app after auth
      },
    });
    if (error) {
      toast.error(`Failed to sign in with ${provider}`, { description: error.message });
    }
    // No need to setLoading(false) as the page will redirect
  };

  const handlePasswordResetRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin, // Redirect back to the app
    });

    if (error) {
      toast.error("Failed to send reset link", { description: error.message });
    } else {
      toast.success("Password reset link sent!", {
        description: "Please check your email for instructions to reset your password.",
      });
      setAuthView('SIGN_IN');
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error("Failed to update password", { description: error.message });
    } else {
      toast.success("Password updated successfully!", {
        description: "You can now sign in with your new password.",
      });
      setAuthView('SIGN_IN');
    }
    setLoading(false);
  };


  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const name = formData.get("name") as string; // Supabase stores this in user_metadata

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // Store full name in user_metadata
          role: role,      // Store the selected role
        },
      },
    });

    if (error) {
      toast.error("Sign Up Failed", {
        description: error.message,
      });
    } else {
      toast.success("Account created successfully! Please check your email to confirm.");
      // Supabase handles email confirmation flow
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pattern-bg py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="h-16 w-16 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Az-Zaudah</h1>
              <p className="text-muted-foreground">Begin your journey with us</p>
            </div>

            <Card className="p-6 shadow-elegant">
              <Tabs value={['SIGN_IN', 'VERIFY_MFA', 'FORGOT_PASSWORD', 'UPDATE_PASSWORD'].includes(authView) ? 'signin' : 'signup'} onValueChange={(value) => setAuthView(value.toUpperCase() as AuthView)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    {authView === 'VERIFY_MFA' && (
                      <>
                        <h3 className="font-semibold">Enter 2FA Code</h3>
                        <form onSubmit={handleMfaSignIn} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="mfa-code">Authenticator Code</Label>
                            <Input id="mfa-code" name="code" type="text" required />
                          </div>
                          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                            {loading ? "Verifying..." : "Verify & Sign In"}
                          </Button>
                        </form>
                      </>
                    )}
                    {authView === 'FORGOT_PASSWORD' && (
                      <>
                        <h3 className="font-semibold">Reset Your Password</h3>
                        <form onSubmit={handlePasswordResetRequest} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="reset-email">Email</Label>
                            <Input id="reset-email" name="email" type="email" placeholder="your@email.com" required />
                          </div>
                          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Instructions"}
                          </Button>
                          <p className="text-xs text-center">
                            <a href="#" onClick={() => setAuthView('SIGN_IN')} className="text-primary hover:underline">Back to Sign In</a>
                          </p>
                        </form>
                      </>
                    )}
                    {authView === 'UPDATE_PASSWORD' && (
                      <p>Please check your email for the password reset link.</p>
                      // This view is now handled by the useEffect hook, which will show the update form.
                    )}
                    {authView === 'SIGN_IN' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="signin-email">Email</Label>
                          <Input id="signin-email" name="email" type="email" placeholder="your@email.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-password">Password</Label>
                          <Input id="signin-password" name="password" type="password" placeholder="••••••••" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signin-role">I am a</Label>
                          <Select value={role} onValueChange={(value: any) => setRole(value)}>
                            <SelectTrigger id="signin-role"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student/Parent</SelectItem>
                              <SelectItem value="tutor">Tutor</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                          {loading ? "Signing in..." : "Sign In"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Forgot password? <a href="#" onClick={() => setAuthView('FORGOT_PASSWORD')} className="text-primary hover:underline">Reset here</a>
                        </p>

                        <div className="relative my-4">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                              Or continue with
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" onClick={() => handleOAuthSignIn('github')}>
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </Button>
                          <Button variant="outline" onClick={() => handleOAuthSignIn('google')}>
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c2.18 0 3.54.84 4.36 1.62l2.34-2.33C18.27 2.31 15.75 1 12.48 1 7.02 1 3 5.02 3 9.5s4.02 8.5 9.48 8.5c2.84 0 5.12-1 6.84-2.62 1.78-1.66 2.34-4.02 2.34-6.38 0-.5-.05-.95-.13-1.4z" fill="currentColor"/></svg>
                            Google
                          </Button>
                        </div>
                      </>
                    )}
                    {authView === 'UPDATE_PASSWORD' && (
                      <>
                        <h3 className="font-semibold">Create a New Password</h3>
                        <form onSubmit={handleUpdatePassword} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" name="password" type="password" required />
                          </div>
                          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                            {loading ? "Saving..." : "Save New Password"}
                          </Button>
                        </form>
                      </>
                    )}
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm Password</Label>
                      <Input
                        id="signup-confirm"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-role">I am a</Label>
                      <Select value={role} onValueChange={(value: any) => setRole(value)}>
                        <SelectTrigger id="signup-role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student/Parent</SelectItem>
                          <SelectItem value="tutor">Tutor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground italic">
                      We treat every student as an amanah (trust)
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
