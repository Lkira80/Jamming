import React from "react";
import Track from "./Track";

function Tracklist({ tracks }) {
    return (
        <div className="Tracklist">
            {tracks.map((track) => (
                <Track
                key={track.id}
                name={track.name}
                artist={track.artist}
                album={track.album}
                />
            ))}
        </div>
    );
}

export default Tracklist;