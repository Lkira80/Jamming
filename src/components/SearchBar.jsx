import React from "react";

function SearchBar() {
    return (
       <div className="SearchBar">
        <input placeholder="Enter a song, album r artist" />
        <button>Search</button>
       </div>
    );
}

export default SearchBar;