import '../App.css'
import './Components/Calculator'
import './Components/Clock'
import Clock from './Components/Clock'
import React, { useEffect, useState } from 'react'
import Calculator from './Components/Calculator'
import { fetchProducts } from '../services/api'
import { fetchProduktByBarcode } from '../services/api';
import { closeWarenkorb } from '../services/api'; 
import { addProduktToWarenkorb } from '../services/api';


function Home() {
  const [warenListe, setWarenListe] = useState<any[]>([])
  const [anzahlLeererZeilen, setAnzahlLeererZeilen] = useState(0)


  useEffect(() => {
    fetchProducts()
      .then((data: React.SetStateAction<any[]>) => setWarenListe(data))
      .catch((err: any) => console.error("Fehler beim Laden der Produkte:", err))
  }, [])

  useEffect(() => {
    const berechneLeereZeilen = () => {
      const zeilenHoehe = 40
      const tabellenHoehe = window.innerHeight * 0.6
      const maxZeilen = Math.floor(tabellenHoehe / zeilenHoehe) - 2
      const leer = maxZeilen - warenListe.length
      setAnzahlLeererZeilen(leer > 0 ? leer : 0)
    }

    berechneLeereZeilen()
    window.addEventListener('resize', berechneLeereZeilen)
    return () => window.removeEventListener('resize', berechneLeereZeilen)
  }, [warenListe])

  async function handleBarcodeScan(barcode: string) {
    try {
      const response = await addProduktToWarenkorb(barcode);
      console.log('Erfolg:', response);
      // hier z. B. UI aktualisieren
    } catch (error) {
      console.error('Fehler beim Hinzufügen zum Warenkorb:', error);
    }
  }

  const [produkte, setProdukte] = useState<any[]>([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const handleBarcodeSubmit = async () => {
    const cleanedBarcode = barcodeInput.trim();
  
    if (!cleanedBarcode) return;
  
    try {
      console.log("Sende Barcode an API:", cleanedBarcode);
      const produkt = await fetchProduktByBarcode(cleanedBarcode);
      if (produkt) {
        setProdukte(produkt);
      } else {
        console.log("Kein Produkt gefunden");
        setProdukte(null);
      }
    } catch (error) {
      console.error("Fehler beim Laden des Produkts:", error);
      setProdukte(null);
    }
  
    setBarcodeInput(""); // Eingabefeld leeren
  };
  

  const produktHinzufuegen = async () => {
    try {
      const cleanedBarcode = barcodeInput.trim();
      if (!cleanedBarcode) return;
  
      const produkt = await fetchProduktByBarcode(cleanedBarcode);
      if (produkt) {
        setProdukte(prev => [...prev, produkt]);
        await addProduktToWarenkorb(cleanedBarcode);
        setBarcodeInput('');
      } else {
        alert('Produkt nicht gefunden.');
      }
    } catch (error) {
      console.error('Fehler beim Laden oder Speichern des Produkts:', error);
      alert('Fehler beim Laden oder Speichern des Produkts.');
    }
  };
  
    

  const gesamtBetrag = produkte.reduce((summe, item) => summe + item.price, 0);

  const [zeigeButtons, setZeigeButtons] = useState(false)
  const handleKlick = () => setZeigeButtons(true)
  const produkteLoeschen = () => setProdukte([])

  const [zeigeKartenInfo, setZeigeKartenInfo] = useState(false)
  const [zeigeBarInfo, setZeigeBarInfo] = useState(false)
  const [zeigePunkteInfo, setZeigePunkteInfo] = useState(false)

  const handleKarteKlick = () => setZeigeKartenInfo(true)
  const handleBarKlick = () => setZeigeBarInfo(true)
  const handlePunkteKlick = () => setZeigePunkteInfo(true)

  const handleClosePopup = () => {
    setZeigeKartenInfo(false)
    setZeigeBarInfo(false)
    setZeigePunkteInfo(false)
  }

  const handleBezahlung = async () => {
    try {
      const result = await closeWarenkorb();
      console.log("Warenkorb geschlossen:", result);
      setProdukte([]);
    } catch (err) {
      console.error("Fehler beim Schließen des Warenkorbs:", err);
    }
  }; 


  return (
    <>
      <header className='header'>
        <div className="logo-container">
          <img src="/Logo.png" alt="Logo" />
        </div>
        <h1 className='titel'>Supermarktkasse</h1>
        <Clock/>
      </header>

      <div className='gesamt'>
        <div className='links'>
        <input className='Suchfeld'
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyDown={(e) => {
              if (e.key === 'Enter') produktHinzufuegen();
              }}
            placeholder="Barcode eingeben oder scannen..."
            />
          <div className='waren-tabelle-wrapper'>
            <table className="waren-tabelle">
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th>Preis</th>
                  <th>Menge</th>
                  <th>Gesamt</th>
                </tr>
              </thead>
              <tbody>
              {produkte.map((item, index) => (
                <tr>
                <td className='itemName'>{item.name}</td>
                <td>{item.price?.toFixed(2) ?? "–"} €</td>
                <td className='itemAnzahl'>1</td>
                <td>{item.price?.toFixed(2) ?? "–"} €</td>
              </tr>              
              ))}


                {Array.from({ length: anzahlLeererZeilen }).map((_, index) => (
                  <tr key={`leer-${index}`}>
                    <td colSpan={4}></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}><strong>Gesamtbetrag</strong></td>
                  <td><strong>€{gesamtBetrag.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className='knopf'>
            <button className='bezahlung' onClick={(produkteLoeschen)}>Abbrechen</button>
            <button className='bezahlung' onClick={handleKlick}>Bezahlen</button>
            <div className="barcode-eingabe" style={{ marginTop: '1rem' }}>
          </div>
          </div>
        </div>
        <div className='rechts'>
          {zeigeButtons && (
            <div className='zahlungsArten-wrapper'>
              <div className='zahlungsArten'>
                <button className='karte' onClick={handleKarteKlick}>Kartenzahlung</button>
                <button className='bar' onClick={handleBarKlick}>Barzahlung</button>
                <button className='punkte' onClick={handlePunkteKlick}>Punktezahlung (Kundenkarte)</button>

                {zeigeKartenInfo && (
                  <div className='karteInfo'>
                    <p>Bitte folgen Sie den Anweisungen auf dem Kartenlesegerät.</p>
                    <button className='Bezahlung' onClick={handleBezahlung}>Bezahlen</button>
                    <button className='closePopup' onClick={handleClosePopup}>Schließen</button>
                  </div>
                )}
                {zeigeBarInfo && (
                  <div className='karteInfo'>
                    <p>Bitte das erhaltene Bargeld eintragen.</p>
                    <button className='Bezahlung' onClick={handleBezahlung}>Bezahlen</button>
                    <button className='closePopup' onClick={handleClosePopup}>Schließen</button>
                  </div>
                )}
                {zeigePunkteInfo && (
                  <div className='karteInfo'>
                    <p>Bitte geben Sie die Pin ein.</p>
                    <button className='Bezahlung' onClick={handleBezahlung}>Bezahlen</button>
                    <button className='closePopup' onClick={handleClosePopup}>Schließen</button>
                  </div>
                )}
              </div>

              {!zeigeKartenInfo && !zeigeBarInfo && !zeigePunkteInfo && (
                <button className='abbrechen' onClick={() => setZeigeButtons(false)}>Abbrechen</button>
              )}

              {zeigeBarInfo && (
                <div>
                  <Calculator betrag={gesamtBetrag} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
