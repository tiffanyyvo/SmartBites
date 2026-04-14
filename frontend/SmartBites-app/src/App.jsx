import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SnapPage from './pages/SnapPage';
import ExplorePage from './pages/ExplorePage';
import MyRecipesPage from './pages/MyRecipesPage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/Profile';
import MakePostPage from './pages/MakePost';
import TestProfilePage from './pages/TestProfile';
import './App.css';

function App() {
  //they start empty
  const [globalRecipes, setGlobalRecipes] = useState([]);

  //function to have AI add to my recipies
  const addRecipe = (newRecipe) => {
    setGlobalRecipes((prevRecipes) => [newRecipe, ...prevRecipes]);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/snap" element={<SnapPage onAddRecipe={addRecipe} />} />

      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/my-recipes" element={<MyRecipesPage recipes={globalRecipes} />} />

      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/makepost" element={<MakePostPage />}/>
      <Route path="/t_profile" element={<TestProfilePage />}/>
    </Routes>
  );
}

export default App;