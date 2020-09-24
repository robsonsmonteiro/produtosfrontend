import React, {Component} from 'react';
//mport { Route } from 'react-router-dom';
import Routes from './routes';
import Header from './components/header';

 export default class App extends Component{
   render(){
     
    return(
             <div id='App'>
              <Header/>
               <Routes/>
       </div>
     )
   }
 }