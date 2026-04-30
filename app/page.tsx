import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Stats } from "@/components/sections/Stats";
import { Work } from "@/components/sections/Work";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProjectFit } from "@/components/sections/ProjectFit";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <ProofStrip />
        <Work />
        <Capabilities />
        <Process />
        <About />
        <Testimonials />
        <ProjectFit />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
