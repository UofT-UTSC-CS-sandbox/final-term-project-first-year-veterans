import React from 'react';
import { useState } from 'react';
import {api_search, api_filter_search} from './api'; 

import Dropdown from 'react-bootstrap/Dropdown';
import '../Asset/Css/App.css';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [type, setType] = useState('Filters');

    const handleSubmit = (event) => {
        event.preventDefault();
        const search_data = {"query": query, "type": type, "filters":filters}
        const callback = (data) => {
            setResults(data);
        };

        api_search(search_data, callback);
    };

    const handleType = (event, newtype) => {
        event.preventDefault();
        const search_data = {"query": query, "type": newtype, "filters":filters}
        const callback = (data) => {
            setType(newtype);
            setResults(data);
        };

        api_search(search_data, callback);
    }
    
    // General handle filter function
    const handleFilter = (event, filter_type) => {
        event.preventDefault();
        const search_data = {"query": query, "type": type, "filters":[filter_type]}
        const callback = (data) => {
            setFilters(filter_type)
            setResults(data);
        };
        api_search(search_data, callback);
    }

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
                <button className = "submitbutton" type="submit">Search</button>
            </form>
            <div className = "dropdown-container">
                <Dropdown>
                    <Dropdown.Toggle className="dropbtn" variant="success" id="dropdown-basic">
                        {type}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleType(e, 'User')}>User</Dropdown.Item>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleType(e, 'Project')}>Project</Dropdown.Item>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleType(e, 'Post')}>Post</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle className="dropbtn" variant="success" id="dropdown-basic">
                        Majors
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleFilter(e, 'Computer Science')}>Computer Science</Dropdown.Item>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleFilter(e, 'Mathematics')}>Mathematics</Dropdown.Item>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleFilter(e, 'Statistics')}>Statistics</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
                <h2>Search Results:</h2>
                <ul>
                    {console.log(results)}
                    {results.map((result, index) => (
                        Object.keys(result).map((key, index2) => ( 
                            <li key={index2}>{key}: {result[key]}</li>
                        ))
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;