import React from "react";
import Tracklist from "./Tracklist";

function SearchResults({ searchResults, addTrack }) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={searchResults} addTrack={addTrack} isRemoval={false} />
        </div>
    );
}

export default SearchResults;