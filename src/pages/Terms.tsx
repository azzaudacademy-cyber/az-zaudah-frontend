import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Users, Shield, BookOpen } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A covenant of trust (amanah) and respect, guiding our shared journey of knowledge.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="lead">
                Assalāmu ʿalaykum wa raḥmatullāh. Welcome to Az-Zaudah Academy. By accessing our platform, you agree to abide by these Terms of Service, which are designed to foster a safe, respectful, and effective learning environment for all.
              </p>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <Users className="h-7 w-7 text-primary" />
                  User Accounts & Conduct
                </h2>
                <ul>
                  <li><strong>Account Integrity:</strong> You agree to provide accurate information during registration. Accounts are for personal use and may not be shared.</li>
                  <li><strong>Islamic Adab:</strong> All users—students, tutors, and parents—are expected to interact with respect, honesty, and patience. Harassment, inappropriate language, or any form of misconduct is strictly prohibited.</li>
                  <li><strong>Lawful Use:</strong> The platform must be used solely for educational purposes in a manner that is lawful and compliant with Islamic ethics.</li>
                </ul>
              </div>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <BookOpen className="h-7 w-7 text-primary" />
                  Academic Integrity
                </h2>
                <ul>
                  <li><strong>Tutor Verification:</strong> All tutors are vetted through our Teacher Evaluation Criteria (TEC) to ensure they are qualified, ethical, and professional.</li>
                  <li><strong>Student Responsibility:</strong> Students are expected to attend classes punctually, participate respectfully, and complete assigned tasks.</li>
                  <li><strong>Content Use:</strong> All course materials, videos, and resources provided by Az-Zaudah Academy are for personal educational use only and may not be redistributed without permission.</li>
                </ul>
              </div>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <Shield className="h-7 w-7 text-primary" />
                  Payments, Refunds & Donations
                </h2>
                <ul>
                  <li><strong>Payments:</strong> Fees for any paid services are processed securely through our trusted payment partners (Stripe, PayPal, Flutterwave).</li>
                  <li><strong>Refunds:</strong> Refunds are handled with fairness and transparency as detailed in our Refund Policy. Requests can be submitted via the user dashboard.</li>
                  <li><strong>Donations:</strong> All donations are voluntary and are used to support free learning initiatives. They are considered a gift and are non-refundable.</li>
                </ul>
              </div>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <FileText className="h-7 w-7 text-primary" />
                  Termination & Governing Law
                </h2>
                <p>
                  Az-Zaudah Academy reserves the right to suspend or terminate any account that violates these terms or compromises the safety and integrity of our community. These terms are governed by the laws of the Federal Republic of Nigeria and the ethical principles of Islamic Shari'ah.
                </p>
                <p className="italic mt-4">
                  For any questions regarding these terms, please contact us at <a href="mailto:azzaudacademy@gmail.com" className="text-primary hover:underline">azzaudacademy@gmail.com</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
