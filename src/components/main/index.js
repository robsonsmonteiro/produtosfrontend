import React,{Component} from 'react';
import './index.css';
import api from '../../services/api';
import {Link} from 'react-router-dom';


export default class Main extends Component{
    state = {       //Objeto JSON
       docs : [],   //Chave DOCS com o vetor de todos os produtos
       info: [],
       page : 1,
       nome_produto: ''
    }

    //Executa esse comando sempre que o cmponente for renderizado em tela
    componentDidMount(){ //Sempre executar o comando quando o componente for renderizado em tela
        this.loadProducts();
        //  alert ('Componente criado');
    }

    loadProducts = async(page = 1)=>{
            // Acesso ao backend
         const result = await api.get(`/produtos?&page=${page}`);
         const {docs,...info} = result.data; 
         this.setState({docs, info, page})
    }

    nextPage = async() =>{
        const {page,info} = this.state; //Desestruturar o INFO e o PAGE

        if(page === info.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }
    
    prevPage = async() =>{
        const {page} = this.state;
        if(page === 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber)
    }

    handleOnChange = event=>{
        this.setState({nome_produto : event.target.value});
    }

    searchProducts = async ()=>{
        const result = await api.get(`/produtos_nome/${this.state.nome_produto}`);
        this.setState({docs : result.data}); //Axios sempre recupera dado do API dentro do campo data
    }

    handleOnSubmit = event =>{
        event.preventDefault(); //Não deixar a página atualizar após comando.
        if(this.state.nome_produto){  //Chamar função SearchProducts se o nome for válido/preenchido
            this.searchProducts();
        }else{
            this.loadProducts();
        }
    }

    render(){
        const {info, page} = this.state; //Desestruturação
        return(
            <div className ='product-list'> 
                <div>
                    <form onSubmit={this.handleOnSubmit}>
                        <input type='text' 
                                name='nome_produto' 
                                placeholder='Pesquise pelo nome do Produto'
                                value={this.state.nome_produto}
                                onChange={this.handleOnChange}
                        />  
                        <input type='submit' hidden/>
                    </form>
                </div>
                {this.state.docs.map(product => (
                    <article key={product._id}>
                        <strong>{product.descricao}</strong>
                        <p>{product.fabricante}</p>
                        <Link to={`/product/${product._id}`} >Detalhes</Link>
                    </article>
                ))}
                <div className='actions'>
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === info.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}

