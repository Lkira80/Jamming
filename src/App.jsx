import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";

function App() {
  /* Hardcoding some example tracks */
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Shape of You", artist: "Ed Sheeran", album: "Divide" },
    { id: 2, name: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
    { id: 3, name: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  ]);

  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar />
      <div className="App-content">
        <SearchResults tracks={searchResults} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;