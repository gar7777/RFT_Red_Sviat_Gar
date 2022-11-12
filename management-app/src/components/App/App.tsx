import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NotFound from '../NotFound';
import WelcomePage from '../WelcomePage';
import React from 'react';
import { Routes, Route } from 'react-router';
import SignIn from '../SignIn';
import Profile from '../Profile';
import BoardsManagement from '../Boards/BoardsManagement';
import SignUp from '../SignUp';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boards" element={<BoardsManagement />} />
        <Route path="/boards/board" element={<Board />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
