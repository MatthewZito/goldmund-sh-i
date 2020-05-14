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

    componentDidMount() {
        fetch('http://localhost:5000/')
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
      
    // callApi = async () => {
    //     const response = await ;
    //     const body = await response.json();
    //     if (response.status !== 200) throw Error(body.message);
    //     return body;
    // };

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
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