import { useState, useEffect } from 'react'
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Playlists from "./pages/Playlists";
import Dashboard from "./pages/Dashboard";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import GameBoardGenerator from './pages/GameBoardGenerator';

function App() {
  //const [count, setCount] = useState(0)
  const [token, setToken] = useState("");

  //const navigate = useNavigate();

  function NotFound() {
    return <h1>404 - Page Not Found</h1>;
  }

  useEffect(() => {
    // Check if access_token exists in the URL hash
    const hash = window.location.hash;
    if (hash.includes('access_token')) {

      console.log("In if");

      //setToken("secret")

      // Extract the access_token from the hash
      const params = new URLSearchParams(hash.substring(1)); // Remove the `#`
      const accessToken = params.get('access_token');
      if (accessToken) {
        console.log("AccessToken");
        
        window.location.hash = '#/playlists';
        setToken(accessToken);
        // Save the token to localStorage or sessionStorage
        //localStorage.setItem('access_token', accessToken);

        // Redirect to the dashboard or desired route
        //navigate('/playlists'); // Adjust the route as needed

        // Clear the hash from the URL (optional)
        
      }else{
        console.log("No AccessToken");
        //window.location.hash = ""
      }
    }else{
      console.log("In else");
      //window.location.hash = ""
    }
  }, []);



  return (
     <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/playlists" element={<Playlists spotifyToken={token} />} />
        <Route path="/gameboardgenerator" element={<GameBoardGenerator />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </HashRouter>
  )
}

export default App