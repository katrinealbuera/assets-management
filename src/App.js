import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store';
import Sidebar from './views/Sidebar';
import Index from './views/Index';
import CreateAsset from './views/asset/CreateAsset';
import EditAsset from './views/asset/EditAsset';
import Error404 from './views/error/Error404';
import Model from './views/model/Model';
import Processor from './views/processor/Processor';
import Supplier from './views/supplier/Supplier';
import Category from './views/categories/Categories';
import Manufacturer from './views/manufacturer/Manufacturer';
import Login from './views/login/Login';
import User from './views/user/User'
import Sizes from './views/sizes/Sizes';

class App extends Component {

  constructor(){
    super();

    this.state = {
      isAuth: '',
    }
  }
  
  componentWillMount() {
    this.setState({isAuth: localStorage.getItem('user')})
  }

  render() {

    const { isAuth } = this.state;

    return (
      <Provider store={store}>
          <div className="App" id="wrapper">
            <BrowserRouter>
              <div>
                  { isAuth && <Sidebar />}
                <Switch>
                  { isAuth ? <Route exact path="/" component={Index}/> : <Route exact path="/" component={Login}/>}
                  <Route exact path="/" component={Index}/>
                  <Route exact path="/add_asset" component={CreateAsset} />
                  <Route exact path="/edit_asset" component={EditAsset} />
                  <Route exact path="/model" component={Model} />
                  <Route exact path="/processor" component={Processor} />
                  <Route exact path="/supplier" component={Supplier} />
                  <Route exact path="/category" component={Category} />
                  <Route exact path="/manufacturer" component={Manufacturer} />
                  <Route exact path="/sizes" component={Sizes} />
                  <Route exact path="/user" component={User} />
                  <Route component={Error404} />
                </Switch>
              </div>
            </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
