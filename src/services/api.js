//Software entre o BACKEND e o FRONTEND
import axios from 'axios';
const api = axios.create({
    baseURL:"https://produtosbackendrobson.herokuapp.com/"
});
export default api; //Exportar para todo o sistema