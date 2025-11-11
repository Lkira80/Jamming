const clientId = "599c99487c2d4ac78eaf8d0cbeed6482";
const redirectUri = "https://lkira80.github.io/Jamming/";
const scope = "playlist-modify-public";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const hash = window.location.hash;
    const match = hash.match(/access_token=([^&]*)/);
    const expires = hash.match(/expires_in=([^&]*)/);

    if (match && expires) {
      accessToken = match[1];
      const expiresIn = Number(expires[1]) * 1000;

  
      setTimeout(() => (accessToken = ""), expiresIn);

      window.history.pushState({}, null, redirectUri);

      return accessToken;
    } else {
      const authUrl = new URL("https://accounts.spotify.com/authorize");
      authUrl.searchParams.append("client_id", clientId);
      authUrl.searchParams.append("response_type", "token");
      authUrl.searchParams.append("redirect_uri", redirectUri);
      authUrl.searchParams.append("scope", scope);

      window.location = authUrl.toString();
    }
  },

  async search(term) {
    const token = Spotify.getAccessToken();
    if (!token) return [];

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) return [];

    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async savePlaylist(name, uris) {
    if (!name || !uris.length) return;

    const token = Spotify.getAccessToken();
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    const meResponse = await fetch("https://api.spotify.com/v1/me", { headers });
    const user = await meResponse.json();

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name }),
    });
    const playlist = await playlistResponse.json();

    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: "POST",
      headers,
      body: JSON.stringify({ uris }),
    });

    alert(`Playlist "${name}" saved to your Spotify!`);
  },
};

export default Spotify;