const base_url = 'http://localhost:61333/api';
const content_type = 'application/json';
const ShowAll = '?ShowAll=';
const Keyword = 'Keyword=';
const OrderBy = 'OrderBy=';
const OrderType = 'OrderType=';
const CurrentPage = 'CurrentPage=';
const AssetsOrderBy = '/assets_orderby';
const AssetsOrderType = '/assets_ordertype';

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
    Warranty = 'Warranty';
    PO = 'Purchase Order (PO)';
    Receipt = 'Delivery Receipt (DR)';
    Invoice = 'Sales Invoice (SI)';
    DDate = 'Delivery Date';
    PCost = 'Purchase Cost';
    PDate = 'Purchase Date';
    Supplier = 'Supplier';

    // LAPTOP: Specification
    SN = 'Serial Number';
    BatterySN = 'Battery Serial Number';
    MonitorSN = 'Monitor Serial Number';
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

    GBUnit = 'GB';
}

export default {
    BASE_URL : base_url,
    CONTENT_TYPE : content_type,
    OrderBy : OrderBy,
    OrderType : OrderType,
    CurrentPage : CurrentPage,
    ShowAll: ShowAll,
    Keyword : Keyword,
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
    LoginUser : '/Users/authenticate?',
    GetUser: '/Users',
    FieldName: new FieldName(),
    AssetsOrderBy: AssetsOrderBy,
    AssetsOrderType: AssetsOrderType,
    requiredInput: {
        color: 'red'
        },
    styleCloseBtn: {
        marginLeft : '10px',
        width: '100px'
        },
}