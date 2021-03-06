import { useState, useEffect, useRef } from 'react';
import './App.css';
import useLoadProducts from './hooks/useLoadProducts';
import ProductBox from './components/ProductBox';
import html2canvas from 'html2canvas';
import { postAPI } from './services/productList';

function App() {
      //State
  //const [products, setProducts] = useState("");

  const [tass, setTass] = useState(0);
  const [list, setList] = useState("");
  
  const [image, setImage] = useState('');

  const [updated, setUpdated] = useState('');
  const [deleted, setDeleted] = useState('');
      //Ref

  const listContainer = useRef();

  const productName = useRef();
  const productPrice = useRef();

  //DOWNLOAD IMAGE
  const downloadScreenshot = ()=>{
    html2canvas(listContainer.current, {logging:"false"})
    .then((canvas) => {
        const url = canvas.toDataURL();
        setImage(url);
    });
  }
  useEffect(()=>{
    if(image){
        const a = document.createElement("a");
        a.href = image;
        a.download = 'precios-mis-tesoros';
        a.click();
    }
  }, [image]);

  //SHOWING 
  let products = useLoadProducts(updated, deleted);
  
  //useLoadProducts();

  //UPLOADING
  const uploadProduct = (event)=>{
    event.preventDefault();
    const name = productName.current.value;
    const price = productPrice.current.value;
    setUpdated( postAPI({name: name, dollarPrice: Number(price), type: "Producto"}) );
  }

  useEffect(()=>{
    if(products){
      let sortProducts = products.sort((a, b)=>{
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setList( sortProducts.map(product => <ProductBox key={product.id} products={product} tass={tass} deleted={setDeleted}/>) );
    }
  }, [products, tass, updated, deleted]);

  return (
    <div className="App">
      <div className="tassSetter">
        <div>
          <h1>Inserte la tasa de hoy</h1>
          <input type="number" value={tass} onChange={ (event)=> setTass(event.target.value) }/>
        </div>
          <svg onClick={downloadScreenshot} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 487 487">
          <g><g><path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
			    M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
			    v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
			    M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
			    M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"/>
	        </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
      </div>
      <div>
        <form>
          <input type="text" ref={productName} placeholder='Nombre del producto'/>
          <input type="number" ref={productPrice} placeholder='Precio en d??lares'/>
          <input type="submit" onClick={uploadProduct}/>
        </form>
      </div>
      <div className='listContainer' ref={listContainer}>
        { list }
      </div>
    </div>
  );
}

export default App;
