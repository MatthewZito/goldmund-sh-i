import React from "react";
import { Link } from "react-router-dom";
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";

class Entry extends React.Component {
    /* If you are looking at this...
    the markdown was sanitized on backend.
    */
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: null,
            slug: props.match.params.slug
        }
    }

    async componentDidMount() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/entry/${this.state.slug}`);
        if (response.status !== 200) {
            this.setState({ error: true })
        }
        else {
            const body = await response.json();
            this.setState({
                isLoaded: true,
                data: body
            });
        }
    }

    render() {
        const { error, isLoaded, data } = this.state;
        const isAdmin = true
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
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
                                    <Link to={{pathname:"/admin/process", state: { data: data.data }}} ><button className="btn btn-primary">Edit</button></Link>
                                }
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }
    }        
}
export default Entry;