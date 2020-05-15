import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import SidebarNavigator from "../../components/navigation/SidebarNavigator.jsx";
import ProcessEntry from "../../components/processes/ProcessEntry.jsx";

const Entry = (props) => {
    /* If you are looking at this...
    the markdown was sanitized on api server.
    */
    const [editMode, setEditMode] = useState(false);
    let { error, isLoaded, data } = props;
    const isAdmin = true
    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (isAdmin && editMode) {
        return (
            <ProcessEntry data={data.data} />
        )
    } else {
        return (
            <div>
                <SidebarNavigator name="$ ping"/>
                <main className="" id="main-collapse">
                    <div className="row">
                        <div className="col-xs-12 col-md-8">
                            <div className="section-container-spacer">
                            <div dangerouslySetInnerHTML={{__html: data.data.sanitizedHTML}}></div>
                            {isAdmin &&
                                <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit</button>
                            }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

Entry.getInitialProps = async ({ query }) => {
    const { slug } = query
    const response = await fetch(`http://localhost:5000/entry/${slug}`);
    const body = await response.json();
    if (response.status !== 200) {
        return {
            error: true
        }
    }
    else {
        return {
            isLoaded: true,
            data: body
        }
    }
}


export default Entry;