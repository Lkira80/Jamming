import React from "react";
import Tracklist from "./Tracklist";

function Playlist() {
    return (
        <div className="Playlist">
            <h2>New Playlist</h2>
            <Tracklist />
            <button>Save to Spotify</button>
        </div>
    );
}

export default Playlist;