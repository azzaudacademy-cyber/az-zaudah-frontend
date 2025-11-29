import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { useTheme } from "next-themes";

interface SchedulingModalProps {
  teacherName: string;
  calendlyUrl: string;
}

export function SchedulingModal({ teacherName, calendlyUrl }: SchedulingModalProps) {
  const { theme } = useTheme();

  // Define colors for light and dark themes
  const pageSettings = {
    backgroundColor: theme === 'dark' ? '#020817' : '#ffffff', // Matches your dark/light background
    textColor: theme === 'dark' ? '#ffffff' : '#020817',
    primaryColor: '#10b981', // Your primary brand color
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="hero">
          <Calendar className="w-5 h-5 mr-2" />
          Book a Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0">
        <div className="h-[650px]">
          <InlineWidget 
            url={calendlyUrl}
            pageSettings={pageSettings}
            styles={{ height: '100%', width: '100%' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}