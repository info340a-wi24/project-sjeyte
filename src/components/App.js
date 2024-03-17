import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import MoodTracker from './MoodTracker';
import GuidedMeditation from './GuidedMeditation';
import ResourceDirectory from './ResourceDirectory';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Footer from './Footer';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood-tracker" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
        <Route path="/guided-meditation" element={<GuidedMeditation />} />
        <Route path="/resource-directory" element={<ResourceDirectory />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;