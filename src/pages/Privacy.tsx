import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Lock, Users, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/40 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your Privacy is an Amanah (Trust). We are committed to protecting your data with integrity and transparency.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
              <p className="lead">
                At Az-Zaudah Academy, we treat your privacy as a sacred trust (amanah). This policy outlines our commitment to safeguarding your information in accordance with both global data protection standards (like GDPR) and Islamic ethical principles.
              </p>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <Shield className="h-7 w-7 text-primary" />
                  Information We Collect
                </h2>
                <p>
                  We collect limited data necessary to provide a safe, personalized, and effective learning environment. This includes:
                </p>
                <ul>
                  <li><strong>Personal Identification:</strong> Name, email, and contact information for account management.</li>
                  <li><strong>Learning Data:</strong> Course progress, class schedules, teacher feedback, and communication logs to track academic growth.</li>
                  <li><strong>Payment Information:</strong> Securely encrypted transaction records for paid services and donations. We do not store your card details on our servers.</li>
                  <li><strong>Technical Data:</strong> Anonymous data on platform usage to improve performance and security.</li>
                </ul>
              </div>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <Lock className="h-7 w-7 text-primary" />
                  How We Use Your Data
                </h2>
                <p>
                  Your data is used exclusively to enhance your learning journey. We use it to:
                </p>
                <ul>
                  <li>Match students with the most suitable verified teachers.</li>
                  <li>Provide parents with progress reports and class insights.</li>
                  <li>Communicate important updates, schedules, and announcements.</li>
                  <li>Ensure platform security and improve user experience.</li>
                  <li>Process payments and donations securely.</li>
                </ul>
                <p className="font-semibold">We never sell, rent, or share your personal data with third parties for marketing purposes.</p>
              </div>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <Users className="h-7 w-7 text-primary" />
                  Child Protection & Parental Access
                </h2>
                <p>
                  The safety of our young learners is paramount.
                </p>
                <ul>
                  <li>Parents are automatically granted supervisory access to their child's dashboard, including class recordings and teacher notes.</li>
                  <li>All tutors undergo a strict verification process (TEC) before interacting with students.</li>
                  <li>Communication between tutors and students is monitored and restricted to the platform to ensure a safe learning environment.</li>
                </ul>
              </div>

              <div>
                <h2 className="flex items-center gap-3 text-foreground">
                  <Mail className="h-7 w-7 text-primary" />
                  Your Rights & Contact
                </h2>
                <p>
                  You have the right to access, correct, or request the deletion of your personal data at any time. For any privacy-related inquiries, please contact us.
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:azzaudacademy@gmail.com" className="text-primary hover:underline">azzaudacademy@gmail.com</a>
                </p>
                <p className="italic mt-4">
                  This policy is governed by the laws of the Federal Republic of Nigeria and inspired by the Islamic principles of trust (amanah), justice (ʿadl), and transparency (bayān).
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

export default PrivacyPolicy;
