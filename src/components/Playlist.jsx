import React from "react";
import Tracklist from "./Tracklist";

function Playlist({ playlistName, setPlaylistName, playlistTracks, removeTrack }) {
    return (
        <div className="Playlist">
            <input
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <Tracklist tracks={playlistTracks} removeTrack={removeTrack} isRemoval={true}/>
            <button>Save to Spotify</button>
        </div>
    );
}

export default Playlist;