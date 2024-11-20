import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Playlists from "./pages/Playlists";
import Dashboard from "./pages/Dashboard";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import GameBoardGenerator from './pages/GameBoardGenerator';

function App() {
  //const [count, setCount] = useState(0)
  const [token, setToken] = useState("");

  return (
     <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/playlists" element={<Playlists/>} />
        <Route path="/gameboardgenerator" element={<GameBoardGenerator />}/>
      </Routes>
    </Router>
  )
}

export default App