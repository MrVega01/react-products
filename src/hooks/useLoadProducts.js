import {useState, useEffect} from 'react';
import {getAPI} from '../services/productList';

export default function useLoadProducts(updated, deleted){
  console.log(updated, deleted);
    const [products, setProducts] = useState([]);
    useEffect(function(){
        getAPI()
        .then(product =>{
          setProducts(product)
        });
    }, [updated, deleted]);

    return products;
}