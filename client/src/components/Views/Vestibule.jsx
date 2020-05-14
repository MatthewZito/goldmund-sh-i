import React from 'react';
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";
import EntryThumbnail from "./EntryThumbnail.jsx";

class Vestibule extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            data: null
        }
    }

    async componentDidMount() {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/`);
        const body = await response.json();
        if (response.status !== 200) {
            this.setState({ error: true })
        }
        else {
            this.setState({
                isLoaded: true,
                data: body
            });
        }
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            console.log(error)
            return <div>Error</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <SidebarNavigator name="$pwd" home={true} />
                    <main id="main-collapse">
                    <div className="hero-full-wrapper">
                        <div className="grid" >
                        <div className="gutter-sizer"></div>
                        <div className="grid-sizer"></div>
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