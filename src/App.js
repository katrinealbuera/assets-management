import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store';

import Sidebar from './views/Sidebar';
import Index from './views/Index';
import CreateAsset from '../src/js/actions/asset/CreateAsset';
import Error from './views/error/Error';
import Model from './views/model/Model';
import Processor from './views/processor/Processor';
import Supplier from './views/supplier/Supplier';
import Category from './views/categories/Categories';
import Manufacturer from './views/manufacturer/Manufacturer';
import Sizes from './views/sizes/Sizes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <div className="App" id="wrapper">
            <BrowserRouter>
              <div>
                <Sidebar />
                <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/asset" component={CreateAsset} />
                  <Route exact path="/model" component={Model} />
                  <Route exact path="/processor" component={Processor} />
                  <Route exact path="/supplier" component={Supplier} />
                  <Route exact path="/category" component={Category} />
                  <Route exact path="/manufacturer" component={Manufacturer} />
                  <Route exact path="/sizes" component={Sizes} />
                  <Route component={Error} />
                </Switch>
              </div>
            </BrowserRouter>
      </div>
      </Provider>
    );
  }
}

export default App;
