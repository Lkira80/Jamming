import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";
import Spotify from "./utils/Spotify";


function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState(
    () => sessionStorage.getItem("playlist_name") || "New Playlist"
  );
  const [playlistTracks, setPlaylistTracks] = useState(
    () => JSON.parse(sessionStorage.getItem("playlist_tracks")) || []
  );
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
      const newTracks = [...playlistTracks, track];
      setPlaylistTracks(newTracks);
      sessionStorage.setItem("playlist_tracks", JSON.stringify(newTracks));
    }
  };

  /*Removing tracks from playlist*/
  const removeTrack = (track) => {
    const newTracks = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(newTracks);
    sessionStorage.setItem("playlist_tracks", JSON.stringify(newTracks));
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
      if (results.length === 0) showNotification("No results found.");
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

    setIsSaving(true);

    try {
      const trackURIs = playlistTracks.map((track) => track.uri);
      await Spotify.savePlaylist(playlistName, trackURIs);

      showNotification(`Playlist "${playlistName}" saved!`);

    // Clear playlist locally
    setPlaylistName("New Playlist");
      setPlaylistTracks([]);
      sessionStorage.removeItem("playlist_tracks");
      sessionStorage.removeItem("playlist_name");
      sessionStorage.removeItem("last_search_term");
    } catch (error) {
      console.error("Error saving playlist:", error);
      showNotification("Error saving playlist. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  /*Restoring search after Spotify redirect*/
  useEffect(() => {
    const restoreState = async () => {
      // Restore playlist and playlist name
      const savedTracks = sessionStorage.getItem("playlist_tracks");
      const savedName = sessionStorage.getItem("playlist_name");
      if (savedTracks) setPlaylistTracks(JSON.parse(savedTracks));
      if (savedName) setPlaylistName(savedName);

      // Restore search term
      const lastTerm = sessionStorage.getItem("last_search_term");
      if (!lastTerm) return;

      // Ensure token is ready
      await Spotify.getAccessToken();

      setSearchInput(lastTerm);
      handleSearch(lastTerm);
    };

    restoreState();
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
          addTrack={addTrack}
        />
        <Playlist
          playlistName={playlistName}
          setPlaylistName={(name) => {
            setPlaylistName(name);
            sessionStorage.setItem("playlist_name", name);
          }}
          playlistTracks={playlistTracks}
          removeTrack={removeTrack}
          savePlaylist={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;