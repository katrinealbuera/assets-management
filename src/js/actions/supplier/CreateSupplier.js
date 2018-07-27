import React, { Component } from "react";
import setup from '../../setup/api';
import { connect } from 'react-redux';
import { postAPI, getSuppliers } from '../../../actions/assetAction';

class CreateSupplier extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        
        const newName = {
            name: this.state.name
        }

        this.props.postAPI(setup.BASE_URL + setup.Suppliers, newName)
            .then(() => {
                this.props.getSuppliers();
            });
        this.setState({name: ''});
    }


  render() {
    return (
        <div className="col-lg-6">
        <div className="panel panel-success">
            <div className="panel-heading">
                <p> Add New Supplier </p>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Supplier Name</label>
                                <input 
                                className="form-control" 
                                onChange={this.handleChange} 
                                value={this.state.name}
                                placeholder="Supplier Name" 
                                type="text" 
                                name="name"/>
                            </div>
                            <input type="submit" value="Submit" className={this.state.name ? 'btn btn-success' : 'btn btn-success disabled'}/>
                        </form>     
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default connect(null, { postAPI, getSuppliers })(CreateSupplier);