import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { NotFound } from '../NotFound';
import WelcomePage from '../WelcomePage/WelcomePage';
import React from 'react';
import { Routes, Route } from 'react-router';
import SignIn from '../SignIn';
import Profile from '../Profile/Profile';
import BoardsManagement from '../Boards/BoardsManagement';
import SignUp from '../SignUp';
import Board from '../Board/Board';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import SnackBar from '../SnackBar/SnackBar';
import { StyledEngineProvider } from '@mui/material/styles';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import VideoInstruction from '../VideoInstruction';

function App() {
  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <StyledEngineProvider injectFirst>
            <Header />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/boards" element={<BoardsManagement />} />
              <Route path="/boards/:board" element={<Board />} />
              <Route path="/video-instruction" element={<VideoInstruction />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <SnackBar />
          </StyledEngineProvider>
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default App;
