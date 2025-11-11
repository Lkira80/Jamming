import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";
import Spotify from "./utils/Spotify";

function App() {
  /* Hardcoding some example tracks */
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Shape of You", artist: "Ed Sheeran", album: "Divide", uri: "spotify:track:1" },
    { id: 2, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours", uri: "spotify:track:2" },
    { id: 3, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", uri: "spotify:track:3" },
  ]);

  const addTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const handleSearch = async (term) => {
    const results = await Spotify.search(term);
    setSearchResults(results);
  }

  const savePlaylist = async () => {
    const trackURIs = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackURIs);

    console.log("Playlist saved with tracks:", trackURIs);
    alert(`Playlist saved with tracks:\n${trackURIs.join("\n")}`);

    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  }

  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);



  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar onSearch={handleSearch}/>
      <div className="App-content">
        <SearchResults tracks={searchResults} addTrack={addTrack}/>
        <Playlist
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          savePlaylist={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;