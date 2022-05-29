import {useState} from 'react';
import {getAPI} from '../services/productList';

export default function useLoadProducts(){
    const [products, setProducts] = useState([]);
//    useEffect(function(){
        getAPI()
        .then(product =>{
          setProducts(product)
        });
//    }, [setProducts]);

    return products;
}