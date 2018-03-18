import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'react-select/dist/react-select.css';


ReactDOM.render(<AppContainer/>, document.getElementById('root'));
registerServiceWorker();
