import { NavLink } from "react-router-dom"


function Nav() {
    return (
    <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Conference GO!</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/conferences/new">Create a conference</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/attendees/new">Attend a conference</NavLink>
            </li>
          <li className="nav-item">
              <NavLink to="/locations/new">Create a location</NavLink>
          </li>
          <li className="nav-item">
              <NavLink to="/presentations/new">Create a presentation</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
    );
  }

  export default Nav;
