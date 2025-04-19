import '../App.css'
import React, {useEffect, useState} from 'react'

const warenListe = [
  { id: 1, name: 'Äpfel', preis: 2.99, anzahl: 5 },
  { id: 2, name: 'Bananen', preis: 1.79, anzahl: 3 },
  { id: 3, name: 'Käse', preis: 4.99, anzahl: 2 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
  { id: 4, name: 'Brot', preis: 1.49, anzahl: 1 },
]

function Home() {

  const [zeit, setZeit] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setZeit(new Date())
    }, 1000)

    return () => clearInterval(timer)
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

  return (
    <>
      <header className='header'>
        <div className='logoContainer'> 
        </div>
        <h1 className='datumUhrzeit'>Supermarktkasse {datumUhrzeit}</h1>
      </header>
      <body>
        <div className='warenkorb'>
          <h2>Warenkorb</h2>
          <div className="waren-liste">
            {warenListe.map((item) => (
              <div className="waren-item" key={item.id}>
                <p className="waren-name">{item.name} €{item.preis.toFixed(2)} Menge: {item.anzahl}</p>
              </div>
            ))}
          </div>
        </div>
      </body>
    </>
  )
}

export default Home
