import React from "react";
import "./Track.css";

function Track({ name, artist, album, track, addTrack, removeTrack, isRemoval }) {
    console.log("Track recibido:", track);
    const handleClick = () => {
        if (isRemoval) {
            removeTrack(track);
        } else {
            addTrack(track);
        }
    };

    return (
       <div className="Track">
        {track.image && <img src={track.image} alt={album} className="track-image" />}
        <div className="track-info">
            <h3>{name}</h3>
            <p>{artist} | {album}</p>

            {/*Preview de 30s*/}
            {track.preview_url ? (
                <audio controls src={track.preview_url} className="track-preview">
                    Your browser does not support the audio element
                </audio>
            ) : (
                <p className="no-preview">No preview available</p>
            )}
        </div>
        <button onClick={handleClick}>{isRemoval ? "-" : "+"}</button>
       </div>
    );
}

export default Track;