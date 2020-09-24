import React,{Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './components/main';
import Product from './components/product';
import Usuario from './components/usuario';
import Login from './components/login';
//import CadastrarProduto from './components/cadastrarProd';
//<Route path = '/cadastrar_produtos' component = {}/>

export default class Routes extends Component{
    render(){
        return(
            <BrowserRouter> 
                <Switch>
                    <Route exact path = '/' component = {Login}/>
                    <Route path = '/product/:id' component = {Product}/>
                    <Route path = '/main' component = {Main}/>
                    <Route path = '/usuario' component = {Usuario}/>
                   
                </Switch>
            </BrowserRouter>
        )
    }
}