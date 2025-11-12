import React from "react";
import "./Track.css";

function Track({ name, artist, album, track, addTrack, removeTrack, isRemoval }) {
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
        </div>
        <button onClick={handleClick}>{isRemoval ? "-" : "+"}</button>
       </div>
    );
}

export default Track;