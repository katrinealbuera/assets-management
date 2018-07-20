import React, { Component } from "react";
import { Code } from 'react-content-loader';
import setup from '../../js/setup/api';
import CreateAsset from '../../js/actions/asset/CreateAsset';

class Asset extends Component {
  state = {
    data: [],
    isLoading: false,
    error: null
  };

  constructor(){
    super();
    this.getAssets = this.getAssets.bind(this);
  }

  componentDidMount() {
    this.getAssets();
  }

  getAssets(){
    this.setState({isLoading: true});
    
    setup.GetWithParameter(setup.BASE_URL + setup.Assets, '?ShowAll=true')
      .then(response => {
        const newData = response.data.list;

        const newState = Object.assign({}, this.state, {
          data: newData,
          isLoading: false
        });
        this.setState(newState);
        })
      .catch(error => console.log(error));
  }

  render() {
    const { isLoading, error } = this.state;

    if (isLoading) {
      return <Code />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }
    
    return (
      <div>
        <CreateAsset getModels={this.getAssets}/>
      </div>
    );
  }
}

export default Asset;