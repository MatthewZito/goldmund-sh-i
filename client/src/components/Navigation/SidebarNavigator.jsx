import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarFooter from "../Fragments/SidebarFooter.jsx"

const SidebarNavigator = (props) => {
    const [toggled, setToggled] = useState(false);
    return (
        <>
        <div className="navbar navbar-default visible-xs">
            <button type="button" onClick={() => setToggled(!toggled)} className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink to="/" className="navbar-brand">Lexicon II</NavLink>
        </div>
        <div>
            <nav className={`sidebar ${toggled ? "open" : ""}`}>
                <div className="navbar-collapse" id="navbar-collapse">
                    <div className="site-header hidden-xs">
                        <NavLink className="site-brand" to="/" title="">
                            <img className="img-responsive site-logo" alt="" src="static/assets/main-logo.svg" />
                            {props.name}
                        </NavLink>
                        {(props.home === true) && (
                        <p>A collation of documented visual media.</p>
                        )}
                    </div>
                    <ul className="nav">
                        <li><NavLink activeClassName="active" exact to="/"> Vestibule</NavLink></li>
                        <li><NavLink activeClassName="active" to="/info">Info</NavLink></li>
                        <li><NavLink activeClassName="active" to="/contact">Comms</NavLink></li>
                    </ul>
                    <SidebarFooter />
                </div> 
            </nav>
        </div>
        </>
    );
}

export default SidebarNavigator;

