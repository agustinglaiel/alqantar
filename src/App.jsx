import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import LocationPage from "./pages/LocationPage";
import ApartmentsPage from "./pages/ApartmentsPage";

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
          {/* <Route path="/avances" element={<AvancesPage />} /> */}
          <Route path="/contacto" element={<HomePage />} />
          {/* <Route path="/masterplan" element={<MasterplanPage />} /> */}
          <Route path="/amenities" element={<GalleryPage />} />
          {/* <Route path="/360" element={<ThreeSixtyPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
