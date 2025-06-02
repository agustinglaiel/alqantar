// src/pages/HomePage.jsx

import React from "react";
import BackgroundSlider from "../components/BackgroundSlider";
import OptionCardWithHover from "../components/OptionCardWithHover";

function HomePage() {
  return (
    <div>
      <BackgroundSlider />
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            Explora Alqantar
          </h2>
          <OptionCardWithHover />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
