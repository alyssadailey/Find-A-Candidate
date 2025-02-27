import { Link } from "react-router-dom";
import '../index.css';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    // nav bar
    <div className="nav">
      <nav className="nav-link">
        {/* Home link- will link to CandidateSearch */}
      <Link className="nav-item" to="/">Home</Link>
      {/* Potential Candidates link- will bring you to potential candidates  */}
      <Link className="nav-item" to="/SavedCandidates">Potential Candidates</Link>
      </nav>
    </div>
  )
};

export default Nav;
