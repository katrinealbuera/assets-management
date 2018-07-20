import React, { Component } from "react";
import setup from '../../setup/api';

class GetDropdown extends Component { 
    constructor(){
        super();

        this.state = {
            statusType: [],
            modelType: [],
            manufacturerList: []
        }

        this.getStatusType = this.getStatusType.bind(this);
        this.getModelType = this.getModelType.bind(this);
        this.getManufacturer = this.getManufacturer.bind(this);
    }

    componentDidMount() {
        this.getStatusType();
        this.getModelType();
        this.getManufacturer();
      }

    getStatusType(){
        setup.Get(setup.BASE_URL + setup.Status)
        .then(response => {
          const newData = response.data;
  
          const newState = Object.assign({}, this.state, {
            statusType: newData
          });
          this.setState(newState);
          })
        .catch(error => console.log(error));
    }  

    getModelType(){
        setup.Get(setup.BASE_URL + setup.Models)
        .then(response => {
          const newData = response.data.list;
  
          const newState = Object.assign({}, this.state, {
            modelType: newData
          });
          this.setState(newState);
          })
        .catch(error => console.log(error));
    }

    getManufacturer(){
        setup.Get(setup.BASE_URL + setup.Manufacturers)
        .then(response => {
          const newData = response.data.list;
  
          const newState = Object.assign({}, this.state, {
            manufacturerList: newData
          });
          this.setState(newState);
          })
        .catch(error => console.log(error));
    }
}

export default GetDropdown;