// src/App.js

import React, { useEffect, useState } from "react";
import { fetchProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => console.error("API Fehler:", err));
  }, []);

  return (
    <div>
      <h1>Produktliste</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

<div className="barcode-eingabe">
  <input
    type="text"
    value={barcodeInput}
    onChange={(e) => setBarcodeInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') produktHinzufuegen();
    }}
    placeholder="Barcode scannen oder eingeben"
    autoFocus
  />
</div>


export default App;
