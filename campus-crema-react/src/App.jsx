import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Carousel from './components/Carousel.jsx';


function App() {
  console.log('App is rendering');
  return (
    <div className="app">
      
      <Navbar />
      <Hero />
      <Carousel />
   
      
    </div>
  );
}

export default App;