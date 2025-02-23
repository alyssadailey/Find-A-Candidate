import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

import '../index.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  return (
    <div className="table"> 
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar_url} alt="avatar" />
              <h2>{candidate.name}</h2>
              <p><strong>Username:</strong>{candidate.login}</p>
              <p><strong>Location:</strong>{candidate.location}</p>
              <p><strong>Email:</strong>{candidate.email}</p>
              <p><strong>Company:</strong>{candidate.company}</p>
              <a href={candidate.html_url}>GitHub Profile</a>
            </li>
          
          ))}
        </ul>
      ) : (
        <p>No saved candidates yet</p>
      )}
      </div>
  );
};

export default SavedCandidates;
