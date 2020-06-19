import React from 'react';
import Router from "next/router";
import Link from "next/link";
import getConfig from 'next/config';
import axios from "axios";
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import Meta from "../components/wrappers/Meta.jsx"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const DPS_URI = serverRuntimeConfig.URI || publicRuntimeConfig.URI;

class Communications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "",subject:"",content:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                method: "post",
                url: `${DPS_URI}/email`,
                data: {
                  email: this.state.email,
                  subject: this.state.subject,
                  content: this.state.content
                }
              });
              if (response.status !== 201) {
                throw new Error();
              }
              else {
                alert("[+] Success; Your message has been forwarded to the administrator.");
                Router.push("/"); // TODO change to form success
              }
        } catch(err) {
            alert("[-] Form submission failed. Please report this issue to the administrator at goldmund.regler (gmail).");
            Router.push("/"); // TODO change to err
        }
    }

    render() {
        return (
            <>
                <Meta />
                <div>
                    <SidebarNavigator name="$ ping"/>
                    <main id="main-collapse">
                        <div className="row">
                        <div className="col-xs-12">
                            <div className="section-container-spacer">
                                <h1>Communications</h1>
                               
                            </div>
                            <div className="section-container-spacer">
                            
                                <form onSubmit={this.handleSubmit} className="reveal-content">
                                <div className="row">
                                <div className="col-md-6">
                                <p>Should you wish to communicate, this is the best means to do so. PGP correspondence is welcome and even encouraged.
                                To this end, find below my self-signed GPG public key and accompanying fingerprint for validation.</p>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input required type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input required type="text" id="subject" name="subject" value={this.state.subject} onChange={this.handleChange} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="content">Message</label>
                                        <textarea 
                                            required type="text" 
                                            name="content" 
                                            value={this.state.content} 
                                            onChange={this.handleChange} 
                                            className="form-control" 
                                            rows="3" 
                                            placeholder="Enter your message">
                                        </textarea>
                                    </div>
                                    <button aria-label="submit form" type="submit" className="btn btn-primary btn-lg">Send</button>
                                    </div>
                                    <div className="col-md-6" style={{marginLeft: "-15px"}}>
                                        <ul className="list-unstyled address-container">
                                            <li>
                                                <span className="fa-icon">
                                                    <i className="fas fa-key" aria-hidden="true"></i>
                                                </span>
                                                <Link href="/pubkey"><a>public key</a></Link>
                                            </li>
                                            <li>
                                                <span className="fa-icon">
                                                    <i className="fas fa-fingerprint" aria-hidden="true"></i>
                                                </span>
                                                    306E 7D6A 359E 3448 F2F4  F85A 204C 907B 2280 7B5B
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                </form>
                                </div>
                                
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }
}
export default Communications;