import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // or Home.jsx, depending on what you name it
import SnapPage from './pages/SnapPage';
import ExplorePage from './pages/ExplorePage';
import MyRecipesPage from './pages/MyRecipesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/snap" element={<SnapPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/my-recipes" element={<MyRecipesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;