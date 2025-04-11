import { MDBBtn } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDefaultRecipeFilters } from '../service/recipeservice';
import FilterDrawer from './FilterDrawer';
import SortDropdown from './SortDropdown';

const FilterSortButtons = ({ onFilter }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [ingredientNames, setIngredientNames] = useState([]);
    const [allIngredientsNames, setAllIngredientsNames] = useState([]);
    const [createdRange, setCreatedRange] = useState([0, 100]);
    const [createdRangeMin, setCreatedRangeMin] = useState(0);
    const [createdRangeMax, setCreatedRangeMax] = useState(100);
    const [cookingTimeRange, setCookingTimeRange] = useState([0, 100]);
    const [cookingTimeRangeMin, setCookingTimeRangeMin] = useState(0);
    const [cookingTimeRangeMax, setCookingTimeRangeMax] = useState(100);
    const [sort, setSort] = useState('');

    useEffect(() => {
        const fetchDefaultFilters = async () => {
            const defaultFilters = await getDefaultRecipeFilters();
            setAllIngredientsNames(defaultFilters.ingredientNames);
            setCreatedRange([new Date(defaultFilters.createdFrom).getTime(), new Date(defaultFilters.createdTo).getTime()]);
            setCreatedRangeMin(new Date(defaultFilters.createdFrom).getTime());
            setCreatedRangeMax(new Date(defaultFilters.createdTo).getTime());
            setCookingTimeRange([defaultFilters.cookingTimeFrom, defaultFilters.cookingTimeTo]);
            setCookingTimeRangeMin(defaultFilters.cookingTimeFrom);
            setCookingTimeRangeMax(defaultFilters.cookingTimeTo);
        };
        fetchDefaultFilters();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleFilter = (filter) => {
        const updatedFilter = {
            ...filter
        };
        
        onFilter(updatedFilter, sort);
        toggleDrawer();
    };

    const handleSort = (event, sort, order) => {
        event.preventDefault();
        const sortValue = `${sort},${order}`;
        setSort(sortValue);
        
        const filter = {
            createdFrom: new Date(createdRange[0]).toISOString(),
            createdTo: new Date(createdRange[1]).toISOString(),
            ingredientNames,
            cookingTimeFrom: cookingTimeRange[0],
            cookingTimeTo: cookingTimeRange[1]
        };
        
        onFilter(filter, sortValue);
    };

    return (
        <>
            <div className='d-flex justify-content-start mb-4'>
                <MDBBtn color='primary' onClick={toggleDrawer} className='me-2'>
                    <img src='/src/assets/filter.png' alt='Filter' style={{ width: '20px', height: '20px' }} /> Filter
                </MDBBtn>
                <SortDropdown handleSort={handleSort} />
            </div>
            <FilterDrawer
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                ingredientNames={ingredientNames}
                setIngredientNames={setIngredientNames}
                allIngredientsNames={allIngredientsNames}
                createdRange={createdRange}
                setCreatedRange={setCreatedRange}
                createdRangeMin={createdRangeMin}
                createdRangeMax={createdRangeMax}
                cookingTimeRange={cookingTimeRange}
                setCookingTimeRange={setCookingTimeRange}
                cookingTimeRangeMin={cookingTimeRangeMin}
                cookingTimeRangeMax={cookingTimeRangeMax}
                handleFilter={handleFilter}
            />
        </>
    );
};

FilterSortButtons.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default FilterSortButtons;
