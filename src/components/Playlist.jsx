import React, { useState, useCallback } from "react";
import Tracklist from "./Tracklist";

function Playlist({ playlistName, setPlaylistName, playlistTracks, removeTrack, savePlaylist }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(playlistName || "New Playlist");
    
    /*Handles edition mode on title*/
    const handleTitleClick = useCallback(() => {
        setTempName(playlistName);
        setIsEditing(true);
    }, [playlistName]);

    /*Updates name while editing*/
    const handleInputChange = useCallback((e) => {
        setTempName(e.target.value);
    }, []);

    /*Saves name when exiting input or on enter*/
    const commitNameChange = useCallback(() => {
        const finalName = tempName.trim() || "New Playlist";
        setPlaylistName(finalName);
        setIsEditing(false);
    }, [tempName, setPlaylistName]);

    const handleInputKeyPress = useCallback((e) => {
        if (e.key === "Enter") {
            commitNameChange();
        }
     }, [commitNameChange]
   );
    
    return (
        <div className="Playlist">
           {isEditing ? ( 
            <input
                autoFocus
                value={tempName}
                onChange={handleInputChange}
                onBlur={commitNameChange}
                onKeyDown={handleInputKeyPress}
                className="Playlist-input"
            />
           ) : (
            <h2 onClick={handleTitleClick} className="Playlist-title">{playlistName || "New Playlist"}</h2>
           )}
            <Tracklist tracks={playlistTracks} removeTrack={removeTrack} isRemoval={true}/>
            <button onClick={savePlaylist}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;