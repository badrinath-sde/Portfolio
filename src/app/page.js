import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectThumbnails from "@/components/ProjectThumbnails";
import Tools from "@/components/Tools";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Navbar />
      <main>
        <Hero />
        <ProjectThumbnails />
        <Tools />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

