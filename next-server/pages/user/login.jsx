import React from 'react';
import Router from 'next/router'
import Link from "next/link";
import axios from "axios";
import SidebarNavigator from "../../components/navigation/SidebarNavigator.jsx";
import { Cookies, withCookies } from 'react-cookie';

const cookies = new Cookies();
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "",password:""};
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
                url: `${process.env.NEXT_PUBLIC_API_BASE}/user/login`,
                data: {
                  email: this.state.email,
                  password: this.state.password
                }
              });
              const token = response.data.token;
              cookies.set('token', token);
        } catch(err) {
            console.log(err);
        }
        Router.push("/");
    }
    render() {
        return (
            <div>
                <SidebarNavigator name="$ su -"/>
                <main className="" id="main-collapse">
                    <div style={{maxWidth: "400px"}}>
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input required type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input required type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" />
                            </div>
                            <div>
                                <Link href="/">
                                    <button className="btn btn-secondary" style={{float: "left", marginBottom: "5px"}}>Cancel</button>
                                </Link>
                                <button type="submit" style={{float: "left", marginLeft: "10px"}} className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    }
}

export default withCookies(Login);