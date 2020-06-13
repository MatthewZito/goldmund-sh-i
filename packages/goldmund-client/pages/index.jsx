import React from "react";
import Router from "next/router";
import getConfig from 'next/config';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import EntryThumbnail from "../components/fragments/EntryThumbnail.jsx";
import ErrorBoundary from "../components/fragments/ErrorBoundary.jsx";
import Meta from "../components/wrappers/Meta.jsx";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const DPS_URI = serverRuntimeConfig.URI || publicRuntimeConfig.URI;

class Vestibule extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "", entries: this.props.entries, lastProcessedID: this.props.lastProcessedID, error: this.props.error };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchNextBatch = this.fetchNextBatch.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let { search } = this.state
        // weird workaround, probably because router.push only works on client and not server
        // unless it's a hot-reloading issue only present in dev
        // we shall see. nevertheless, file this as a TODO: ensure works in prod
        Router.push("/error", `/?search=${search}`);
    }

    async fetchNextBatch(query=this.state.search) {
        try {
            let response = await axios({
                method: "get",
                url: `${DPS_URI}/entries/`,
                params: { search: query ? query.search : undefined, lastProcessedID: this.state.lastProcessedID }
            });
            if (response.status !== 200) {
                this.setState({ error: true })
            }
            else {
                const { entries, lastProcessedID } = response.data
                this.setState({ entries: this.state.entries.concat(entries), lastProcessedID: lastProcessedID });
            }
        } catch (err) {
            return {
                error: true
            }
        }
    }

    static async getInitialProps({ query }) {
        try {
            let response = await axios({
                method: "get",
                url: `${DPS_URI}/entries/`,
                params: {
                    search: query ? query.search : undefined,
                }
            });
            if (response.status !== 200) {
                return {
                    error: true
                }
            }
            else {
                const { entries, lastProcessedID } = response.data
                return {
                    entries: entries,
                    lastProcessedID: lastProcessedID
                } 
            }
        } catch (err) {
            return {
                error: true
            }
        }
    }

    render() {
        const { error, entries, lastProcessedID } = this.state
        if (error) {
            return (
                <>
                    <Meta />
                    <ErrorBoundary reason={"Currently unable to fetch data..."} />
                </>
            )
        } else {
            return (
                <>
                    <Meta />
                    <div>
                        <SidebarNavigator name="$ pwd" />
                        <main id="main-collapse">
                            <div className="search-outer" >
                                <form onSubmit={this.handleSubmit} className="search-form">
                                    <input type="search" name="search" placeholder="Search..." value={this.state.search} onChange={this.handleChange}  />
                                    <i className="fa fa-search" aria-hidden="true" />
                                </form>
                            </div>
                        <div className="hero-full-wrapper" style={{ maxWidth: "1150px"}} >
                                <InfiniteScroll
                                    dataLength={entries.length}
                                    next={this.fetchNextBatch}
                                    hasMore={lastProcessedID}
                                    style={{ overflow: "unset" }}
                                    >
                                    <div className="grid" style={{ 
                                        display: "grid",
                                        gridTemplateColumns: "repeat( auto-fill, minmax(200px, 1fr) )",
                                        gridAutoRows: "15fr",
                                        gridGap: "2em"
                                    }}> 
                                        {entries && entries.map(({_id, ...data}) => (
                                            <EntryThumbnail key={_id} {...data} />
                                        ))
                                        }
                                    </div>
                                </InfiniteScroll>
                            </div>
                        </main>
                    </div>
                </>
            );
        }
    }
}

export default Vestibule;