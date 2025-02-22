import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface Candidate {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
}

const CandidateSearch = () => {
const [candidates, setCandidates] = useState<any[]>([]);
const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);


useEffect(() => {
  // fetches candidates from the API
  const fetchCandidates = async () => {
    try{
      // awaits API candidate search
      const users = await searchGithub();
      // sets the candidates to the users
      setCandidates(users);
      if (users.length > 0) {
        //  Ensure to use the correct property for username
        loadCandidate(users[0].login);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
  // executes fetchCandidates
    fetchCandidates();
  }, []);

  // loads candidates from the API
  const loadCandidate = async (username: string) => {
    try{
      // awaits searchGithubUser function then sets userData to the result
      const userData = await searchGithubUser(username);
      setCurrentCandidate(userData);
      // error handling if error fetching candidate details
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    }
  };

// handles the next candidate once the + or - button is clicked on previous candidate
  const handleNextCandidate = (save: boolean) => {
    // if save is true and there is a current candidate, add the current candidate to the saved candidates
    if (save && currentCandidate) {
      setSavedCandidates([...savedCandidates, currentCandidate]);
    }
// gets rest of candidates
    const remainingCandidates = candidates.slice(1);
    setCandidates(remainingCandidates);
    //  if there are remaining candidates, load the next candidate
      if (remainingCandidates.length > 0) {
        loadCandidate(remainingCandidates[0].login);
        // displays message when no more candidates are available
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
