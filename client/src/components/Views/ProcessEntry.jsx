import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";

class ProcessEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state,
            editMode: props.location.state ? true : false,
            redirectPath: "",
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/entry/${this.state.editMode ? this.state.data.data._id : "new"}`, { method: this.state.editMode ? "PATCH" : "POST", body: data })
            const slugResponse = await response.text();

            if (response.status === 201) {
                this.setState({ redirect: true, redirectPath: this.state.editMode ? `/entry/${slugResponse}` : "/" });
                this.props.history.replace(`${this.state.redirectPath}`);
            }
        } catch(err) {
            console.log(err);
        }
    }
    render() {
        let { editMode } = this.state
        let { data } = this.state.data || ""
        return (
            <div>
                <SidebarNavigator name="$ su -"/>
                <main className="" id="main-collapse">
                    <div className="container">
                        <h1>Process Entry</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input required defaultValue={editMode ? data.title : ""} type="text" name="title" id="title" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle">Subtitle</label>
                                <textarea required name="subtitle" id="subtitle" defaultValue={editMode ? data.subtitle : ""} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imgsrc">Image URL</label>
                                <textarea required name="imgsrc" id="imgsrc" defaultValue={editMode ? data.imgsrc : ""} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea required name="content" id="content" defaultValue={editMode ? data.content : ""} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="deleted">Set deleted?</label>
                                <input 
                                    type="radio" 
                                    id="deleted"
                                    readOnly={true}
                                    required name="deleted" 
                                    defaultValue={false}
                                    className="form-control"/>
                            </div>
                            <Link to="/" className="btn btn-secondary">Cancel</Link>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}
export default withRouter(ProcessEntry);