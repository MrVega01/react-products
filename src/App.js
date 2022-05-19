import { useState } from 'react';
import './App.css';
import ProductBox from './components/ProductBox';
import productList from './services/productList';

function App() {
  const [tass, setTass] = useState(0);
  //Sorting
  const products = productList().sort((a, b)=> {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0
  });

  const list = products.map(product => <ProductBox products={product} tass={tass}/>);
  return (
    <div className="App">
      <div className="tassSetter">
        <h1>Inserte la tasa de hoy</h1>
        <input type="number" value={tass} onChange={ (event)=> setTass(event.target.value) }/>
      </div>
      <div className='listContainer'>
        { list }
      </div>
    </div>
  );
}

export default App;
