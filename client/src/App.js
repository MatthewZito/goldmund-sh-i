import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './index.min.css';
import Communications from "./components/Views/Communications.jsx";
import Vestibule from "./components/Views/Vestibule.jsx";
import Information from "./components/Views/Information.jsx";
import PublicKey from "./components/Views/PublicKey.jsx";
import Entry from "./components/Templates/Entry.jsx";
import ProcessEntry from "./components/Views/ProcessEntry.jsx";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            response: ""
        }
    }

    componentDidMount() {
        this.callApi()
        //   .then(res => this.setState({ response: res.data[0] }))
         .then(res => console.log(res))
          .catch(err => console.log(err));
      }
      
      callApi = async () => {
        const response = await fetch('http://localhost:5000/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };
      
    render() {
        return (
        <div className="App">
            <Switch>
            <h1>{this.state.response}</h1>
                <Route exact path="/" component={Vestibule} />
                <Route path="/contact" component={Communications} />
                <Route path="/info" component={Information} />
                <Route path="/pubkey" component={PublicKey} />
                <Route path="/entry/:id" component={Entry} />
                <Route path="/admin/process" component={ProcessEntry} />
            </Switch>
        </div>
        );
    }
}

export default App;
