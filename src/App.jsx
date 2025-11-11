import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";
import Spotify from "./utils/Spotify";


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const handleSearch = async (term) => {
    console.log("Buscando:", term);
    const results = await Spotify.search(term);
    console.log("Resultados:", results);
    setSearchResults(results);
};

    const savePlaylist = async () => {
    const trackURIs = playlistTracks.map((t) => t.uri);
    await Spotify.savePlaylist(playlistName, trackURIs);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="App-content">
        <SearchResults tracks={searchResults} addTrack={addTrack} />
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