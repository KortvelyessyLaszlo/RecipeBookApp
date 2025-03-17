import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { MDBBtn } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';

const FilterDrawer = ({
    isDrawerOpen,
    toggleDrawer,
    ingredientNames,
    setIngredientNames,
    allIngredientsNames,
    createdRange,
    setCreatedRange,
    createdRangeMin,
    createdRangeMax,
    cookingTimeRange,
    setCookingTimeRange,
    cookingTimeRangeMin,
    cookingTimeRangeMax,
    handleFilter,
}) => {
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

    const applyFilter = () => {
        const filter = {
            createdFrom: new Date(createdRange[0]).toISOString(),
            createdTo: new Date(createdRange[1]).toISOString(),
            ingredientNames,
            cookingTimeFrom: cookingTimeRange[0],
            cookingTimeTo: cookingTimeRange[1],
        };
        handleFilter(filter);
    };

    return (
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
                        <TextField {...params} label='Ingredients' variant='outlined' className='mb-3' />
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
                <MDBBtn color='primary' onClick={applyFilter}>Apply</MDBBtn>
            </OffcanvasBody>
        </Offcanvas>
    );
};

FilterDrawer.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    ingredientNames: PropTypes.array.isRequired,
    setIngredientNames: PropTypes.func.isRequired,
    allIngredientsNames: PropTypes.array.isRequired,
    createdRange: PropTypes.array.isRequired,
    setCreatedRange: PropTypes.func.isRequired,
    createdRangeMin: PropTypes.number.isRequired,
    createdRangeMax: PropTypes.number.isRequired,
    cookingTimeRange: PropTypes.array.isRequired,
    setCookingTimeRange: PropTypes.func.isRequired,
    cookingTimeRangeMin: PropTypes.number.isRequired,
    cookingTimeRangeMax: PropTypes.number.isRequired,
    handleFilter: PropTypes.func.isRequired,
};

export default FilterDrawer;
