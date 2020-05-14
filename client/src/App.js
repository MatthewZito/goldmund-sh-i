import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './index.min.css';
import Communications from "./components/Views/Communications.jsx";
import Vestibule from "./components/Views/Vestibule.jsx";
import Information from "./components/Views/Information.jsx";
import PublicKey from "./components/Views/PublicKey.jsx";
import Entry from "./components/Templates/Entry.jsx";
import ProcessEntry from "./components/Views/ProcessEntry.jsx";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Vestibule} />
                    <Route path="/contact" component={Communications} />
                    <Route path="/info" component={Information} />
                    <Route path="/pubkey" component={PublicKey} />
                    <Route path="/entry/:slug" render={({match}) =>  <Entry match={match} /> }/>
                    <Route path="/admin/process" component={ProcessEntry} />
                </Switch>
            </div>
        );
    }
}

export default App;
