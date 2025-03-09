import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import ProfileDropdown from './components/ProfileDropdown';

const TopBar = ({ onSearch }) => {

    return (
        <header className="p-3 bg-dark text-white text-center">
            <SearchBar onSearch={onSearch} />
            <ProfileDropdown />
        </header>
    );
};

TopBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default TopBar;