import React from "react";
import Track from "./Track/Track";

function Tracklist({ tracks, addTrack, removeTrack, isRemoval }) {
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
                removeTrack={removeTrack}
                isRemoval={isRemoval}
                />
            ))}
        </div>
    );
}

export default Tracklist;