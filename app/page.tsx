import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactDashboard from "./components/ImpactDashboard";
import EngineOfImpact from "./components/EngineOfImpact";
import StimulusProgram from "./components/StimulusProgram";
import FounderSection from "./components/FounderSection";
import ApplyGateway from "./components/ApplyGateway";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ImpactDashboard />
      <EngineOfImpact />
      <StimulusProgram />
      <FounderSection />
      <ApplyGateway />
      <Footer />
    </main>
  );
}
