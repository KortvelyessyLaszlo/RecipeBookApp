import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBSpinner } from 'mdb-react-ui-kit';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { getRecipes } from './service/recipeservice';
import FilterSortButtons from './components/FilterSortButtons';
import { useNavigate } from 'react-router-dom';
import './styles/RecipeList.css';
import chefIcon from './assets/chef.png';
import clockIcon from './assets/clock.png';

const RecipeList = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortField, setSortField] = useState('rating,desc');
  const [currentFilter, setCurrentFilter] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(null);
  const navigate = useNavigate();

  const fetchRecipes = async (filter = {}, page = 0, size = 20, sort = 'rating,desc', append = false) => {
    try {
      if (loading) return;

      setLoading(true);

      setCurrentPage(page);
      const updatedFilter = { ...filter, searchTerm };

      if (!append) setCurrentFilter(updatedFilter);
      if (size !== pageSize) setPageSize(size);
      if (sort !== sortField) setSortField(sort);

      const response = await getRecipes(updatedFilter, page, size, sort);

      const newData = response.data || [];

      if (response.metadata) {
        const { totalPages } = response.metadata;

        const isLastPage = page >= totalPages - 1;
        const hasReceivedEmptyPage = newData.length === 0;
        const hasReceivedLessThanFullPage = newData.length < size;

        setHasMore(!(isLastPage || hasReceivedEmptyPage || hasReceivedLessThanFullPage));
      } else {
        setHasMore(newData.length === size);
      }

      if (append) {
        setRecipes(prev => [...prev, ...newData]);
      } else {
        setRecipes(newData);
      }
    } catch {
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentFilter, 0, pageSize, sortField, false);
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          fetchRecipes(currentFilter, currentPage + 1, pageSize, sortField, true);
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    const currentLoader = loadingRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [currentPage, hasMore, loading, currentFilter, pageSize, sortField]);

  const handleFilterSort = (filter, sort) => {
    fetchRecipes(filter, 0, pageSize, sort, false);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <MDBContainer fluid className='mt-4 RecipeList'>
      {error && <Alert variant='danger' className='mb-4'>{error}</Alert>}
      <FilterSortButtons onFilter={handleFilterSort} />
      <MDBRow>
        {recipes.map((recipe, index) => (
          <MDBCol
            key={`${recipe.id}-${index}`}
            className='mb-4'
            md='3'
            sm='6'
            xs='12'
          >
            <MDBCard className='text-center card' onClick={() => handleRecipeClick(recipe.id)}>
              {recipe.image && <MDBCardImage src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.title} className='card-image' />}
              <MDBCardBody className='card-body'>
                <MDBCardTitle>{recipe.title}</MDBCardTitle>
                <div className='d-flex flex-wrap justify-content-between'>
                  <div className='d-flex align-items-center mb-1 me-2'>
                    <img src={chefIcon} alt='Chef' className='chef-icon' width={20} height={20} />
                    <span className='card-author'>{recipe.author}</span>
                  </div>
                  <div className='d-flex align-items-center mb-1'>
                    <img src={clockIcon} alt='Clock' className='clock-icon' width={20} height={20} />
                    <span className='card-cooking-time'>{recipe.cookingTime} mins</span>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>

      <div ref={loadingRef} style={{ height: '30px', margin: '20px 0' }}>
        {loading && (
          <div className="text-center">
            <MDBSpinner role='status' />
          </div>
        )}
      </div>
    </MDBContainer>
  );
};

RecipeList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default RecipeList;
