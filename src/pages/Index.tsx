import Layout from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { IntroParagraph } from "@/components/IntroParagraph";
import { HowItWorks } from "@/components/HowItWorks";
import { QuickHighlights } from "@/QuickHighlights";
import { CoursesPreview } from "@/components/CoursesPreview";
import { SpotlightTools } from "@/components/SpotlightTools";
import { LocalLearningBanner } from "@/components/LocalLearningBanner";
import { Marketplace } from "@/components/Marketplace";
import { TeacherCertification } from "@/components/TeacherCertification";
import { Testimonials } from "@/components/Testimonials";
import { ParentsSection } from "@/components/ParentsSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
        <Hero />
        <IntroParagraph />
        <QuickHighlights />
        <HowItWorks />
        <CoursesPreview />
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpotlightTools />
            <LocalLearningBanner />
          </div>
        </section>
        <Marketplace />
        <TeacherCertification />
        <Testimonials />
        <ParentsSection />
        <CTASection />
    </Layout>
  );
};

export default Index;
