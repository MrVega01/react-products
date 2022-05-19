import './styles.css';

export default function ProductBox({products, tass}){
    return(
        <div className="productBox">
            <h2>{products.name}</h2>
            <h3>{(tass * products.price).toFixed(2)}Bs</h3>
            <h3>{products.price}$</h3>
        </div>
    );
}