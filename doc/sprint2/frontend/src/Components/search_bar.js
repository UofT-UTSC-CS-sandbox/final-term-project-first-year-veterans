import React, { useState } from 'react';
import { api_search } from './api'; 
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Asset/Css/App.css';
import PostCard from './PostCard';

// These options are going to be fetched from the database
// Later on we need to add an api require for these options
// For now, we just hard code them
const majorOptions = ['Computer Science', 'Mathematics', 'Statistics'];

const categoryOptions = ['Computer Science', 'Mathematics', 'Statistics'];

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [typeOptions, setTypeOptions] = useState(categoryOptions);
    const [type, setType] = useState('Filters');

    const handleAddEvent = (event) => {
        event.preventDefault();
        const search_data = { "query": query, "type": type, "selectedOptions": selectedOptions };
        api_search(search_data, callback);
    };

    const callback = (data) => {
        setResults(data);
    };

    const handleType = (event, newtype) => {
        event.preventDefault();
        const search_data = { "query": query, "type": newtype, "selectedOptions": selectedOptions };
        api_search(search_data, callback);
        setType(newtype);
        newtype === "User" ? setTypeOptions(majorOptions) : setTypeOptions(categoryOptions);
    };

    // General handle filter function
    const handleSelections = (event) => {
        event.preventDefault();
        const search_data = { "query": query, "type": type, "selectedOptions": event.target.value };
        api_search(search_data, callback);
        setSelectedOptions(event.target.value); // This is an async function, so the value is not updated immediately, need to use event.target.value
    };

    const renderResults = () => {
        return (
            <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        {type === 'User' && (
                            <div>
                                <h3>Profile:</h3>
                                <p>Username: {result.username}</p>
                                <p>Email: {result.email}</p>
                                {/* Add other profile fields as needed */}
                            </div>
                        )}
                        {type === 'Post' && (
                            <PostCard key={result.postid} post={result}/>
                        )}
                        {type === 'Project' && (
                            <div>
                                <h3>Project:</h3>
                                <p>Name: {result.name}</p>
                                <p>Description: {result.description}</p>
                                {/* Add other project fields as needed */}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={handleAddEvent}>
                <input
                    type="text"
                    name="query"
                    className="search_input form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="submitbutton" type="submit">Search</button>
            </form>
            <div className="dropdown-container">
                <Dropdown style={{ alignContent: 'center' }}>
                    <Dropdown.Toggle className="dropbtn" variant="success" id="dropdown-basic">
                        {type}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleType(e, 'User')}>User</Dropdown.Item>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleType(e, 'Project')}>Project</Dropdown.Item>
                        <Dropdown.Item className="dropdown-content" onClick={(e) => handleType(e, 'Post')}>Post</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="select-label">{(type === "User") ? "Majors" : "Categories"}</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        multiple
                        value={selectedOptions}
                        onChange={handleSelections}
                        input={<OutlinedInput label={(type === "User") ? "Majors" : "Categories"} />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        <MenuItem disabled>
                            <strong>{(type === "User") ? "Majors" : "Categories"}</strong>
                        </MenuItem>
                        {typeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                <Checkbox checked={selectedOptions.indexOf(option) > -1} />
                                <ListItemText primary={option} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <h2>Search Results:</h2>
                {renderResults()}
            </div>
        </div>
    );
}

export default SearchBar;
