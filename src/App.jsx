import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './features/home/Home'
import About from './features/about/About'
import Contact from './features/contact/Contaxt'
import LegalLayout from './features/legal/LegalLayout'
import LegalDocument from './features/legal/LegalDocument'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-right' autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        
        {/* ── Hukuki / Yasal Rotalar (Legal Section) ── */}
        <Route path='/legal' element={<LegalLayout />}>
          <Route index element={<Navigate to="kvkk" replace />} />
          <Route path="kvkk" element={<LegalDocument docKey="kvkk" />} />
          <Route path="privacy-policy" element={<LegalDocument docKey="privacy_policy" />} />
          <Route path="terms-of-service" element={<LegalDocument docKey="terms_of_service" />} />
          <Route path="*" element={<Navigate to="kvkk" replace />} />
        </Route>
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </BrowserRouter>
  )
}

export default App
