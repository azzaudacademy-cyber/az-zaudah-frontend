import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, BookCheck, MessageSquare, ShieldCheck } from "lucide-react";

export default function ParentPortal() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Parent Portal
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your window into your child’s learning journey. Securely access progress, schedules, and teacher feedback.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
            {/* Login Form */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-elegant">
                <CardHeader>
                  <CardTitle>Portal Login</CardTitle>
                  <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="parent@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">Sign In</Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Forgot password? <a href="#" className="text-primary hover:underline">Reset here</a>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Features Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">Stay Connected and Informed</h2>
              <p className="text-muted-foreground">Our Parent Portal is designed as an Amanah (trust) to give you peace of mind and full transparency.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <BookCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Track Progress</h3>
                    <p className="text-muted-foreground">View lesson notes, completed assignments, and teacher feedback in real-time.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Communicate Securely</h3>
                    <p className="text-muted-foreground">Send and receive messages from your child's teacher within our secure platform.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}