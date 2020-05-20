import React from "react";
import Router from "next/router";
import axios from "axios";
import { withCookies } from 'react-cookie';
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import EntryThumbnail from "../components/fragments/EntryThumbnail.jsx";
import ErrorBoundary from "../components/fragments/ErrorBoundary.jsx";
import Meta from "../components/wrappers/Meta.jsx";

class Vestibule extends React.Component {
    constructor(props, { search }) {
        super(props, { search });
        this.state = {search: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        Router.push({
            pathname: "/",
            query: { search },
          });
    }

    static async getInitialProps({ query }) {
        try {
            let response = await axios({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_API_BASE}/`,
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
                const entriesObject = response.data
                return {
                    isLoaded: true,
                    data: entriesObject
                } 
            }
        } catch (err) {
            return {
                error: true
            }
        }
    }
    render() {
        const { error, isLoaded, data } = this.props
        if (error) {
            return (
                <>
                    <Meta />
                    <ErrorBoundary reason={"Currently unable to fetch data..."} />
                </>
            )
        } else if (!isLoaded) {
            return <div>Loading...</div>;
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
                        <div className="hero-full-wrapper">
                            <div className="grid" style={{ 
                                display: "grid",
                                gridTemplateColumns: "repeat( auto-fill, minmax(250px, 1fr) )",
                                gridAutoRows: "250px",
                                gridGap: "2em",
                                
                            }}> 
                                {data.map(({_id, ...data}) => (
                                    <EntryThumbnail key={_id} {...data} />
                                ))
                                }
                            </div>
                        </div>
                        </main>
                    </div>
                </>
            );
        }
    }
}

export default withCookies(Vestibule);