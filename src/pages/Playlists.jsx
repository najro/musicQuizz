import React, { useState, useEffect } from "react";
import axios from "axios";
import TrackList from '../components/TrackList';
import BackToDashBoard from '../components/BackToDashBoard'
import PrintButton from '../components/PrintButton'


const Playlists = ({ spotifyToken }) => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");

  const clientId = "e0b134d5131345b2b3ff61c907535647";
  const redirectUri = "http://localhost:5173/musicquizz/";
  //const redirectUri = "https://najro.github.io/musicquizz/";
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const scopes = ["playlist-read-private"];

  useEffect(() => {
  
    if (spotifyToken != "" && playlists.length === 0 ) {
        console.log("Calling playlist with token : ", spotifyToken)

        axios.get("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${spotifyToken}` },
        })
        .then((response) => {
          let playList = response.data.items;

          console.log("playList: XXXXXXXXXXXXXXXX",playList)
          let filteredPlayList = playList.filter(entry => entry !== null);
          
          filteredPlayList.sort((a, b) => a.name.localeCompare(b.name));
          setPlaylists(playList)
        });
      //}
    }
  }, []);

  const fetchTracks = (playlistId) => {
    axios
      .get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      })
      .then((response) => {

        let trackList = response.data.items;

        trackList.sort((a, b) => a.track.name.localeCompare(b.track.name));

        console.log("Reponse: XXXXXXXXXXXXXXXX",response.data.items )
        setTracks(trackList)
      });
  };

  const handleLogin = () => {
    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`;
  };

  console.log("playlists : ", playlists);

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
            <div className="custom-dropdown margin-xl-bottom">
            <select className="styled-select" onChange={(e) => fetchTracks(e.target.value)}>
              {playlists
              .filter((pl) => pl && pl.id && pl.name) // Ensure valid data
              .map((pl) => (
                <option key={pl.id} value={pl.id}>{pl.name}</option>
              ))}
              
            </select>
            </div>
            <TrackList tracks={tracks} />

            {playlists.length === 0 ? <></>:<PrintButton/>}
            
        </div>
        }    
    </>
  );
}

export default Playlists;
