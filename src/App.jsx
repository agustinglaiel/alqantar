import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/departamentos" element={<GalleryPage />} /> 
          <Route path="/ubicacion" element={<ContactPage />} /> 
          <Route path="/avances" element={<GalleryPage />} /> 
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;