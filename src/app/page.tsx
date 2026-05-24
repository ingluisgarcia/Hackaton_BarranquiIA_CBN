import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { HashScrollRestore } from "@/components/HashScrollRestore";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <HashScrollRestore />
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
