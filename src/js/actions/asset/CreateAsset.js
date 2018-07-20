import React, { Component } from "react";
import setup from '../../setup/api';
import CreateLaptop from '../../actions/asset/CreateLaptop';

class CreateAsset extends Component {

    state = {
        name: ''
    }

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();


    setup.PostFunction(setup.BASE_URL + setup.Assets, this.state)
    .then(response => {
        console.log(response);
        console.log(response.data);
        this.props.getAssets();
    })
}

  render() {
    return (
        <div>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Create Asset</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select className="form-control">
                                        <option></option>
                                        <option>LAPTOP</option>
                                        <option>MONITOR</option>
                                    </select>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <CreateLaptop />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default CreateAsset;