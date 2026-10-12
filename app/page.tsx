import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactDashboard from "./components/ImpactDashboard";
import AidTransparency from "./components/AidTransparency";
import EngineOfImpact from "./components/EngineOfImpact";
import FounderSection from "./components/FounderSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ImpactDashboard />
      <AidTransparency />
      <EngineOfImpact />
      <FounderSection />
      <Footer />
    </main>
  );
}
