import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackList from './TrackList';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");

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

  return (
    <div>
      <h2>Select playlist</h2>
      <select onChange={(e) => fetchTracks(e.target.value)}>
        {playlists.map((pl) => (
          <option key={pl.id} value={pl.id}>{pl.name}</option>
        ))}
      </select>
      <TrackList tracks={tracks} />

    </div>
  );
}

export default Playlists;
