# Jamming
Jamming is a web application that allows to search songs in Spotify, create personalized playlists and save them directly on your Spotify account.

---

## Features

- Search songs, albums and artists using the Spotify API.
- Add or removing songs from a playlist.
- Save the playlist directly to Spotify.
- Mantain search and playlist status even after redirects or token updates.
- Loading screen and notifications to improve user experience.

---

## Demo

You can try the app live here: [https://lkira80.github.io/Jamming/]
Note that Spotify API only works if email is added into developer user manager for the app.

## Installation

Clone this repository:

```bash
git clone https://github.com/lkira80/Jamming.git
cd Jamming
npm install
npm run dev
```

---

## Usage

- Enter a song, album or artist in the search bar.
- Click Search or press Enter.
- Add songs to your playlist by clicking Add.
- Rename the playlist if you wish.
- Click Save to Spotify to save the playlist to your Spotify Account.
- Note: If this is your first time using the app, Spotify will request authorization to access your account. The app will retain your search and playlist while you complete authorization process.

---

## Tech

- React
- Vite
- Javascript
- Spotify Web API
- CSS for custom styles

---

# Project structure

Jamming/
├─ public/                 # Static files (favicon, icons)
├─ src/
│  ├─ components/          # React Components: SearchBar, SearchResults, Playlist...
│  ├─ utils/               # Utils: Spotify API helper
│  ├─ App.jsx              # Main App component
│  └─ main.jsx             # Entry point
├─ package.json
├─ vite.config.js
├─ README.md
└─ ...

---

## License

This project is licensed under the MIT License.
