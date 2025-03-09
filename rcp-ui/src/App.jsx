import { useState } from 'react';
import './App.css';
import RecipeList from './RecipeList';
import TopBar from './TopBar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <TopBar onSearch={handleSearch} />
      <RecipeList searchTerm={searchTerm} />
    </>
  );
}

export default App;
