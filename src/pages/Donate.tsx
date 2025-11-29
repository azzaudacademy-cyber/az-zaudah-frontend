import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, BookOpen, Users, Gift } from "lucide-react";

export default function Donate() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Support Our Mission
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              Your contribution is a Sadaqah Jariyah (ongoing charity) that helps us make authentic Islamic knowledge accessible to all.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl">Give with a Good Heart</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="one-time" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="one-time">One-Time</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="one-time">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <Button variant="outline" size="lg">$10</Button>
                      <Button variant="outline" size="lg">$25</Button>
                      <Button variant="secondary" size="lg">$50</Button>
                      <Button variant="outline" size="lg">$100</Button>
                    </div>
                    <Button className="w-full text-lg" size="lg">
                      <Gift className="w-5 h-5 mr-2" />
                      Donate Now
                    </Button>
                  </TabsContent>
                  <TabsContent value="monthly">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <Button variant="outline" size="lg">$5</Button>
                      <Button variant="secondary" size="lg">$15</Button>
                      <Button variant="outline" size="lg">$25</Button>
                      <Button variant="outline" size="lg">$50</Button>
                    </div>
                    <Button className="w-full text-lg" size="lg">
                      <Heart className="w-5 h-5 mr-2" />
                      Become a Monthly Supporter
                    </Button>
                  </TabsContent>
                </Tabs>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secure payments powered by Stripe, PayPal, and Flutterwave.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Where Your Donations Go
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Free Course Materials</h3>
                <p className="text-muted-foreground">
                  Developing and providing free access to high-quality books, videos, and learning tools.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Teacher Support</h3>
                <p className="text-muted-foreground">
                  Funding training programs and resources for our verified teachers to ensure excellence.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Student Sponsorship</h3>
                <p className="text-muted-foreground">
                  Sponsoring dedicated students who lack the financial means to pay teachers for their time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}