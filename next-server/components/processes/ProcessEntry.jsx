import React from 'react';
import Router from 'next/router'
import Link from "next/link";
import axios from "axios";
import SidebarNavigator from "../navigation/SidebarNavigator.jsx";

// tags component found on codepen; this isnt my mess of a class 
class ProcessEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: props.data ? this.props.data.title : "",
                subtitle: props.data ? this.props.data.subtitle : "",
                imgsrc: props.data ? this.props.data.imgsrc : "",
                content: props.data ? this.props.data.content : "",
                deleted: props.data ? this.props.data.deleted : "",
                tags: props.data ? this.props.data.tags : []
            },
            editMode: props.data ? true : false,
            redirect: false,
            focused: false,
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.radioToggle = this.radioToggle.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleRemoveTagItem = this.handleRemoveTagItem.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            let response = await axios({
                method: this.state.editMode ? "patch" : "post", body: data,
                url: `http://localhost:5000/entry/${this.state.editMode ? this.state.data._id : "new"}`,
                data: {
                    title: this.state.title,
                    subtitle: this.state.subtitle,
                    imgsrc: this.state.imgsrc,
                    content: this.state.content,
                    deleted: this.state.deleted
                }
            });
                if (response.status !== 201) {
                    throw new Error("no");
                }
                else {
                    const slugResponse = await response.text();
                    Router.push(`/entry/${slugResponse}`); 
              }
        } catch(err) {
            console.log(err);
            Router.push("/"); // TODO change to err
        }
    }

    stringToBool(value) {
        if (value && typeof value === 'string') {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;
        }
        return value;
     }

    radioToggle(event) {
        this.setState({ 
            data: { 
                ...this.state.data, 
                deleted: this.stringToBool(event.currentTarget.value),
            },
        });
    }

    handleTagChange(event) {
        this.setState({ input: event.target.value });
      }
    
    handleInputKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            const {value} = event.target;
            this.setState({ 
                data: { 
                    ...this.state.data, 
                    tags: [...this.state.data.tags, value],
                },
            input: ""
            });
        }

        if (this.state.data.tags.length && event.keyCode === 8 && !this.state.input.length) {
            this.setState({ 
                data: { 
                    ...this.state.data, 
                    tags: this.state.data.tags.slice(0, state.tags.length - 1),
                },
            });

        }
    }
    
    handleRemoveTagItem(index) {
        return () => {
            this.setState({ 
                data: { 
                    ...this.state.data, 
                    tags: this.state.data.tags.filter((item, i) => i !== index)
                },
            });
        }
    }

    render() {
        let { data } = this.state
        let { deleted } = data
        const styles = {
            container: {
              border: '1px solid #ddd',
              padding: '5px',
              borderRadius: '5px',
            },
        
            tags: {
              display: 'inline-block',
              padding: '2px',
              border: '1px solid blue',
              fontFamily: 'Helvetica, sans-serif',
              borderRadius: '5px',
              marginRight: '5px',
              cursor: 'pointer'
            },
        
            input: {
              outline: 'none',
              border: 'none',
              fontSize: '14px',
              fontFamily: 'Helvetica, sans-serif'
            }
          };
        return (
            <div>
                <SidebarNavigator name="$ su -"/>
                <main className="" id="main-collapse">
                    <div style={{maxWidth: "700px"}}>
                        <h1>Process Entry</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input required type="text" name="title" id="title" className="form-control" defaultValue={data.title} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle">Subtitle</label>
                                <input required type="text" name="subtitle" id="subtitle" className="form-control" defaultValue={data.subtitle} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imgsrc">Image URL</label>
                                <input required type="text" name="imgsrc" id="imgsrc" className="form-control" defaultValue={data.imgsrc} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea required name="content" id="content" className="form-control" defaultValue={data.content} onChange={this.handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea required name="content" id="content" className="form-control" defaultValue={data.content} onChange={this.handleChange} />
                            </div>
                            <div>
                                <label>
                                    <ul style={styles.container}>
                                        {data.tags.map((item, i) => 
                                        <li key={i} style={styles.tags} onClick={this.handleRemoveTagItem(i)}>
                                            {item}
                                            <span>(x)</span>
                                        </li>
                                        )}
                                        <input
                                        style={styles.input}
                                        value={this.state.input}
                                        onChange={this.handleTagChange}
                                        onKeyDown={this.handleInputKeyDown} />
                                    </ul>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deleted" style={{color: "red"}}>Set deleted?</label>
                                <input name="deleted" type="radio" value="true" checked={deleted === true} onChange={this.radioToggle} style={{margin: "4px 15px"}} />Yes
                                <input name="deleted" type="radio" value="false" checked={deleted === false} onChange={this.radioToggle} style={{margin: "4px 15px"}} />No
                            </div>
                            <div>
                                <Link href="/">
                                    <button className="btn btn-secondary" style={{float: "left", marginBottom: "5px"}}>Cancel</button>
                                </Link>
                                <button type="submit" style={{float: "left", marginLeft: "10px"}} className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}
export default ProcessEntry;