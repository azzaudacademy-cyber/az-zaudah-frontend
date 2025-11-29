import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, Mic, Upload, ShoppingBag, PenTool } from "lucide-react";

const tools = [
  {
    icon: <BookMarked className="h-5 w-5 text-primary" />,
    name: "Personalised Digital Mushaf",
  },
  {
    icon: <Mic className="h-5 w-5 text-primary" />,
    name: "Live Recitation Recorder",
  },
  {
    icon: <Upload className="h-5 w-5 text-primary" />,
    name: "Upload & Share Resources",
  },
  {
    icon: <ShoppingBag className="h-5 w-5 text-primary" />,
    name: "Ebooks from Shop",
  },
  {
    icon: <PenTool className="h-5 w-5 text-primary" />,
    name: "Interactive Whiteboard",
  },
];

export const SpotlightTools = () => {
  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Georgia, serif' }}>
          Classroom Features for Real Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tools.map((tool, index) => (
            <li key={index} className="flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-md">
                {tool.icon}
              </div>
              <span className="text-base text-muted-foreground">{tool.name}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-6 italic">
          "Tools designed for Qur’an & language teaching — precise, simple, and secure."
        </p>
      </CardContent>
    </Card>
  );
};