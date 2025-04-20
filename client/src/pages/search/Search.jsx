import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchResults from '../../components/Common/SearchResults';
import Modal from '../../components/Common/Modal'; // Import the Modal component

const SearchPage = ({ searchResults, searchQuery }) => {
  const [sortOption, setSortOption] = useState('Namn');
  const [sortOrder, setSortOrder] = useState('asc'); // Add sortOrder state
  const [filteredResults, setFilteredResults] = useState(searchResults);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(''); // Add filterValue state

  useEffect(() => {
    setFilteredResults(searchResults);
  }, [searchResults]);

  const handleSortChange = (sortValue) => {
    if (sortOption === sortValue) {
      // Toggle sort order if the same sort option is selected
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(sortValue);
      setSortOrder('asc'); // Reset to ascending order for new sort option
    }
    const sortKey = sortValue === 'Namn' ? 'name' : sortValue === 'Pris' ? 'price' : sortValue === 'Datum Publiserat' ? 'date' : '';
    sortResults(sortKey, sortOrder === 'asc' ? 'desc' : 'asc'); // Pass the new sort order
    setIsSortModalOpen(false); // Close the modal after selecting an option
  };

  const sortResults = (sortKey, order) => {
    const sortedResults = [...filteredResults].sort((a, b) => {
      if (sortKey === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortKey === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortKey === 'date') {
        return order === 'asc' ? Date.parse(a.dateAdded) - Date.parse(b.dateAdded) : Date.parse(b.dateAdded) - Date.parse(a.dateAdded);
      }
      return 0;
    });
    setFilteredResults(sortedResults);
  };

  const handleFilterChange = (filterValue) => {
    setFilterValue(filterValue); // Update filterValue state
    filterResults(filterValue);
    setIsFilterModalOpen(false); // Close the modal after selecting an option
  };

  const filterResults = (filterValue) => {
    const filtered = searchResults.filter((item) => {
      // Filtering logic based on category
      return filterValue === '' || item.category === filterValue;
    });
    setFilteredResults(filtered);
  };

  return (
    <section className="mt-8 min-h-[72vh] w-full"> {/* Set min-height to 72vh */}
      <div className="mx-auto w-full"> {/* Ensure full width */}
        <h2 className="px-6 text-2xl font-bold mb-4">Search Results</h2>
        {searchQuery && (
          <p className="px-6 text-5xl font-bold mb-4">&quot;<span className="font-semibold">{searchQuery}</span>&quot;</p>
        )}
        <div className="flex justify-between items-center mb-4 px-6">
          <div>
            <label htmlFor="sort" className="text-lg mr-2 cursor-pointer underline" onClick={() => setIsSortModalOpen(true)}>
              Sortera efter
            </label>
            <span>{sortOption} ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})</span>
          </div>
          <div>
            <label htmlFor="filter" className="text-lg mr-2 cursor-pointer underline" onClick={() => setIsFilterModalOpen(true)}>
              Filter
            </label>
            <span>{filterValue}</span>
          </div>
        </div>
        <SearchResults results={filteredResults} searchPerformed={true} />
        {/* Include the existing Accordion component to push the footer down */}
      </div>

      {/* Sort Modal */}
      <Modal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Sortera efter</h2>
        <ul>
          <li className="mb-2 cursor-pointer" onClick={() => handleSortChange('Namn')}>Namn</li>
          <li className="mb-2 cursor-pointer" onClick={() => handleSortChange('Pris')}>Pris</li>
          <li className="mb-2 cursor-pointer" onClick={() => handleSortChange('Datum Publiserat')}>Datum Publiserat</li>
        </ul>
      </Modal>

      {/* Filter Modal */}
      <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Filter</h2>
        <ul>
          <li className="mb-2 cursor-pointer" onClick={() => handleFilterChange('')}>All</li>
          <li className="mb-2 cursor-pointer" onClick={() => handleFilterChange('mobler')}>Mobler</li>
          <li className="mb-2 cursor-pointer" onClick={() => handleFilterChange('forvaring')}>Forvaring</li>
          <li className="mb-2 cursor-pointer" onClick={() => handleFilterChange('textil')}>Textil</li>
          <li className="mb-2 cursor-pointer" onClick={() => handleFilterChange('detaljer')}>Detaljer</li>
        </ul>
      </Modal>
    </section>
  );
};

SearchPage.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      urlSlug: PropTypes.string.isRequired,
      dateAdded: PropTypes.string.isRequired, // Ensure dateAdded is included in the prop types
      category: PropTypes.string.isRequired, // Ensure category is included in the prop types
    })
  ).isRequired,
  searchQuery: PropTypes.string, // Add searchQuery prop
  handleSearch: PropTypes.func.isRequired, // Add handleSearch prop
};

export default SearchPage;