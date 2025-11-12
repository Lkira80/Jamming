import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";
import Spotify from "./utils/Spotify";


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [notification, setNotification] = useState("");

  const showNotification = (message, duration = 3000) => {
    console.log("Showing notification:", message);
    setNotification(message);
    setTimeout(() => setNotification(""), duration);
  };

  const addTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  const handleSearch = async (term) => {
    if (!term.trim()) {
      showNotification("Searchbar empty.");
      return;
    }

    if (term.toLowerCase() === lastSearch.toLowerCase()) {
      return;
    }

    setLastSearch(term);

    const results = await Spotify.search(term);
    setSearchResults(results);
    if (results.length === 0) showNotification("No results found.")
};

  const savePlaylist = async () => {
    if (playlistTracks.length === 0) {
      showNotification("Cannot save playlist: tracklist is empty.");
      return;
    }
    const trackURIs = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackURIs);

    showNotification(`Playlist ${playlistName} saved as ${trackURIs.length} tracks!`);

    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  }

  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar onSearch={handleSearch} />
      {notification && <div className="notification">{notification}</div>}
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