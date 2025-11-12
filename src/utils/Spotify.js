const clientId = "599c99487c2d4ac78eaf8d0cbeed6482";
const redirectUri = "https://lkira80.github.io/Jamming/";
const scope = "playlist-modify-public";
let accessToken;

function generateRandomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hash);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    /*Searching if theres a valid token in memory*/
    const storedToken = localStorage.getItem("spotify_access_token");
    const storedExpiry = localStorage.getItem("spotify_token_expiry");
    if (storedToken && Date.now() < storedExpiry) {
      accessToken = storedToken;
      return accessToken;
    }
    
    /*Obtaining code from URL*/
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    /*If there is a code in URL, try to use*/
    if (code) {
      const verifier = localStorage.getItem("spotify_code_verifier");
      if (!verifier) {
        console.warn("No se encontró code_verifier. Reiniciando flujo de autorización...");
        window.history.replaceState({}, document.title, redirectUri);
        return this.getAccessToken();
      }

      /*Changing code for access_token*/
      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      });

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const data = await response.json();

      if (data.access_token) {
        accessToken = data.access_token;
        localStorage.setItem("spotify_access_token", accessToken);
        localStorage.setItem("spotify_token_expiry", Date.now() + data.expires_in * 1000);
        /*Cleaning URL*/
        window.history.replaceState({}, document.title, redirectUri);
        return accessToken;
      } else {
        console.error("Error al obtener el token:", data);
        window.history.replaceState({}, document.title, redirectUri);
        return this.getAccessToken();
      }
    }

  /*If theres no code, generate a new one*/
    let verifier = localStorage.getItem("spotify_code_verifier");
    if (!verifier) {
      verifier = generateRandomString(128);
      localStorage.setItem("spotify_code_verifier", verifier);
    }

    const challenge = await sha256(verifier);
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.append("client_id", clientId);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("redirect_uri", redirectUri);
    authUrl.searchParams.append("scope", scope);
    authUrl.searchParams.append("code_challenge_method", "S256");
    authUrl.searchParams.append("code_challenge", challenge);

    window.location = authUrl.toString();
  },

  async search(term) {
    const token = await this.getAccessToken();
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
      image: track.album.images && track.album.images.length
       ? track.album.images[track.album.images.length - 1].url
       : "",
    }));
  },

  async savePlaylist(name, uris) {
    if (!name || !uris.length) return;
    const token = await this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    /*Check if token is still active*/
    const me = await fetch("https://api.spotify.com/v1/me", { headers });
    if (!me.ok) {
      alert("Tu sesión ha expirado o la app ha sido revocada. Por favor vuelve a autorizar.");
      // Clearing Token and forcing Login
      accessToken = null;
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_token_expiry");
      window.location.reload(); // Forces to get into AccessToken
      return;
  }

    const userData = await me.json();
    const user = userData.id;

    const playlistRes = await fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name }),
    });
    const playlist = await playlistRes.json();

    await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
      method: "POST",
      headers,
      body: JSON.stringify({ uris }),
    });

    alert(`Playlist "${name}" saved to your Spotify!`);
  },
};

export default Spotify;