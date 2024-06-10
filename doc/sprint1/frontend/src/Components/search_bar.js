import React from 'react';
import { useState } from 'react';
import {api_search} from './api'; 
import '../Asset/Css/App.css';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const search_data = { query };

        const callback = (data) => {
            setResults([data]);
        };

        api_search(search_data, callback);
    };

    return (
        <div>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="query"
                    className="search_input form-control" 
                    placeholder="Search..." 
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                ></input>
                <button type="submit">Search</button>
            </form>
            <div>
                <h2>Search Results:</h2>
                <ul>
                {results.map((result, index) => (
                    <li key={index}>{result.username} ({result.email})</li>
                ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;