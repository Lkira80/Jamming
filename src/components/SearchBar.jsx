import React, { useState, useCallback } from "react";

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("");

    /*Memorizes function to avoid repeating innecesarily*/
    const handleTermChange = useCallback((e) => {
        setTerm(e.target.value);
    }, []);

    /*Memorizes the search function*/
    const search = useCallback(() => {
        if (term.trim() !== "") {
      onSearch(term);
    }
  }, [onSearch, term]);

    /*Allows to search on enter key*/
    const handleKeyPress = useCallback((e) => {
        if (e.key === "Enter") search();
       }, [search]
    );

    return (
       <div className="SearchBar">
        <input 
        type="text"
        placeholder="Enter a song, album or artist" 
        value={term}
        onChange={handleTermChange}
        onKeyDown={handleKeyPress}
        />
        <button className="SearchButton" onClick={search}>Search</button>
       </div>
    );
}

export default SearchBar;