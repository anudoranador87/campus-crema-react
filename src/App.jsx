import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Carousel from './components/Carousel.jsx';
import Footer from './components/Footer.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import Menu from './components/Menu.jsx';


function App() {
  console.log('App is rendering');
  return (
    <div className="app">
      
      <Navbar />
      <Hero />
      <Carousel />
      <Menu />
      <ReservationForm />
      <Footer />
      
   
      
    </div>
  );
}

export default App;