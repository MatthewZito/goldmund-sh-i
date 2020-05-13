import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";

const ProcessEntry = (props) => {
    const [editMode, setEditMode] = useState(false);
    if (props.title) { //update htmlFor specific validation
        setEditMode(true);
    }
    return (
        <div>
            <SidebarNavigator name="$ su -"/>
            <main className="" id="main-collapse">
                <div className="container">
                    <h1>Process Entry</h1>
                    <form action="" method="POST">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input required defaultValue={editMode ? props.title : ""} type="text" name="title" id="title" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subtitle">Subtitle</label>
                            <textarea required name="subtitle" id="subtitle" defaultValue={editMode ? props.subtitle : ""} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imgurl">Image URL</label>
                            <textarea required name="imgurl" id="imgurl" defaultValue={editMode ? props.imgurl : ""} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea required name="content" id="content" defaultValue={editMode ? props.content : ""} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deleted">Set deleted?</label>
                            <input 
                                type="radio" 
                                id="deleted"
                                readOnly={true}
                                required name="deleted" 
                                defaultValue={editMode ? props.deleted : false}
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
export default ProcessEntry;