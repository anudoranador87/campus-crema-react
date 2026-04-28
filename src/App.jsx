import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Carousel from './components/Carousel.jsx';
import Footer from './components/Footer.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import Menu from './components/Menu.jsx';
import SobreNosotros from './components/SobreNosotros.jsx';
import Horarios from "./components/Horarios";



function HomePage() {
  return (
    <>
      <Hero />
      <Carousel />
      <Menu />
      <Horarios />
      <ReservationForm />
    
      <Footer />
    </>
  );
}

function NosotrosPage() {
  return (
    <>
      <SobreNosotros />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
      </Routes>
    </div>
  );
}

export default App;