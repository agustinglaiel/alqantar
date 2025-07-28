import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import LocationPage from "./pages/LocationPage";
import ApartmentsPage from "./pages/ApartmentsPage";
import AmenitiesPage from "./pages/AmenitiesPage";
import MasterplanPage from "./pages/MasterplanPage";
import AvancesPage from "./pages/AvancesPage";
import ThreeSixtyPage from "./pages/ThreeSixtyPage";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/departamentos" element={<ApartmentsPage />} />
          <Route path="/ubicacion" element={<LocationPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/avances" element={<AvancesPage />} />
          <Route path="/contacto" element={<HomePage />} />
          <Route path="/masterplan" element={<MasterplanPage />} />
          <Route path="/360" element={<ThreeSixtyPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
