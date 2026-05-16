import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import WhatIsACircle from "@/components/home/WhatIsACircle";
import WhatYouMakePossible from "@/components/home/WhatYouMakePossible";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactSection from "@/components/home/ImpactSection";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsACircle />
        <WhatYouMakePossible />
        <HowItWorks />
        <ImpactSection />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
