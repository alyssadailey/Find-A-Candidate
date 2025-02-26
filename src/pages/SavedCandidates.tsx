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

  // function to remove a candidate from the savedCandidates array
const handleRemoveCandidate = (index: number) => {
  const updateCandidates = savedCandidates.filter((_, i) => i !== index);

  // sets new savedCandidates array without the removed candidate(s)
  setSavedCandidates(updateCandidates);
  localStorage.setItem("savedCandidates", JSON.stringify(updateCandidates));
}

  return (
    <div> 
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub Profile</th>
              <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
              <td><img src={candidate.avatar_url} alt="avatar" width="50" /></td>
              <td>{candidate.name || "N/A"}</td>
              <td>{candidate.login}</td>
              <td>{candidate.location || "N/A"}</td>
              <td>{candidate.email || "N/A"}</td>
              <td>{candidate.company || "N/A"}</td>
              <td>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </td>
              <td>
                <button className="minus-button-two" onClick={() => handleRemoveCandidate(index)}>-</button>
              </td>
            </tr>
            ))}
            </tbody>
            
        </table>
      ) : (
        <p>No saved candidates yet</p>
      )}
      </div>
  );
};

export default SavedCandidates;
