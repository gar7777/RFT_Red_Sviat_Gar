import Board from 'components/Board';
import Boards from 'components/Boards';
import Footer from 'components/Footer';
import Header from 'components/Header/Header';
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
        <Route path="/boards/:board" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
