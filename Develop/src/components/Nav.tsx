import { Link } from "react-router-dom";
import '../index.css';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="nav">
      <nav className="nav-list">
      <Link className="nav-item" to="/">Home</Link>
      <Link className="nav-item" to="/SavedCandidates">Potential Candidates</Link>
      </nav>
    </div>
  )
};

export default Nav;
