import { useState } from 'react';
import RecipeList from './RecipeList';
import TopBar from './TopBar';

function Home() {
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

export default Home;
