import React, { useState, Suspense } from "react";
import fetch from "isomorphic-unfetch";
import SidebarNavigator from "../../components/navigation/SidebarNavigator.jsx";
const ProcessEntry = React.lazy(() => import("../../components/processes/ProcessEntry.jsx"));

const Entry = (props) => {
    const [editMode, setEditMode] = useState(false);
    let { error, isLoaded, data } = props;
    const isAdmin = true
    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (isAdmin && editMode) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <ProcessEntry data={data} />
            </Suspense>
        )
    } else {
        let dateFooter = `${new Date(data.createdAt).toDateString()} ${data.createdAt !== data.updatedAt ? ` (updated on ${new Date(data.updatedAt).toDateString()})` : ""}`
        return (
            <div>
                <SidebarNavigator name="$ cat "/>
                <main className="" id="main-collapse">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            <div className="section-container-spacer">
                            <h2>{data.title}</h2>
                            <p><strong>{data.subtitle}</strong></p>
                            <hr />
                            <div dangerouslySetInnerHTML={{__html: data.sanitizedHTML}}></div>
                            <hr />
                            <p><em>{dateFooter}</em></p>
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
    const entryObject = await response.json();
    if (response.status !== 200) {
        return {
            error: true
        }
    }
    else {
        return {
            isLoaded: true,
            data: entryObject
        }
    }
}


export default Entry;