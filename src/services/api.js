// src/services/productService.js

const API_BASE_URL = "http://localhost:8080";

export async function fetchProducts() {
  const response = await fetch("http://localhost:8080/product");
  if (!response.ok) {
    throw new Error("Fehler beim Laden der Produkte");
  }
  return await response.json();
}

export async function addProduktToWarenkorb(barcode) {
  try {
    const response = await fetch('http://localhost:8080/warenkorb/addByBarcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ barcode }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Fehler beim Hinzufügen des Produkts');
    }

    return await response.text(); // oder .json() falls du JSON zurückgibst
  } catch (error) {
    console.error('Fehler beim Hinzufügen zum Warenkorb:', error);
    throw error;
  }
}


export async function fetchProduktByBarcode(barcode) {
  console.log("→ API-Request an:", `http://localhost:8080/product/barcode/${barcode}`);  
  try {
    const response = await fetch(`http://localhost:8080/product/barcode/${barcode}`);
    if (!response.ok) {
      throw new Error('Produkt nicht gefunden');
    }
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Abrufen des Produkts:', error);
    return null;
  }
}

export async function closeWarenkorb() {
  try {
    const response = await fetch("http://localhost:8080/warenkorb/close", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Fehler beim Schließen des Warenkorbs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Close-Aufruf:", error);
    throw error;
  }
}  


