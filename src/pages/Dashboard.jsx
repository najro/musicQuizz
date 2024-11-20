import React from "react";
import { useNavigate } from 'react-router-dom';

const Dashboard = ({  }) => {

    const navigate = useNavigate(); // Initialize the navigate hook

    return (
                <>
                <div>
                    <h1>Welcome to Music Quizz Generator</h1>
                   
                   <div>
                        <button className="button button-green margin-bottom" onClick={() => navigate('/playlists')}>
                        Generate quizz paper from Spotify
                        </button>
                    </div>
                    <div>
                        <button className="button button-blue" onClick={() => navigate('/gameboardgenerator')}>
                        Generate quizz boards
                        </button>
                    </div>
                </div>
                </>
            );
}

export default Dashboard;
