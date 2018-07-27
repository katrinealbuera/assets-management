import React, { Component } from "react";
import CreateLaptop from '../../actions/asset/CreateLaptop';
import { connect } from 'react-redux';
import { getCategories } from '../../../actions/assetAction';

class CreateAsset extends Component {

    constructor(){
        super();

        this.state = {
            selectOpt: ''
        };

        this.getSelectOpt = this.getSelectOpt.bind(this);
    }

    getSelectOpt = event => {
        this.setState({
            selectOpt: event.target.value
        });

         console.log(this.state.selectOpt);
    }

    componentWillMount() {
        this.props.getCategories();
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
                                    <select className="form-control" onChange={this.getSelectOpt}>
                                    <option></option>
                                        {
                                            this.props.categories.map((props,index) =>
                                            <option key={'cate_'+index}>{props.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                <CreateLaptop/>
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

const mapStateToProps = state => ({
    categories: state.categories.categoryList
  })
  
  export default connect(mapStateToProps, { getCategories })(CreateAsset);