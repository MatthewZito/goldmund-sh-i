import React from 'react';
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";
import EntryThumbnail from "./EntryThumbnail.jsx";

class Vestibule extends React.Component {
    constructor() {
        super();
        this.state = {
            entries: [{
                  title: "First Article",
                  subtitle: "subtitle here",
                  imgsrc: 'https://i.ibb.co/cvpntL1/hats.png',
                  id: 1,
                  content: "A bunch of content here",
                },
                {
                  title: "Second Article",
                  subtitle: "subtitle here",
                  imgsrc: 'https://i.ibb.co/px2tCc3/jackets.png',
                  id: 2,
                  content: "A bunch of content here",
                },
                {
                  title: "Third Article",
                  subtitle: "subtitle here",
                  imgsrc: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                  id: 3,
                  content: "A bunch of content here",
                }]       
        }
    }
   
    render() {
        return (
            <div>
                <SidebarNavigator name="$pwd" home={true} />
                <main id="main-collapse">
                <div className="hero-full-wrapper">
                    <div className="grid" >
                    <div className="gutter-sizer"></div>
                    {/* <div className="grid-sizer"></div> */}
                    {
                    this.state.entries.map(({ id, ...otherEntriesProps }) => (
                        <EntryThumbnail key={id} id={id} {...otherEntriesProps} />
                    ))
                    }
                    </div>
                </div>
                </main>
            </div>
        );
    }
}
export default Vestibule;