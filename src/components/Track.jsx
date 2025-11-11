import React from "react";

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
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
        <button onClick={handleClick}>{isRemoval ? "-" : "+"}</button>
       </div>
    );
}

export default Track;