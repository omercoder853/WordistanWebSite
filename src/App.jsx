import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './features/home/Home'
import About from './features/about/About'
import Contact from './features/contact/Contaxt'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
