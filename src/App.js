import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from './views/Sidebar';
import Index from './views/Index';
import Asset from './views/asset/Asset';
import Error from './views/error/Error';

class App extends Component {
  render() {
    return (
      <div className="App" id="wrapper">
        <BrowserRouter>
          <div>
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/create_asset" component={Asset} />
              <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
