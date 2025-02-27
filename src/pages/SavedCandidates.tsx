import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

import '../index.css';

const SavedCandidates = () => {
  // State to store saved candidates retrieved from localStorage
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
     // Retrieve saved candidates from localStorage on component mount
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // function to remove a candidate from the savedCandidates array
const handleRemoveCandidate = (index: number) => {
  // Filter out the candidate at the given index
  const updateCandidates = savedCandidates.filter((_, i) => i !== index);

  // sets new savedCandidates array without the removed candidate(s)
  setSavedCandidates(updateCandidates);

   // Save the updated list back to localStorage
  localStorage.setItem("savedCandidates", JSON.stringify(updateCandidates));
}

  return (
    <div> 
      {/* page title */}
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        // table to display saved candidates
        // displays avatar, name, username, location, email, company, GitHub profile, and remove button categories
        
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
                {/* Display candidate avatar */}
              <td><img src={candidate.avatar_url} alt="avatar" width="50" /></td>
              {/* Display candidate name or N/A if unavailable */}
              <td>{candidate.name || "N/A"}</td>
               {/* Display candidate GitHub username */}
              <td>{candidate.login}</td>
               {/* Display candidate location or N/A if unavailable */}
              <td>{candidate.location || "N/A"}</td>
              {/* Display candidate email or N/A if unavailable */}
              <td>{candidate.email || "N/A"}</td>
              {/* Display candidate company or N/A if unavailable */}
              <td>{candidate.company || "N/A"}</td>
               {/* Link to candidate's GitHub profile */}
              <td>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </td>
              {/* Remove button */}
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
