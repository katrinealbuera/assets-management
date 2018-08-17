const base_url = 'http://localhost:56253/api';
const content_type = 'application/json';
const ShowAll = '?ShowAll=';
const Keyword = 'Keyword=';
const OrderBy = 'OrderBy=';
const OrderType = 'OrderType=';
const CurrentPage = 'CurrentPage=';
const AssetsOrderBy = '/assets_orderby';
const AssetsOrderType = '/assets_ordertype';

export default {
    BASE_URL : base_url,
    CONTENT_TYPE : content_type,
    OrderBy : OrderBy,
    OrderType : OrderType,
    CurrentPage : CurrentPage,
    ShowAll: ShowAll,
    Keyword : Keyword,
    AssetsOrderBy: AssetsOrderBy,
    AssetsOrderType: AssetsOrderType,
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

    requiredInput: {
        color: 'red'
        },
    styleCloseBtn: {
        marginLeft : '2px',
        width: '100px'
        },
    welcomeColor: {
        color: '#337ab7',
        fontWeight: 'bold'
    },
    rootStyle: {
        textAlign: 'center',
        fontSize: '100px',
        color: 'red',
        margin: '250px 0 -10px',
        paddingBottom: '15px',
    },
    pStyle: {
        textAlign: 'center',
        fontSize: '20px',
    },
    isUpdated: {
        border: '1px solid green'
    }
}