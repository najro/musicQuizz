import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Playlists from "./Playlists";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const [token, setToken] = useState("");

  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home setToken={setToken} />} />
        <Route path="/playlists" element={<Playlists token={token} />} />
        {/* <Route path="/generate" element={<Generate />} /> */}
      </Routes>
    </Router>
  )
}

export default App