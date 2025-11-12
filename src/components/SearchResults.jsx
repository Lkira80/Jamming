import React from "react";
import Tracklist from "./Tracklist";

function SearchResults({ tracks, addTrack }) {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist tracks={tracks} addTrack={addTrack} isRemoval={false} />
        </div>
    );
}

export default SearchResults;