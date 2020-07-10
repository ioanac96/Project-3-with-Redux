import React from 'react';
import Home from './Home.js';
import './App.less';
import MyProfile from './MyProfile.js';
import Upload from './Upload.js';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends React.Component {
  

  render() {  
    
    return (
      <Router>
        <div className="page">
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/my-profile" component={MyProfile}/>
            <Route path="/upload" component={Upload}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
