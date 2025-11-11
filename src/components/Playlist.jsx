import React, { useState } from "react";
import Tracklist from "./Tracklist";

function Playlist({ playlistName, setPlaylistName, playlistTracks, removeTrack }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(playlistName);
    
    const handleTitleClick = () => {
        setTempName(playlistName);
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setTempName(e.target.value);
    };

    const handleInputBlur = () => {
        setPlaylistName(tempName || "New Playlist");
        setIsEditing(false);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === "Enter") {
            handleInputBlur();
        }
    };
    
    return (
        <div className="Playlist">
           {isEditing ? ( 
            <input
                autoFocus
                value={tempName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyPress={handleInputKeyPress}
            />
           ) : (
            <h2 onClick={handleTitleClick}>{playlistName}</h2>
           )}
            <Tracklist tracks={playlistTracks} removeTrack={removeTrack} isRemoval={true}/>
            <button>Save to Spotify</button>
        </div>
    );
}

export default Playlist;