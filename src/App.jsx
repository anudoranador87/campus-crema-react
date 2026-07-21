import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Carousel from './components/Carousel.jsx';
import Footer from './components/Footer.jsx';
import Menu from './components/Menu.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ToastContainer from './components/Toast.jsx';

// Carga diferida de componentes bajo la línea de flotación y páginas secundarias
const Horarios = lazy(() => import('./components/Horarios'));
const ReservationForm = lazy(() => import('./components/ReservationForm.jsx'));
const TextComponent = lazy(() => import('./components/TextComponent.jsx'));
const SobreNosotros = lazy(() => import('./components/SobreNosotros.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));

function HomePage() {
  return (
    <>
      <Hero />
      <Carousel />
      <Menu />
      <Suspense fallback={<LoadingSpinner />}>
        <Horarios />
        <ReservationForm />
        <TextComponent />
      </Suspense>
      <Footer />
    </>
  );
}

function NosotrosPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SobreNosotros />
    </Suspense>
  );
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;