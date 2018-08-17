import React from 'react';
import setup from '../../actions/setup/api';
import fieldname from '../../actions/setup/FieldNameResource';
import { CommonPager } from '../common/pager';

export function CommonResetBtn(onClick) {
    return (
        <input type="button" className="btn btn-info" style={setup.styleCloseBtn}
            value="Clear" onClick={onClick}/>
    )
}

export function CommonSubmitBtn(className, value, onClick) {
    return (
        <input type="button" className={className} style={setup.styleCloseBtn} 
            value={value} onClick={onClick}/>
    )
}

export const CommonKeywordSearch = (type, name, onChange) => {
    return (
        <input type={type} placeholder="Keyword" name={name}
            className="btn btn-default col-xs-4 .col-sm-4" onChange={onChange} onInput={onChange}/>
    )
}

export const CommonInputText = (labelName, type, name, onChange, maxLength = null, isRequired = false, defaultValue = null) => {
    return (
    <div className="form-group">
        <label>{labelName}{isRequired ? <span style={setup.requiredInput}> *</span>: null}</label>

        <input className="form-control" type={type} name={name} defaultValue={defaultValue}
            onChange={onChange} maxLength={maxLength}/>
    </div>
    )
}

export const CommonOnInputText = (labelName, type, name, onChange, onInput, maxLength = null, isRequired = false, defaultValue = null) => {
    return (
    <div className="form-group">
        <label>{labelName}{isRequired ? <span style={setup.requiredInput}> *</span>: null}</label>

        <input className="form-control" type={type} name={name} defaultValue={defaultValue}
            onChange={onChange} onInput={onInput} maxLength={maxLength}/>
    </div>
    )
}

export function CommonSelectInputSize(labelName, name, onChange, props, hasSize = false, isRequired = false, defaultValue = null) {
    return (
    <div className="form-group">
        <label>{labelName} {isRequired ? <span style={setup.requiredInput}> *</span>: null}</label>

        <select className="form-control" onChange={onChange} name={name} defaultValue={defaultValue}>
            <option value="0"></option>
            {
                props.map((props, index) =>
                <option key={`${name}_${index}`} value={props.id}>{props.size} {hasSize ? fieldname.FieldName.GBUnit : false}</option>)
            }
        </select>
    </div>
    )
}

export function CommonSelectStatus(labelName, name, onChange, props, defaultValue = null) {
    return(
    <div className="form-group">
        <label>{labelName}<span style={setup.requiredInput}> *</span></label>
        <select className="form-control" onChange={onChange} name={name} defaultValue={defaultValue}>
            <option value="0"></option>
            {
                props.map((props, index) =>
                <option key={`${name}_${index}`} value={props.value}>{props.name}</option>)
            }
        </select>
    </div>
    )
}

export function CommonSelectInputName(labelName, name, onChange, props, isRequired = false, defaultValue = null) {
    return (
    <div className="form-group">
        <label>{labelName} {isRequired ? <span style={setup.requiredInput}> *</span>: null}</label>

        <select className="form-control" onChange={onChange} name={name} defaultValue={defaultValue}>
            <option value="0"></option>
            {
                props.map((props, index) =>
                <option key={`${name}_${index}`} value={props.id}>{props.name}</option>)
            }
        </select>
    </div>
    )
}

export function CommonOrderDropdown(name, optionTitle, onChange, props) {
    return (
        <select className="btn btn-default col-xs-4 .col-sm-4" onChange={onChange} name={name}>
            <option value="0">{optionTitle}</option>
            {
                props.map((props, index) =>
                <option key={`${name}_${index}`} value={props.value}>{props.name}</option>)
            }
        </select>
    )
}

export function CommonRegisterForm(title, totalPage, currentPage, total, onPageChange, listItem, isUser = false)  {
    return(
    <div className="col-lg-6">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <p> List of {title} </p>
          </div>
            <div className="panel-body">
                <div className="table table-striped table-hover table-borderless">
                    <form>
                    <table className="table table-hover">
                        <thead>
                            { !isUser ?
                                <tr>
                                    <th>ID</th>
                                    <th>{title}</th>
                                    <th>Edit</th>
                                </tr>
                            :
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>UserName</th>
                                    <th>Edit</th>
                                </tr>
                        }
                        </thead>
                        <tbody>
                            {listItem}
                        </tbody>
                    </table>
                    { (totalPage && currentPage) 
                        && CommonPager(total, currentPage, onPageChange) }
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export const CommonRegisterFormHeader = (errorMessage) => {
    return(
        errorMessage ? <p className="alert alert-danger">{errorMessage}</p>: null
    )
}

export const CommonInputName = (type, name, defaultValue, onChange, error) => {
    return(
    <div>
        <input type={type} name={name} className="form-control" defaultValue={defaultValue} 
            onChange={onChange}/>
        <p style={setup.requiredInput}>{error}</p>
    </div>
    )
}

export const CommonSuccessMessage = (action) => {
    return(
        <div className="alert alert-warning">
            <p className="fa fa-check">  Successfully {action} !</p>
        </div>
    )
}

export const CommonUpdateName = (propsId, propsName, stateNameId, onChange, error) => {
    return (
        (propsId === stateNameId) ? 
            <td className="col-lg-6">
              <input type="text" 
                    name="name" 
                    className="form-control"
                    defaultValue={propsName} 
                    onChange={onChange}/>
               <p style={setup.requiredInput}>{error}</p>
            </td>
          :
            <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{propsName}</p></td>     
    )
}

export const CommonUpdateNameBtn = (value, onClick) => {
    return (
        <input type="submit" 
            value={value} 
            className="btn btn-info"
            onClick={onClick}/>
    )
}