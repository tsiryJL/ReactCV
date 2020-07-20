import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Profil from './Profil';
import Upload from './Upload';
import ListCV from './ListCV';
import CreateProfile from './CreateProfile';
import 'bootstrap/dist/css/bootstrap.css';

const uri = 'http://212.227.213.9';

function App() {
    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route
                        exact
                        path="/:ref"
                        render={({ match }) => <Profil match={match} uri_back={uri} />}
                    />
                    <Route path="/new/create">
                        <CreateProfile />
                    </Route>
                    <Route path="/new/import">
                        <Upload uri_back={uri} />
                    </Route>
                    <Route path="/">
                        <ListCV uri_back={uri} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
