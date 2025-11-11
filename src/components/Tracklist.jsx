import React from "react";
import Track from "./Track";

function Tracklist({ tracks, addTrack }) {
    return (
        <div className="Tracklist">
            {tracks.map((track) => (
                <Track
                key={track.id}
                name={track.name}
                artist={track.artist}
                album={track.album}
                track={track}
                addTrack={addTrack}
                />
            ))}
        </div>
    );
}

export default Tracklist;