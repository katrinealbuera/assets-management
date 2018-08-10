import React, { Component } from "react";
import setup from '../../setup/api';
import { connect } from 'react-redux';
import { postAPI, getCategories } from '../../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';

class CreateCategory extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            hasError: false,
            isValidForm: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newName = {
            name: this.state.name
        }

        if (this.state.isValidForm){
            this.props.postAPI(setup.BASE_URL + setup.Categories, newName)
            .then(() => {
                this.props.getCategories();
            }).catch(error => console.log(error))
        }
        this.setState({name: ''});
    }

  render() {
    
    return (
        <div className="col-lg-6">
        <div className="panel panel-success">
            <div className="panel-heading">
                <p> Add New Category </p>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Category</label>
                                <Textbox
                                    tabIndex="1" id={'name'} name="name"
                                    type="text" value={this.state.name} placeholder="Category Name"
                                    onChange={(name, e) => {
                                        if(name.length > 30 || !name) {
                                            this.setState({ name, hasError: true, isValidForm: false })
                                        }
                                        else {
                                            this.setState({ name, hasError: false, isValidForm: true  })
                                        }
                                    }} 
                                    onBlur={() => {}}
                                    validationOption={{
                                        name: 'Category Name',
                                        check: true, 
                                        required: true,
                                        max: '20'
                                    }}/>
                            </div>
                            <input type="submit" value="Sumbit" className={this.state.name  && !this.state.hasError ? 
                                'btn btn-success' : 'btn btn-success disabled'}/>
                        </form>     
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}


export default connect(null, { postAPI, getCategories })(CreateCategory);