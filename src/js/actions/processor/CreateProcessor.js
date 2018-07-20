import React, { Component } from "react";
import setup from '../../setup/api';

class CreateProcessor extends Component {

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

    setup.PostFunction(setup.BASE_URL + setup.Processors, this.state)
    .then(response => {
        console.log(response);
        console.log(response.data);
        this.props.getProcessor();
    })
}

  render() {
    return (
        <div className="col-lg-6">
        <div className="panel panel-success">
            <div className="panel-heading">
                <p> Add New Processor </p>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Processor Name</label>
                                <input className="form-control" onChange={this.handleChange} placeholder="Processor Name" type="text" name="name"/>
                            </div>
                            <input type="submit" value="Sumbit" className="btn btn-success"/>
                        </form>     
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default CreateProcessor;