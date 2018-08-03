import React, { Component } from "react";
import setup from '../../setup/api';
import { connect } from 'react-redux';
import { postAPI, getSuppliers } from '../../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';

class CreateSupplier extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newName = {
            name: this.state.name
        }

        this.props.postAPI(setup.BASE_URL + setup.Suppliers, newName)
            .then(() => {
                this.props.getSuppliers();
            }).catch(error => console.log(error))
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
                                <Textbox
                                    tabIndex="1" id={'name'} name="name"
                                    type="text" value={this.state.name} placeholder="Supplier Name"
                                    onChange={(name, e) => {
                                        this.setState({ name })
                                    }} 
                                    onBlur={() => {}}
                                    validationOption={{
                                        name: 'Supplier Name',
                                        check: true, 
                                        required: true 
                                    }} />
                                <p>{this.props.error ? this.props.error.errorMessages : null}</p>
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

const mapStateToProps = state => ({
    error: state.error.error
  })

export default connect(mapStateToProps, { postAPI, getSuppliers })(CreateSupplier);