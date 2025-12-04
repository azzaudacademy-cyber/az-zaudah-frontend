import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Map } from "@/components/Map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Users, LifeBuoy, Handshake } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "Enrolling is simple! Go to our 'Courses' page, choose the course you're interested in, and click 'Enroll Now'. You'll be prompted to sign in or create an account to complete the process."
  },
  {
    question: "Are the courses really free? How do teachers get paid?",
    answer: "Yes, access to all our course materials is completely free. Our model is built on supporting educators directly. You pay teachers for their live session time through our secure wallet system, ensuring they are compensated fairly for their expertise."
  },
  {
    question: "What technology do I need for the classes?",
    answer: "You will need a stable internet connection, a computer or tablet with a microphone and webcam, and a modern web browser like Chrome, Firefox, or Safari. Our platform is fully web-based, so no special software is required."
  },
  {
    question: "Can I choose a specific teacher?",
    answer: "Absolutely. You can browse our 'Find a Teacher' page to view profiles, expertise, and availability. You can then select and schedule sessions with the teacher who best fits your learning needs."
  },
  {
    question: "What if I miss a class?",
    answer: "All live sessions are recorded and archived in your student dashboard. You can review missed lessons at any time. For rescheduling, please coordinate directly with your teacher at least 24 hours in advance."
  }
];

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure the form ref is current before sending
    if (!form.current) {
      toast.error("An unexpected error occurred. Please refresh the page.");
      return;
    }

    setLoading(true);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,    // ✅ Your Service ID
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,   // ✅ Your Template ID for the main contact message
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY // ✅ Use environment variable
    ).then(
      (result) => {
        console.log('SUCCESS!', result.text);
        toast.success("Message Sent!", {
          description: "Thank you for reaching out. We will get back to you shortly.",
        });

        // Optional: Send an auto-reply to the user
        // emailjs.send(
        //   'service_43un6ae',
        //   'template_f2xe57f', // Your auto-reply template ID
        //   { email: form.current?.email.value, name: form.current?.name.value },
        //   'YOUR_PUBLIC_KEY'
        // );

        (e.target as HTMLFormElement).reset();
      },
      (error) => {
        console.log('FAILED...', error.text);
        toast.error("Failed to send message.", {
          description: "Please try again later or contact us directly via email.",
        });
      }
    ).finally(() => {
      setLoading(false);
    });
  };


  return (
    <Layout>
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're here to help! Reach out to us with any questions, feedback, or support needs.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="text-center text-muted-foreground mt-12">
              Can't find the answer you're looking for? Please use one of the contact methods below.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="shadow-elegant">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="Your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select name="subject" required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        <SelectItem value="Technical Support">Technical Support</SelectItem>
                        <SelectItem value="Course Question">Course Question</SelectItem>
                        <SelectItem value="Partnership">Partnership</SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="lead">
                Whether you have a question about our courses, need technical assistance, or want to explore partnership opportunities, our team is ready to assist you. Please find the most relevant contact method below.
              </p>

              {/* General Inquiries */}
              <div>
                <h2 className="flex items-center gap-3 text-foreground mb-4">
                  <Mail className="h-7 w-7 text-primary" />
                  General Inquiries
                </h2>
                <Card className="shadow-sm border-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      For all general questions about Az-Zaudah Academy, our mission, or non-urgent matters.
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-5 w-5 text-secondary" />
                      <a href="mailto:azzaudacademy@gmail.com" className="text-primary hover:underline">azzaudacademy@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-secondary" />
                      <a href="tel:+2348142558050" className="text-primary hover:underline">+2348142558050</a> (Mon-Fri, 9 AM - 5 PM WAT)
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Technical Support */}
              <div>
                <h2 className="flex items-center gap-3 text-foreground mb-4">
                  <LifeBuoy className="h-7 w-7 text-primary" />
                  Technical Support
                </h2>
                <Card className="shadow-sm border-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Experiencing technical issues with the platform, course access, or account management? Our support team is here to help.
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-5 w-5 text-secondary" />
                      <a href="mailto:azzauacademy@gmail.com" className="text-primary hover:underline">azzauacademy@gmail.com</a>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Please include your username and a detailed description of the issue for faster resolution.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Partnerships & Collaborations */}
              <div>
                <h2 className="flex items-center gap-3 text-foreground mb-4">
                  <Handshake className="h-7 w-7 text-primary" />
                  Partnerships & Collaborations
                </h2>
                <Card className="shadow-sm border-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Interested in partnering with Az-Zaudah Academy or exploring collaboration opportunities? We'd love to hear from you.
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-secondary" />
                      <a href="mailto:azzauacademy@gmail.com" className="text-primary hover:underline">azzauacademy@gmail.com</a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Our Location */}
              <div>
                <h2 className="flex items-center gap-3 text-foreground mb-4">
                  <MapPin className="h-7 w-7 text-primary" />
                  Our Location
                </h2>
                <Card className="shadow-sm border-border">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      While we are primarily an online academy, our administrative office is located at:
                    </p>
                    <address className="not-italic text-muted-foreground">
                      20 Gwani str, Zone 4<br />
                      Wuse, Abuja<br />
                      Nigeria
                    </address>
                    <p className="text-sm text-muted-foreground mt-4">
                      Please note that visits are by appointment only.
                    </p>
                    <div className="mt-6 rounded-md overflow-hidden border">
                      <Map />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  );
}