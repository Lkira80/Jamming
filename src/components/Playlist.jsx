import React from "react";
import Tracklist from "./Tracklist";

function Playlist({ playlistName, setPlaylistName, playlistTracks }) {
    return (
        <div className="Playlist">
            <input
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <Tracklist tracks={playlistTracks} />
            <button>Save to Spotify</button>
        </div>
    );
}

export default Playlist;