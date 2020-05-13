import React from "react";
import { useParams } from "react-router-dom";
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";

const Entry = () => {
    let { id } = useParams();
    return (
        <div>
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