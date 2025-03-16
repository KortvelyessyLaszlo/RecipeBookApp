import { MDBBtn } from 'mdb-react-ui-kit';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { getDefaultRecipeFilters } from '../service/recipeservice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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

    const handleFilter = () => {
        const filter = {
            createdFrom: new Date(createdRange[0]).toISOString(),
            createdTo: new Date(createdRange[1]).toISOString(),
            ingredientNames,
            cookingTimeFrom: cookingTimeRange[0],
            cookingTimeTo: cookingTimeRange[1],
        };
        onFilter(filter);
        toggleDrawer();
    };

    const handleCreatedRangeChange = (_event, newValue, activeThumb) => {
        const minDistance = 24 * 60 * 60 * 1000;

        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], createdRangeMax - minDistance);
                setCreatedRange([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], createdRangeMin + minDistance);
                setCreatedRange([clamped - minDistance, clamped]);
            }
        } else {
            setCreatedRange(newValue);
        }
    };

    const handleCookingTimeRangeChange = (_event, newValue, activeThumb) => {
        const minDistance = 5;

        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], cookingTimeRangeMax - minDistance);
                setCookingTimeRange([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], cookingTimeRangeMin + minDistance);
                setCookingTimeRange([clamped - minDistance, clamped]);
            }
        } else {
            setCookingTimeRange(newValue);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-start mb-4'>
                <MDBBtn color='primary' onClick={toggleDrawer} className='me-2'>
                    <img src='/src/assets/filter.png' alt='Filter' style={{ width: '20px', height: '20px' }} /> Filter
                </MDBBtn>
                <MDBBtn color='secondary'>
                    <img src='/src/assets/sort.png' alt='Sort' style={{ width: '20px', height: '20px' }} /> Sort
                </MDBBtn>
            </div>
            <Offcanvas show={isDrawerOpen} onHide={toggleDrawer} placement='start'>
                <OffcanvasHeader closeButton>
                    <Offcanvas.Title>Filter Options</Offcanvas.Title>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <Autocomplete
                        multiple
                        options={allIngredientsNames}
                        getOptionLabel={(option) => option}
                        value={ingredientNames}
                        onChange={(event, newValue) => setIngredientNames(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label='Ingredient Names' variant='outlined' className='mb-3' />
                        )}
                    />
                    <div className='mb-3'>
                        <label>Creation Date</label>
                        <Slider
                            value={createdRange}
                            onChange={handleCreatedRangeChange}
                            valueLabelDisplay='auto'
                            min={createdRangeMin}
                            max={createdRangeMax}
                            step={24 * 60 * 60 * 1000}
                            disableSwap
                            valueLabelFormat={(value) => new Date(value).toLocaleDateString()}
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Cooking Time (minutes)</label>
                        <Slider
                            value={cookingTimeRange}
                            onChange={handleCookingTimeRangeChange}
                            valueLabelDisplay='auto'
                            min={cookingTimeRangeMin}
                            max={cookingTimeRangeMax}
                            step={1}
                            disableSwap
                        />
                    </div>
                    <MDBBtn color='primary' onClick={handleFilter}>Apply</MDBBtn>
                </OffcanvasBody>
            </Offcanvas>
        </>
    );
};

FilterSortButtons.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default FilterSortButtons;
