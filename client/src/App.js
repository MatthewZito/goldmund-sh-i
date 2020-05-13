import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './index.min.css';
import Communications from "./components/Views/Communications.jsx";
import Vestibule from "./components/Views/Vestibule.jsx";
import Information from "./components/Views/Information.jsx";
import PublicKey from "./components/Views/PublicKey.jsx";
import Entry from "./components/Templates/entry.jsx";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {
        return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Vestibule} />
                <Route path="/contact" component={Communications} />
                <Route path="/info" component={Information} />
                <Route path="/pubkey" component={PublicKey} />
                <Route path="/:id/entry" component={Entry} />
            </Switch>
        </div>
        );
    }
}

export default App;
