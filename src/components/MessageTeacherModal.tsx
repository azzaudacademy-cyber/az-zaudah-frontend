import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface MessageTeacherModalProps {
  teacherName: string;
}

export function MessageTeacherModal({ teacherName }: MessageTeacherModalProps) {
  const form = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setLoading(true);

    emailjs.sendForm(
      'service_43un6ae',      // ✅ Your Service ID
      'YOUR_TEMPLATE_ID',     // ❗ IMPORTANT: Create and add a new Template ID for this
      form.current,
      'YOUR_PUBLIC_KEY'       // ❗ IMPORTANT: Add Your Public Key
    ).then(
      (result) => {
        console.log('SUCCESS!', result.text);
        toast.success("Message Sent!", {
          description: `Your message to ${teacherName} has been sent.`,
        });
        setIsOpen(false);
        (e.target as HTMLFormElement).reset();
      },
      (error) => {
        console.log('FAILED...', error.text);
        toast.error("Failed to send message.", {
          description: "Please try again later.",
        });
      }
    ).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1">
          <MessageSquare className="w-4 h-4 mr-2" />
          Message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send a Message to {teacherName}</DialogTitle>
          <DialogDescription>Your message will be sent to the teacher's dashboard.</DialogDescription>
        </DialogHeader>
        <form ref={form} onSubmit={handleSubmit} className="grid gap-4 py-4">
          <input type="hidden" name="teacher_name" value={teacherName} />
          <Textarea id="message" name="message" placeholder={`Type your message to ${teacherName} here...`} rows={6} required />
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}