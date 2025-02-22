import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
const [candidates, setCandidates] = useState([]);
const [currentCandidate, setCurrentCandidate] = useState(null);
const [SavedCandidates, setSavedCandidates] = useState([]);


useEffect(() => {
  // fetches candidates from the API
  const fetchCandidates = async () => {
    try{
      // awaits API candidate search
      const users = await searchGithub();
      // sets the candidates to the users
      setCandidates(users);
      if (users.length > 0) {
        loadCandidate(users[0]);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

    fetchCandidates();
  }, []);
  
  const loadCandidate = async (username) => {
    try{
      const userData = await searchGithubUser(username);
      setCurrentCandidate(userData);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    }
  };

  const handleNextCandidate = (save) => {
    if (save && currentCandidate) {
      setSavedCandidates([...savedCandidates, currentCandidate]);
    }

    const remainingCandidates = candidates.slice(1);
    setCandidates(remainingCandidates);
  
      if (remainingCandidates.length > 0) {
        loadCandidate(remainingCandidates[0]);
      } else {
        setCurrentCandidate(null);
      }
    };

return (
  <div>
    {/* candidate search title */}
    <h1>Candidate Search</h1>

    {currentCandidate ? (
      <div>
        <img src={currentCandidate.avatar_url} alt="avatar" width="100" />
        {/* displays candidate name */}
        <h2>{currentCandidate.name}</h2>
        {/* displays username */}
        <p><strong>Username:</strong> {currentCandidate.login}</p>
        {/* displays location */}
        <p><strong>Location:</strong> {currentCandidate.location || "N/A"}</p>
        {/* displays email */}
        <p><strong>Email:</strong> {currentCandidate.email || "N/A"}</p>
        {/* displays company */}
        <p><strong>Company:</strong> {currentCandidate.company || "N/A"}</p>
        {/* displays candidate url */}
        <p><a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
        {/* + and - buttons */}
        <button onClick={() => handleNextCandidate(true)}>+</button>
        <button onClick={() => handleNextCandidate(false)}>-</button>
      </div>
    ) : (
      // when no more candidates are available this message will be displayed
      <p>No more candidates available</p>
    )}
  </div>
  );
};

export default CandidateSearch;
