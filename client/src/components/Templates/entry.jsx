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

    componentDidMount() {
        fetch(`http://localhost:5000/entry/${this.state.slug}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                isLoaded: true,
                data
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
                });
            }
        )
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