import React from 'react';

const TrackList = ({ tracks }) => {
  // Calculate the midpoint of the tracks array
  const midpoint = Math.ceil(tracks.length / 2);

  // Split the tracks array into two parts
  const firstHalf = tracks.slice(0, midpoint);
  const secondHalf = tracks.slice(midpoint);

  return (
    <div className="split-list-container">
      <div className="split-list-left">
        <ul>
          {firstHalf.map((track, idx) => (
            <li key={idx}>
              {track.track.name} ({track.track.artists.map(artist => artist.name).join(", ")}) - {idx + 1}
            </li>
          ))}
        </ul>
      </div>
      <div className="split-list-right">
        <ul>
          {secondHalf.map((track, idx) => (
            <li key={idx}>
              {track.track.name} ({track.track.artists.map(artist => artist.name).join(", ")}) - {midpoint + idx + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackList;