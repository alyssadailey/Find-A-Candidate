import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API.tsx';
import { Candidate } from '../interfaces/Candidate.interface';

import '../index.css';

const CandidateSearch = () => {
const [candidates, setCandidates] = useState<Candidate[]>([]);
const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {

const storedCandidates = localStorage.getItem("savedCandidates");
return storedCandidates? JSON.parse(storedCandidates) : [];
});

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

  // Savse candidates to localStorage whenever savedCandidates updates
  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);


// handles the next candidate once the + or - button is clicked on previous candidate
  const handleSaveCandidate = () => {

    const candidate = candidates[currentCandidateIndex];
    // if it is true that the candidate was saved with the + button
    if (candidate) {
      // adds the candidate to the saved candidates
      setSavedCandidates((prev) => [...prev, candidate]);
      // sets the current candidate index to the next candidate
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
      console.log('Saved candidate:', candidate);
    }
    };

    const handleNextCandidate = () => {
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    }

    if (!candidates.length) {
      return <p>No candidates available to review.</p>;
    }

    const currentCandidate = candidates[currentCandidateIndex];
    
    
return (
  <div>
    {/* candidate search title */}
    <h1>Candidate Search</h1>

    {currentCandidate ? (
      <div>
      <body>
        {/* displays user profile photo */}
        <img src={currentCandidate.avatar_url} alt="avatar" width="300" />
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
        
        </body>
        {/* + and - buttons */}
        <button className= "plus-button" onClick={handleSaveCandidate}>+</button>
        <button className="minus-button" onClick={handleNextCandidate}>-</button>
        </div>
    ) : (
      // when no more candidates are available this message will be displayed
      <p>No more candidates available</p>
    )}
  </div>
  );
};

export default CandidateSearch;
