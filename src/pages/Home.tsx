import '../App.css'
import React, { useEffect, useState } from 'react'

const warenListe = [
  { id: 1, name: 'Äpfel', preis: 2.99, anzahl: 5 },
  { id: 2, name: 'Bananen', preis: 1.79, anzahl: 3 },
  { id: 3, name: 'Käse', preis: 4.99, anzahl: 2 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 5, name: 'Katzenfutter', preis: 10.00, anzahl: 1 },
  { id: 6, name: 'Flammenwerfer', preis: 100.49, anzahl: 4 },
  { id: 7, name: 'Lederjacke', preis: 1000.49, anzahl: 1 },
  { id: 1, name: 'Äpfel', preis: 2.99, anzahl: 5 },
  { id: 2, name: 'Bananen', preis: 1.79, anzahl: 3 },
  { id: 3, name: 'Käse', preis: 4.99, anzahl: 2 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 5, name: 'Katzenfutter', preis: 10.00, anzahl: 1 },
  { id: 6, name: 'Flammenwerfer', preis: 100.49, anzahl: 4 },
  { id: 7, name: 'Lederjacke', preis: 1000.49, anzahl: 1 },
  { id: 1, name: 'Äpfel', preis: 2.99, anzahl: 5 },
  { id: 2, name: 'Bananen', preis: 1.79, anzahl: 3 },
  { id: 3, name: 'Käse', preis: 4.99, anzahl: 2 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 5, name: 'Katzenfutter', preis: 10.00, anzahl: 1 },
  { id: 6, name: 'Flammenwerfer', preis: 100.49, anzahl: 4 },
  { id: 7, name: 'Lederjacke', preis: 1000.49, anzahl: 1 },
  { id: 1, name: 'Äpfel', preis: 2.99, anzahl: 5 },
  { id: 2, name: 'Bananen', preis: 1.79, anzahl: 3 },
  { id: 3, name: 'Käse', preis: 4.99, anzahl: 2 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 5, name: 'Katzenfutter', preis: 10.00, anzahl: 1 },
  { id: 6, name: 'Flammenwerfer', preis: 100.49, anzahl: 4 },
  { id: 7, name: 'Lederjacke', preis: 1000.49, anzahl: 1 },
  { id: 1, name: 'Äpfel', preis: 2.99, anzahl: 5 },
  { id: 2, name: 'Bananen', preis: 1.79, anzahl: 3 },
  { id: 3, name: 'Käse', preis: 4.99, anzahl: 2 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 5, name: 'Katzenfutter', preis: 10.00, anzahl: 1 },
  { id: 6, name: 'Flammenwerfer', preis: 100.49, anzahl: 4 },
  { id: 7, name: 'Lederjacke', preis: 1000.49, anzahl: 1 },
  { id: 7, name: 'Lederjacke', preis: 1000.49, anzahl: 1 },
]

const gesamtBetrag = warenListe.reduce((summe, item) => {
  return summe + item.preis * item.anzahl
}, 0)

function Home() {
  const [zeit, setZeit] = useState(new Date())
  const [anzahlLeererZeilen, setAnzahlLeererZeilen] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setZeit(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const berechneLeereZeilen = () => {
      const zeilenHoehe = 40
      const tabellenHoehe = window.innerHeight * 0.6
      const maxZeilen = Math.floor(tabellenHoehe / zeilenHoehe) - 2 // Header + Footer
      const leer = maxZeilen - warenListe.length
      setAnzahlLeererZeilen(leer > 0 ? leer : 0)
    }

    berechneLeereZeilen()
    window.addEventListener('resize', berechneLeereZeilen)
    return () => window.removeEventListener('resize', berechneLeereZeilen)
  }, [])

  const datumUhrzeit = zeit.toLocaleString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const [zeigeButtons, setZeigeButtons] = useState(false);

  const handleKlick = () => {
    setZeigeButtons(prev => !prev); // Toggle Sichtbarkeit

  };

  const [zeigeKartenInfo, setZeigeKartenInfo] = useState(false)

  const handleKarteKlick = () => {
    setZeigeKartenInfo(true) // Zeige die Kartenzahlungsinformationen
  }

  const handleClosePopup = () => {
    setZeigeKartenInfo(false) // Schließe das Popup
  }


  return (
    <>
      <header className='header'>
      <div className="logo-container">
        <img src="/Logo.png"></img>    
      </div>
      <h1 className='titel'>Supermarktkasse</h1>
        <h1 className='datumUhrzeit'>{datumUhrzeit}</h1>
      </header>
      <body>
      <div className='gesamt'>
      <div className='links'>
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
            {warenListe.map((item, index) => (
              <tr key={`${item.id}-${index}`}>
                <td className='itemName'>{item.name}</td>
                <td className='itemPreis'>€{item.preis.toFixed(2)}</td>
                <td className='itemAnzahl'>{item.anzahl}</td>
                <td className='itemPreis'>€{(item.preis * item.anzahl).toFixed(2)}</td>
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
          <button className='bezahlung' onClick={handleKlick}>Bezahlen</button>
      </div>
      </div>
      <div className='rechts'>
        {zeigeButtons && (
       <div className='zahlungsArten'>
        <button className='karte'onClick={handleKarteKlick}>Kartenzahlung</button>
        <button className='bar'>Barzahlung</button>
        <button className='punkte'>Punktezahlung (Kundenkarte)</button>

        {/* Das Popup wird nun über den Knöpfen angezeigt */}
        {zeigeKartenInfo && (
                  <div className='karteInfo'>
                    <p>Bitte folgen Sie den Anweisungen auf dem Kartenlesegerät.</p>
                    <button className='closePopup' onClick={handleClosePopup}>Schließen</button>
                  </div>
                )}
       </div>
       )}
      </div>
      </div>
      </body>
    </>
  )
}

export default Home