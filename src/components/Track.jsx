import React from "react";

function Track({ name, artist, album, track, addTrack }) {
    return (
       <div className="Track">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
        <button onClick={() => addTrack(track)}>+</button>
       </div>
    );
}

export default Track;