import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SelectedProjects from "./components/SelectedProjects";
import About from "./components/About";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#FAF8F5' }}>
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navbar />
        <main className="w-full">
          <Hero />
          <Services />
          <SelectedProjects />
          {/* Full Portfolio Page - Hidden by default, can be shown with routing */}
          {/* <Projects /> */}
          <About />
        </main>
        <Footer />
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
