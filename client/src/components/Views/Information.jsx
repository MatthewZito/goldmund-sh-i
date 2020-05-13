import React from 'react';
import { Link } from 'react-router-dom';
import CollapsedNavigator from "../Navigation/CollapsedNavigator.jsx";
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";

const Information = () => {
    return (
        <div>
            <CollapsedNavigator />
            <SidebarNavigator name="$ whatis"/>
            <main className="" id="main-collapse">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <img className="img-responsive" alt="" src="" />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <h1>Lexicon v2.0</h1>
                        <p>content here</p>
                <Link to="/contact" className="btn btn-primary" title=""> Communicate</Link>
            </div>
            </div>
                
            </main>
        </div>
    );
}
export default Information;
