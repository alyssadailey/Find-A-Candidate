import { Link } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <Link className="home-nav" to="/">Home</Link>
      <Link className="potential-candidates-nav" to="/SavedCandidates">Potential Candidates</Link>
    </div>
  )
};

export default Nav;
