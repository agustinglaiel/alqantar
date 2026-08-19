import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider";
import OptionCardWithHover from "../components/OptionCardWithHover";
import ContactSection from "../components/ContactSection";
import Perks from "../components/Perks";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <BackgroundSlider />
      <section className="py-6">
        <div className="mx-auto max-w-screen-xl px-4 pt-8">
          <OptionCardWithHover />
        </div>
      </section>
      <section id="perks" className="bg-gray-100 py-6">
        <div className="mx-auto max-w-screen-xl px-4">
          <Perks />
        </div>
      </section>
      <section id="contacto" className="bg-gray-100 py-8">
        <div className="mx-auto max-w-screen-xl px-4">
          <ContactSection />
        </div>
      </section>
    </div>
  );
}

export default HomePage;