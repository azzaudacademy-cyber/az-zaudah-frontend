import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const learningTracks = [
  {
    title: "Quran Recitation",
    description: "Includes recitation practice and personalized mushaf correction to perfect your reading.",
  },
  {
    title: "Tajweed",
    description: "Master the rules of pronunciation and apply them practically for beautiful and accurate Quranic reading.",
  },
  {
    title: "Hifdh (Memorization)",
    description: "Follow a structured memorization plan with a dedicated revision schedule to commit the Qur'an to heart.",
  },
  {
    title: "Arabic",
    description: "Learn the basics of Nahw (grammar) and Sarf (morphology) with a focus on Qur'anic context.",
  },
  {
    title: "Islamic Studies",
    description: "A comprehensive track covering Aqeedah, Fiqh, Tarbiyyah, Hadith, Seerah, Du’a & Dhikr.",
  },
];

export const CoursesPreview = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Our Main Learning Tracks
          </h2>
          <p className="text-lg text-muted-foreground">
            Structured pathways for every learner, from beginner to advanced.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {learningTracks.map((track, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {track.title}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {track.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};