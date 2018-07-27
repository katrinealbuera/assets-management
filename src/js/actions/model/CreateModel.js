import React, { Component } from "react";
import setup from '../../setup/api';
import { connect } from 'react-redux';
import { postAPI, getModels } from '../../../actions/assetAction';

class CreateModel extends Component {

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

        this.props.postAPI(setup.BASE_URL + setup.Models, newName)
            .then(() => {
                this.props.getModels();
            });
        this.setState({name: ''});
    }

  render() {

    return (
        <div className="col-lg-6">
        <div className="panel panel-success">
            <div className="panel-heading">
                <p> Add New Model </p>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>{setup.FieldName.Model}</label>
                                <input className="form-control" 
                                        onChange={this.handleChange} 
                                        value={this.state.name} 
                                        placeholder="Model Name" 
                                        type="text" name="name"/>
                            </div>
                            <input type="submit" value="Sumbit" className={this.state.name ? 'btn btn-success' : 'btn btn-success disabled'}/>
                        </form>     
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default connect(null, { postAPI, getModels })(CreateModel);