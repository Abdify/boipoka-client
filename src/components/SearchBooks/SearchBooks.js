import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const SearchBooks = () => {
    const [query, setQuery] = useState('');
    return (
        <div>
            <form className="search-form">
                <input placeholder="Search Book" onChange={handleQuery} />
                <button>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </div>
    );

    function handleQuery(e){
        console.log(e.target.value)
    }
};

export default SearchBooks;