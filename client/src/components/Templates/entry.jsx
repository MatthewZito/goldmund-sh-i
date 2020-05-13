import React from "react";
import { useParams } from "react-router-dom";
import CollapsedNavigator from "../Navigation/CollapsedNavigator.jsx";
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";

const Entry = () => {
    let { id } = useParams();
    return (
        <div>
            <CollapsedNavigator />
            <SidebarNavigator name="$ ping"/>
            <main className="" id="main-collapse">
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <div className="section-container-spacer">
                            <h1>{id}</h1>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default Entry;