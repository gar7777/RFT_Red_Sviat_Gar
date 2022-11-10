import Boards from 'components/Boards';
import BoardCard from 'components/Boards/BoardCard';
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import WelcomePage from 'components/WelcomePage';
import React from 'react';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:board" element={<BoardCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
