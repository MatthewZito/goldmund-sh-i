import React from "react";
import Router from "next/router";
import getConfig from 'next/config';
import axios from "axios";
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import EntryThumbnail from "../components/fragments/EntryThumbnail.jsx";
import ErrorBoundary from "../components/fragments/ErrorBoundary.jsx";
import Meta from "../components/wrappers/Meta.jsx";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const DPS_URI = serverRuntimeConfig.URI || publicRuntimeConfig.URI;

class Vestibule extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isPopoverOpen:false, search: "", entries: this.props.entries, lastProcessedID: this.props.lastProcessedID, error: this.props.error };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.focusTextInput = this.focusTextInput.bind(this);
        // this.fetchNextBatch = this.fetchNextBatch.bind(this);
        this.textInput = React.createRef();
        

    }

    focusTextInput() {
        this.textInput.current.focus();
      }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        let { search } = this.state
        /* Unfortunate workaround for a known Nextjs bug
         June 2020: Zeit still hasn't addressed this bug */
        Router.push("/error", `/?search=${search}`);
    }

    onKeyPress = (event) => {
        if(event.which === 13) {
          this.handleSubmit();
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
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/js/masonry.js";
        script.async = true;
        script.onload = () => document.addEventListener("DOMContentLoaded", initializeMasonryConstruct());
        document.body.appendChild(script);
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
                                <div className="goldmundfb fab">
                                    <input aria-label="search input" ref={this.textInput}  type="search" name="search" placeholder="Search..." value={this.state.search} onChange={this.handleChange} onKeyPress={this.onKeyPress} autoComplete="off" />
                                        <button aria-label="open search input" onClick={this.focusTextInput} type="push" className="goldmundfb-button button-search">
                                            <i className="fa fa-search"></i>
                                        </button>
                                        <button aria-label="close search input" type="reset" form="form" className="goldmundfb-button button-reset fa fa-times"></button>
                                </div>
                            <div className="hero-full-wrapper">
                                <div className="grid" >
                                <div className="gutter-sizer"></div>
                                <div className="grid-sizer"></div> 
                                    {entries && entries.map(({_id, ...data}) => (
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
export default Vestibule;

// async fetchNextBatch(query=this.state.search) {
//     try {
//         let response = await axios({
//             method: "get",
//             url: `${DPS_URI}/entries/`,
//             params: { search: query ? query.search : undefined, lastProcessedID: this.state.lastProcessedID }
//         });
//         if (response.status !== 200) {
//             this.setState({ error: true })
//         }
//         else {
//             const { entries, lastProcessedID } = response.data
//             this.setState({ entries: this.state.entries.concat(entries), lastProcessedID: lastProcessedID });
//         }
//     } catch (err) {
//         return {
//             error: true
//         }
//     }
// }