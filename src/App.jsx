import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import DarkModeToggle from './components/DarkModeToggle';
import './App.css';

function Home() {
  return (
    <section id="center" className="glass">
      <Hero />
      <p>Edit src/App.jsx and save to test HMR</p>
    </section>
  );
}

function Docs() {
  return (
    <section id="next-steps" className="glass">
      <h2>Documentation</h2>
      <p>Your questions, answered</p>
    </section>
  );
}

function Social() {
  return (
    <section id="social" className="glass">
      <h2>Connect with us</h2>
      <p>Join the Vite community</p>
    </section>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div data-theme={darkMode ? 'dark' : 'light'} className="theme-wrapper">
      <Router>
        <Header />
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/social" element={<Social />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
