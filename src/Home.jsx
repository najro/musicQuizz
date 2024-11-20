import React from "react";

const clientId = "e0b134d5131345b2b3ff61c907535647";
const redirectUri = "http://localhost:5173/playlists";
const authEndpoint = "https://accounts.spotify.com/authorize";
const scopes = ["playlist-read-private"];

const Home = ({ setToken }) => {
  const handleLogin = () => {
    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`;
  };

  return (
    <>
    <div>
      <h1>Welcome to Music Quizz Generator</h1>
      <button className="spotify-login" onClick={handleLogin}>Login with Spotify</button>
    </div>
    </>
  );
}

export default Home;
