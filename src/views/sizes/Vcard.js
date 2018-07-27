import React, { Component } from "react";
import setup from '../../js/setup/api';
import { connect } from 'react-redux';
import { getVCards, postAPI } from '../../actions/assetAction';

class Vcard extends Component{
    constructor(props){
        super(props);

        this.state = {
            size: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({size: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        
        const newSize = {
            size: this.state.size
        }

        this.props.postAPI(setup.BASE_URL + setup.Sizes.Videocard, newSize)
            .then(() => {
                this.props.getVCards();
            });
        this.setState({size: ''});
    }

    render(){
        return(
        <div>
            <div className="panel panel-success">
                <div className="panel-heading">
                    <p> Add New Videocard Size </p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input className="form-control" 
                                    onChange={this.handleChange} 
                                    value={this.state.size} 
                                    type="text" 
                                    name="size"/></td>
                            <td><input type="submit" value="Add" className={this.state.size ? 'btn btn-success' : 'btn btn-success disabled'}/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
        )
    }
}

export default connect(null, { postAPI, getVCards })(Vcard);