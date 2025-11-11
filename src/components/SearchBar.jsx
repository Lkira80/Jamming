import React, { useState } from "react";

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("");

    const handleTermChange = (e) => {
        setTerm(e.target.value);
    };

    const search = () => {
        onSearch(term);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") search();
    };

    return (
       <div className="SearchBar">
        <input 
        placeholder="Enter a song, album or artist" 
        value={term}
        onChange={handleTermChange}
        onKeyDown={handleKeyPress}
        />
        <button onClick={search}>Search</button>
       </div>
    );
}

export default SearchBar;