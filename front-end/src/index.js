import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import thunk from 'redux-thunk'
import Root from './containers/Root';
import { createStore, applyMiddleware } from "redux";
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

//import React from 'react';
//import ReactDOM from 'react-dom';
//import App from './containers/App';
//import './index.css'; // 스타일 입힘 엔트리에서 적용해도 되는 듯???
//import {Home, Login, Register} from './containers';
//import {Router, Route, browserHistory, IndexRoute} from 'react-router';
//import {AppContainer} from 'react-hot-loader';

render(
    <AppContainer>
        <Root store={store} history={history}/>
    </AppContainer>, document.getElementById('root')
);

if (module.hot) {
    console.log('*****************************111');
    module.hot.accept('./containers/Root', () => {
        console.log('*****************************222');
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        )
    })
}

// console.error = (() => {
//     const error = console.error;
//     return function (exception) {
//         (exception && typeof exception === 'string' && exception.match(/change <Router /))? undefined : error.apply(console, arguments)
//     }
// })();

// ReactDOM.render(
//     <AppContainer>
//         <Router history={browserHistory}>
//             <Route path="/" component={App}>
//                 <IndexRoute component={Home}/>
//                 <Route path="home" component={Home}/>
//                 <Route path="login" component={Login}/>
//                 <Route path="register" component={Register}/>
//             </Route>
//         </Router>
//     </AppContainer>,
//     document.getElementById('root')
// );
//
// class Router3 extends React.Component {
//     render() {
//         return (
//             <Route path="/" component={App}>
//                 <IndexRoute component={Home}/>
//                 <Route path="home" component={Home}/>
//                 <Route path="login" component={Login}/>
//                 <Route path="register" component={Register}/>
//             </Route>);
//     }
// }
//
// if (module.hot) {
//     console.log('**************************************1');
//     module.hot.accept('./containers/', () => {
//         console.log('**************************************2');
//         const NextApp = require('./containers/').default;
//         const Next = new Router3();
//         console.log(Router3);
//         // console.log(NextApp);
//         ReactDOM.render(
//             <AppContainer>
//                     {/*<NextApp />*/}
//                 <Router3/>
//             </AppContainer>,
//             document.getElementById('root')
//         );
//     });
// }

// import React from 'react';
// import ReactDOM from 'react-dom';
// import {App, Home, Login, Register} from './containers';
//
// const rootElement = document.getElementById('root');
// ReactDOM.render(
//     <AppContainer>
//         <App />
//     </AppContainer>, rootElement);
//
// // if (module.hot) {
// //     module.hot.accept();
// // }
//
//
// if (module.hot) {
//
//     module.hot.accept('./containers/App', () => {
//         const NextApp = require('./containers/App').default;
//         ReactDOM.render(
//             <AppContainer>
//                 <NextApp />
//             </AppContainer>,
//             document.getElementById('root')
//         );
//     });
// }