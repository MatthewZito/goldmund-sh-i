import React from 'react';
import { Link } from 'react-router-dom';
import SidebarFooter from "../Fragments/SidebarFooter.jsx"

const SidebarNavigator = (props) => {
    return (
        <div>
            <nav className="sidebar">
                <div className="navbar-collapse" id="navbar-collapse">
                    <div className="site-header hidden-xs">
                        <Link className="site-brand" to="/" title="">
                            <img className="img-responsive site-logo" alt="" src="static/assets/main-logo.svg" />
                            {props.name}
                        </Link>
                        {(props.home === true) && (
                        <p>A collation of documented visual media.</p>
                        )
                        }
                    </div>
                    <ul className="nav">
                        <li><Link className="active" to="/">Vestibule</Link></li>
                        <li><Link className="active" to="/info">Info</Link></li>
                        <li><Link className="active" to="/contact">Comms</Link></li>
                    </ul>
                    <SidebarFooter />
                </div> 
            </nav>
        </div>
    );
}

export default SidebarNavigator;

