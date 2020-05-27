import React from "react";
import axios from "axios";
import SidebarNavigator from "../../components/navigation/SidebarNavigator.jsx";
import Meta from "../../components/wrappers/Meta.jsx";

const Entry = (props) => {
    let { error, isLoaded, data } = props;
    if (error) {
        return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div> // fallback in case data does not populate
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
        url: `${process.env.NEXT_PUBLIC_API_BASE}/entries/${slug}`
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