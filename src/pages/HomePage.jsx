import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider";
import OptionCardWithHover from "../components/OptionCardWithHover";
import ContactSection from "../components/ContactSection";
import Perks from "../components/Perks";
import Page from "../components/ui/Page";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";

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
    <Page offset={false}>
      <BackgroundSlider />
      <Section>
        <Container>
          <OptionCardWithHover />
        </Container>
      </Section>
      <Section id="perks" bg="surface-alt">
        <Container>
          <Perks />
        </Container>
      </Section>
      <Section id="contacto" bg="surface-alt">
        <Container>
          <ContactSection />
        </Container>
      </Section>
    </Page>
  );
}

export default HomePage;
