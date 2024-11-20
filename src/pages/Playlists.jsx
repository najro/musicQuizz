import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackList from '../components/TrackList';
import BackToDashBoard from '../components/BackToDashBoard'

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");

  const clientId = "e0b134d5131345b2b3ff61c907535647";
  const redirectUri = "http://localhost:5173/playlists";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const scopes = ["playlist-read-private"];

  useEffect(() => {
    // Extract token from the URL hash
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // Remove the # at the start
      console.log("HEllo")
      const accessToken = params.get("access_token");
      if (accessToken) {
        setToken(accessToken);
        //window.location.hash = ""; // Clean up the URL after extracting the token

        axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => setPlaylists(response.data.items));
      }
    }
  }, []);

  const fetchTracks = (playlistId) => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {

        let trackList = response.data.items;

        trackList.sort((a, b) => a.track.name.localeCompare(b.track.name));

       
        console.log("Reponse",response.data.items )
        setTracks(trackList)
      });
  };

  const handleLogin = () => {
    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`;
  };

  return (
    <>
        <BackToDashBoard/>
        <h1>Generate your quizz paper</h1>
        {playlists.length === 0 ? 
          <div>
          
          <button className="button button-green" onClick={handleLogin}>Login with Spotify</button>
          </div> 
          : 
          <div>
            <h2>Select your playlist</h2>
            <div class="custom-dropdown margin-xl-bottom">
            <select className="styled-select" onChange={(e) => fetchTracks(e.target.value)}>
              {playlists.map((pl) => (
                <option key={pl.id} value={pl.id}>{pl.name}</option>
              ))}
            </select>
            </div>
            <TrackList tracks={tracks} />
        </div>
        }
        
    </>
    
  );
}

export default Playlists;
