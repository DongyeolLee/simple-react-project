import React from 'react';
import {Home, Login, Register, Wall} from './containers';
import App from './containers/App';
import { Route, IndexRoute} from 'react-router';

// class Root extends React.Component {
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

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home}/>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="wall/:username" component={Wall}/>
    </Route>
);

//export default Root;
