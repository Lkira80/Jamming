import React from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar />
      <div className="App-content">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;