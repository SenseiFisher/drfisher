import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Cases from './pages/Cases';
import CaseDetail from './pages/CaseDetail';
import Equipment from './pages/Equipment';
import Referral from './pages/Referral';
import Accessibility from './pages/Accessibility';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <a href="#main-content" className="skip-link">לדלג לתוכן הראשי</a>
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:caseId" element={<CaseDetail />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/accessibility" element={<Accessibility />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

