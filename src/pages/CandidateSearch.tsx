import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API.tsx';
import { Candidate } from '../interfaces/Candidate.interface';

import '../index.css';

const CandidateSearch = () => {

   // State to store the list of candidates fetched from the API
const [candidates, setCandidates] = useState<Candidate[]>([]);

// State to track the index of the currently displayed candidate
const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

 // State to store the details of the currently displayed candidate
const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

// State to manage saved candidates, initialized from localStorage
const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {

const storedCandidates = localStorage.getItem("savedCandidates");
return storedCandidates ? JSON.parse(storedCandidates) : [];
});

useEffect(() => {
  // fetches candidates from the API
  const fetchCandidates = async () => {

    try {
        // awaits API candidate search
        const data: Candidate[] = await searchGithub();
         // Update the candidates state with fetched data
        setCandidates(data);
         // If candidates are available, fetch and set the first candidate's details
          if (data.length > 0) {
            const user = await searchGithubUser(data[0].login);
            setCurrentCandidate(user);
          }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
    fetchCandidates();
  }, []);

  // Saves candidates to localStorage whenever savedCandidates state updates
  useEffect(() => {
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
  }, [savedCandidates]);
  
// Effect to fetch new candidate details when currentCandidateIndex changes
  useEffect(() => {
    const fetchNewCandidate = async () => {
      if (candidates[currentCandidateIndex]) {
        const user = await searchGithubUser(candidates[currentCandidateIndex].login);
        setCurrentCandidate(user);
      } else {
        setCurrentCandidate(null);
      }
    };
    fetchNewCandidate();
  }, [currentCandidateIndex, candidates]);
  


// handles the next candidate once the + or - button is clicked on previous candidate
  const handleSaveCandidate = () => {
    // if it is true that the candidate was saved with the + button
    if (currentCandidate) {
       // Add the current candidate to the saved candidates list
      setSavedCandidates((prev) => [...prev, currentCandidate]);
       // Move to the next candidate
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
      
    }
    };

    // Function to skip the current candidate and move to the next one
    const handleNextCandidate = () => {
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    }

    // Display message if no candidates are available
    if (!candidates.length) {
      return <p>No candidates available to review.</p>;
    }
    
return (
  <div>
    {/* candidate search title */}
    <h1>Candidate Search</h1>

    {currentCandidate ? (
      <div>
        <div className= "candidate-card">
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
        </div>
        {/* + and - buttons */}
        <div className="button-container">
        <button className="minus-button" onClick={handleNextCandidate}>-</button>
        <button className= "plus-button" onClick={handleSaveCandidate}>+</button>
        </div>
        </div>
    ) : (
      // when no more candidates are available this message will be displayed
      <p>No more candidates available</p>
    )}
    
  </div>
  );
};

export default CandidateSearch;
