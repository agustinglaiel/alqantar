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
      <section className="py-8 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            Explora Alqantar
          </h2>
          <OptionCardWithHover />
        </div>
      </section>
      <section id="perks" className="py-6 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <Perks />
        </div>
      </section>
      <section id="contacto" className="py-8 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <ContactSection />
        </div>
      </section>
    </div>
  );
}

export default HomePage;