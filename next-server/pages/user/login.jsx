import React from 'react';
import Router from 'next/router'
import Link from "next/link";
import axios from "axios";
import SidebarNavigator from "../../components/navigation/SidebarNavigator.jsx";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: "",password:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // getUsers = async () => {
    //     let res = await axios.get("https://reqres.in/api/users?page=1");
    //     let { data } = res.data;
    //     this.setState({ users: data });
    // };
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
                url: "http://localhost:5000/user/login",
                data: {
                  email: this.state.email,
                  password: this.state.password
                }
              });
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

export default Login;