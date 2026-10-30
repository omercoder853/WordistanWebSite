import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './features/home/Home'
import About from './features/about/About'
import Contact from './features/contact/Contaxt'
import LegalLayout from './features/legal/LegalLayout'
import LegalDocument from './features/legal/LegalDocument'
import ResetPassword from './features/auth/ResetPassword'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './components/NotFoundPage/NotFoundPage'

function AppRoutes() {
  const { pathname } = useLocation()
  const knownPaths = ['/', '/about', '/contact', '/legal', '/legal/kvkk', '/legal/privacy-policy', '/legal/terms-of-service']
  const showSiteNavigation = pathname !== '/auth/reset-password'
    && (knownPaths.includes(pathname) || pathname.startsWith('/legal/'))

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      {showSiteNavigation && <Navbar />}
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
        <Route path='/auth/reset-password' element={<ResetPassword />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      {showSiteNavigation && <Footer />}
      {showSiteNavigation && <ScrollToTopButton />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
