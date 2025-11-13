import React, { useState } from "react";

function SearchBar({ onSearch, searchInput, setSearchInput }) {
    const [term, setTerm] = useState("");

    const handleTermChange = (e) => {
        setSearchInput(e.target.value);
    };

    const search = () => {
        if (searchInput.trim () === "") return;
        onSearch(searchInput);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") search();
    };

    return (
       <div className="SearchBar">
        <input 
        placeholder="Enter a song, album or artist" 
        value={searchInput}
        onChange={handleTermChange}
        onKeyDown={handleKeyPress}
        />
        <button onClick={search} disabled={searchInput.trim() === ""}>Search</button>
       </div>
    );
}

export default SearchBar;