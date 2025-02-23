import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API.tsx';
import { Candidate } from '../interfaces/Candidate.interface';

import '../index.css';

const CandidateSearch = () => {
const [candidates, setCandidates] = useState<Candidate[]>([]);
const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

useEffect(() => {
  // fetches candidates from the API
  const fetchCandidates = async () => {
    
      // awaits API candidate search
      const data = await searchGithub();
      // sets the candidates to the users
      setCandidates(data);
  };
  // executes fetchCandidates
    fetchCandidates();
  }, []);


// handles the next candidate once the + or - button is clicked on previous candidate
  const handleSaveCandidate = () => {
    // if save is true and there is a current candidate, add the current candidate to the saved candidates
    const candidate = candidates[currentCandidateIndex];
    console.log('Saved candidate:', candidate);
    setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    };

    const handleNextCandidate = () => {
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    };

    if(!candidates.length) {
      return <p>No candidates available to review.</p>;
    }

    const currentCandidate = candidates[currentCandidateIndex];
    
    
return (
  <div>
    {/* candidate search title */}
    <h1>Candidate Search</h1>

    {currentCandidate ? (
      <div>
        {/* displays user profile photo */}
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
        <button onClick={handleSaveCandidate}>+</button>
        <button onClick={handleNextCandidate}>-</button>
      </div>
    ) : (
      // when no more candidates are available this message will be displayed
      <p>No more candidates available</p>
    )}
  </div>
  );
};

export default CandidateSearch;
