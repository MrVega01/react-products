import { deleteAPI } from '../../services/productList';
import './styles.css';

export default function ProductBox({products, tass, deleted}){
    const deleteProduct = (e)=>{
        const id = e.target.value;
        deleted( deleteAPI(id) );
    }
    
    return(
        <div className="productBox">
            <h2>{products.name}</h2>
            <h3>{(tass * products.dollarPrice).toFixed(2)}Bs</h3>
            <h3>{products.dollarPrice}$</h3>
            <button value={products.id} onClick={deleteProduct}>Borrar</button>
        </div>
    );
}