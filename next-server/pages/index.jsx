import React from "react";
import fetch from "isomorphic-unfetch";
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import EntryThumbnail from "../components/fragments/EntryThumbnail.jsx";

class Vestibule extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static async getInitialProps() {
        const response = await fetch("http://localhost:5000/");
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

    render() {
        const { error, isLoaded, data } = this.props
        if (error) {
            return <div>Error</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <SidebarNavigator name="$pwd" />
                    <main id="main-collapse">
                    <div className="hero-full-wrapper">
                        <div className="grid" >
                        <div className="gutter-sizer"></div>
                        {data.map(({_id, ...data}) => (
                            <EntryThumbnail key={_id} {...data} />
                        ))
                        }
                        </div>
                    </div>
                    </main>
                </div>
            );
        }
    }
}

export default Vestibule;