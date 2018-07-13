import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import '../src/vendor/bootstrap/css/bootstrap.min.css';
import '../src/vendor/metisMenu/metisMenu.min.css';
import '../src/vendor/datatables-plugins/dataTables.bootstrap.css';
import '../src/vendor/datatables-responsive/dataTables.responsive.css';
import '../src/dist/css/sb-admin-2.css';
import '../src/vendor/font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
