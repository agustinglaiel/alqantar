import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const ApartmentsPage = lazy(() => import("./pages/ApartmentsPage"));
const AmenitiesPage = lazy(() => import("./pages/AmenitiesPage"));
const MasterplanPage = lazy(() => import("./pages/MasterplanPage"));
const AvancesPage = lazy(() => import("./pages/AvancesPage"));
const ThreeSixtyPage = lazy(() => import("./pages/ThreeSixtyPage"));
const ApartmentDetailPage = lazy(() => import("./pages/ApartmentDetailPage"));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/departamentos" element={<ApartmentsPage />} />
          <Route path="/ficha/:tower/:typology" element={<ApartmentDetailPage />} />
          <Route path="/ubicacion" element={<LocationPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/avances" element={<AvancesPage />} />
          <Route path="/contacto" element={<HomePage />} />
          <Route path="/masterplan" element={<MasterplanPage />} />
          <Route path="/360" element={<ThreeSixtyPage />} />
        </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
