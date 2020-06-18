import getConfig from 'next/config';
import React from "react";
import axios from "axios";
import SidebarNavigator from "../../components/navigation/SidebarNavigator.jsx";
import Meta from "../../components/wrappers/Meta.jsx";
import ErrorBoundary from "../../components/fragments/ErrorBoundary.jsx";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const DPS_URI = serverRuntimeConfig.URI || publicRuntimeConfig.URI;

export default function Entry(props) {
    let { error, data } = props;
    if (error) {
        return (
            <>
                <Meta />
                <ErrorBoundary reason={"Currently unable to fetch entry..."} />
            </>
        )
    }
    else {
        let dateFooter = `${new Date(data.createdAt).toDateString()} ${data.createdAt !== data.updatedAt ? ` (updated on ${new Date(data.updatedAt).toDateString()})` : ""}`
        return (
            <>
                <Meta tags={data.tags} />
                <div>
                    <SidebarNavigator name="$ cat "/>
                    <main className="" id="main-collapse">
                        <div className="row" style={{ maxWidth: "1150px"}} >
                            <div className="col-xs-12 col-md-12">
                                <div className="section-container-spacer">
                                    <h2>{data.title}</h2>
                                    <p><strong>{data.subtitle}</strong></p>
                                    <hr />
                                    <div dangerouslySetInnerHTML={{__html: data.sanitizedHTML}}></div>
                                    <hr />
                                    <p className="goldmund-caption">{dateFooter}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }
}

Entry.getInitialProps = async (ctx) => {
    const { slug } = ctx.query
    const response = await axios({
        method: "get",
        url: `${DPS_URI}/entries/${ctx.query.slug}`
        });
    const entryObject = response.data
    if (response.status !== 200) {
        return {
            error: true
        }
    }
    else {
        return {
            data: entryObject
        }
    }
}
