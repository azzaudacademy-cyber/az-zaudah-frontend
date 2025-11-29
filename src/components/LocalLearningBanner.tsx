import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export const LocalLearningBanner = () => {
  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-secondary/20 to-accent/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MapPin className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
            Online—With Local Care
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
          If you prefer in-person lessons, explore our Find Centres & Teachers hub. We are building a directory of evaluated maktabs and madrasahs. Start online today and choose a hybrid pathway if you like.
        </p>
        <Button variant="outline" size="lg" asChild>
          <Link to="/find-teacher">Find Local Teacher</Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-4 italic">
          Our directory is expanding — check back soon for more centers.
        </p>
      </CardContent>
    </Card>
  );
};