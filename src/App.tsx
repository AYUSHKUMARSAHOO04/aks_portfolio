import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { PositioningSection } from './components/sections/PositioningSection';
import { HowIWorkSection } from './components/sections/HowIWorkSection';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection';
import { AnalyticsToolkit } from './components/sections/AnalyticsToolkit';
import { JourneySection } from './components/sections/JourneySection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { MarqueeTicker } from './components/ui/MarqueeTicker';

export function App() {
  const tickerItems = [
    "DATA INTO DECISIONS",
    "PRODUCT ANALYTICS",
    "BEHAVIORAL COHORTS",
    "FUNNEL OPTIMIZATION",
    "LAUNCHIQ.AI",
    "BUSINESS INTELLIGENCE",
    "DECISION SCIENCE",
  ];

  return (
    <div className="min-h-screen bg-canvas text-editorial-white selection:bg-white selection:text-black relative">
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      <main>
        {/* 01: Hero Section with Fluid Portrait */}
        <Hero />

        {/* Dynamic Contrasting Ticker */}
        <MarqueeTicker items={tickerItems} direction="left" />

        {/* 02: Positioning & Philosophy */}
        <PositioningSection />

        {/* 03: How I Work (5-Step Framework) */}
        <HowIWorkSection />

        {/* 04: Selected Work & Interactive Case Studies */}
        <SelectedWorkSection />

        {/* Inverted Ticker Ribbon */}
        <MarqueeTicker items={tickerItems} direction="right" inverted />

        {/* 05: Analytics Toolkit */}
        <AnalyticsToolkit />

        {/* 06: Journey (Experience & Education) */}
        <JourneySection />

        {/* 07: About Me & Secondary Portrait */}
        <AboutSection />

        {/* 08: Resume & Contact Section */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;
