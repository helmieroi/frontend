import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import ListClient from './component/ListClient.jsx';
import ClientEdit from './component/ClientEdit.jsx';
import 'react-app-polyfill/stable'
class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          <Switch>
          <Route  exact={true}  path='/clients' component={ListClient}/>
          <Route path='/clients/:id' component={ClientEdit}/>
           <Route path='/projet/clients/:id' component={ClientEdit}/>
            <Route path='/' component={Home}/>
           
       
         </Switch>
        </BrowserRouter>
    )
  }
}

export default App;