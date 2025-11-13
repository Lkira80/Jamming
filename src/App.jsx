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
  const [lastSearch, setLastSearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  /*Show notifications*/
  const showNotification = (message, duration = 3000) => {
    console.log("Showing notification:", message);
    setNotification(message);
    setTimeout(() => setNotification(""), duration);
  };

  /*Adding tracks to playlist*/
  const addTrack = (track) => {
    if (!playlistTracks.find((t) => t.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  /*Removing tracks from playlist*/
  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  };

  /*Search tracks*/
  const handleSearch = async (term) => {
    if (!term.trim()) {
      showNotification("Searchbar empty.");
      return;
    }

    if (term.toLowerCase() === lastSearch.toLowerCase()) return;
    setLastSearch(term);
    setSearchInput(term);

    /*Saving current search*/
    sessionStorage.setItem("last_search_term", term);


    try {
    const results = await Spotify.search(term);
    setSearchResults(results);
    if (results.length === 0) showNotification("No results found.")
    } catch (error) {
    console.error("Error searching tracks:", error);
    showNotification("Error searching tracks. Try again.");
    }
  };

  /*Save playlist to Spotify*/
  const savePlaylist = async () => {
    if (playlistTracks.length === 0) {
      showNotification("Cannot save playlist: tracklist is empty.");
      return;
    }

    setIsSaving(true); //starts loading

    try {
    const trackURIs = playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackURIs);

    showNotification(`Playlist "${playlistName}" saved!`);

    // Limpiar playlist local
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  } catch (error) {
    console.error("Error saving playlist:", error);
    showNotification("Error saving playlist. Try again.");
  } finally {
    setIsSaving(false); // oculta pantalla de carga
  }
};

  /*Restoring search after Spotify redirect*/
  useEffect(() => {
  const restoreSearch = async () => {
    const lastTerm = sessionStorage.getItem("last_search_term");
    if (lastTerm) {
      // Waiting for token to be ready
      const token = await Spotify.getAccessToken();
      if (token) {
        setSearchInput(lastTerm);
        handleSearch(lastTerm);
        sessionStorage.removeItem("last_search_term");
      }
    }
  };
  restoreSearch();
}, []);

  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar 
      onSearch={handleSearch} 
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      />

      {notification && <div className="notification">{notification}</div>}

      {isSaving && (
      <div className="loading-overlay">
        <div className="loading-message">Saving playlist...</div>
      </div>
    )}

      <div className="App-content">
        <SearchResults 
        tracks={searchResults.filter(
          (track) => !playlistTracks.find((t) => t.id === track.id)
        )} 
        addTrack={addTrack} />
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