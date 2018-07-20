import axios from 'axios';
import React from "react";
import { Code } from 'react-content-loader';

const base_url = 'http://localhost:57732/api';
const content_type = 'application/json';
const ShowAll = '?ShowAll=';
const Keyword = '?keyword=';
const OrderBy = '';
const OrderType = '';
const CurrentPage = '';

function GetWithParameter(url, param){
    return axios.get(url + param)
}

function Get(url){
    return axios.get(url)
}

function GetAPI(url){
    return axios.get(url)
    .then(function(response){
        
    console.log(response)
        return response;
    })
    .catch(function(error){
        console.log(error);
    })
}

function PostFunction(url, data){
    return axios.post(url, data)
}

function PutFunction(url, param, data){
    return axios.put(url + param, data)
}

function LoadingAndError(isLoading, isError){
    if (isLoading) {
        return <Code />;
    }
  
    if (isError) {
    return <p>{isError.message}</p>;
    }
}

class FieldName {
    Specs = 'Specification';
    Details = 'Details';
    Acctg = 'Accounting';

    Name = 'Name';

    // Common
    Model = 'Model';
    Manufacturer = 'Manufacturer';
    AssetTag = 'Asset Tag';
    Category = 'Category';
    Status = 'Status';
    AssignedTo = 'Assigned To';
    IP = 'IP Address';
    Notes = 'Notes';
    PO = 'Purchase Order (PO)';
    Receipt = 'Delivery Receipt (DR)';
    Invoice = 'Sales Invoice (SI)';
    DDate = 'Delivery Date';
    PCost = 'PurchaseCost';
    Supplier = 'Supplier';

    // LAPTOP: Specification
    LaptopSN = 'Laptop Serial Number';
    BatterySN = 'Battery Serial Number';
    AdapterSN = 'Adapter Serial Number';
    CPU = 'CPU';
    RAM = 'RAM';
    DISK = 'Disk';
    Videocard = 'Video Card';
    MAC = 'MAC Address';
    OS = 'OS Version';
    LicenseKey = 'License Key';

    // LAPTOP: Details
    HostName = 'Host Name';

    // MONITOR: Specification
    MonitorSN = 'Monitor Serial Number';

    // MONITOR: Details
    AssetName = 'Asset Name';
}

export default {
    BASE_URL : base_url,
    CONTENT_TYPE : content_type,
    OrderBy : OrderBy,
    OrderType : OrderType,
    CurrentPage : CurrentPage,
    ShowAll: ShowAll,
    Keyword : Keyword,
    GetWithParameter : GetWithParameter,
    Get : Get,
    PostFunction : PostFunction,
    PutFunction : PutFunction,
    Id: '/',
    Assets : '/Assets',
    Models: '/Models',
    Categories : '/Categories',
    Manufacturers : '/Manufacturers',
    Processors : '/Processors',
    Sizes : {
        Harddisk : '/sizes/harddisk',
        Memory : '/sizes/memory',
        Videocard : '/sizes/videocard',
    },
    Suppliers : '/Suppliers',
    Status : '/statustypes',
    FieldName: new FieldName(),
    GetAPI: GetAPI,
    LoadingAndError: LoadingAndError,
}