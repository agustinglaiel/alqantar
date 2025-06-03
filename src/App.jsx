import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import LocationPage from "./pages/LocationPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/departamentos" element={<GalleryPage />} />
          <Route path="/ubicacion" element={<LocationPage />} />
          <Route path="/avances" element={<GalleryPage />} />
          <Route path="/contacto" element={<HomePage />} />
          <Route path="/masterplan" element={<GalleryPage />} />
          <Route path="/torres" element={<GalleryPage />} />
          <Route path="/amenities" element={<GalleryPage />} />
          <Route path="/360" element={<GalleryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
