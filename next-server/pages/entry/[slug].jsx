import React, { useState, Suspense } from "react";
import axios from "axios";
import SidebarNavigator from "../../components/navigation/SidebarNavigator.jsx";
import Meta from "../../components/wrappers/Meta.jsx";
const ProcessEntry = React.lazy(() => import("../../components/processes/ProcessEntry.jsx"));

const Entry = (props) => {
    const [editMode, setEditMode] = useState(false);
    let { error, isLoaded, data } = props;
    const isAdmin = true
    if (error) {
        return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div> // fallback in case data does not populate
    } else if (isAdmin && editMode) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <ProcessEntry data={data} />
            </Suspense>
        )
    } else {
        let dateFooter = `${new Date(data.createdAt).toDateString()} ${data.createdAt !== data.updatedAt ? ` (updated on ${new Date(data.updatedAt).toDateString()})` : ""}`
        return (
            <>
            <Meta />
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
            </>
        );
    }
}

Entry.getInitialProps = async ({ query }) => {
    const { slug } = query
    const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE}/entry/${slug}`
        });
    const entryObject = response.data
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