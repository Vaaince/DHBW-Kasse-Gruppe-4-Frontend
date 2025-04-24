import React, { useState } from 'react';
import '../../Calculator.css';

const geldEinheiten = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

interface CalculatorProps {
    betrag: number;
}

function Calculator({ betrag }: CalculatorProps) {
  const [zuZahlen, setZuZahlen] = useState<number>(0);
  const [gegeben, setGegeben] = useState<number>(0);
  const [rueckgeld, setRueckgeld] = useState<number>(0);
  const [wechselgeld, setWechselgeld] = useState<{ [key: number]: number }>({});

  const berechneRueckgeld = (gesamtGegeben: number) => {
    const rueck = parseFloat((gesamtGegeben - betrag).toFixed(2));
    setRueckgeld(rueck);
    const result: { [key: number]: number } = {};
    let rest = rueck;

    for (const einheit of geldEinheiten) {
      const anzahl = Math.floor(rest / einheit);
      if (anzahl > 0) {
        result[einheit] = anzahl;
        rest = parseFloat((rest - anzahl * einheit).toFixed(2));
      }
    }

    setWechselgeld(result);
  };

  const fuegeGeldHinzu = (betrag: number) => {
    const neuerBetrag = parseFloat((gegeben + betrag).toFixed(2));
    setGegeben(neuerBetrag);
    berechneRueckgeld(neuerBetrag);
  };

  const reset = () => {
    setGegeben(0);
    setRueckgeld(0);
    setWechselgeld({});
  };

  return (
    <div className="cash-container">
      <h2>Kassen-Rechner</h2>

      <div className="eingabe">
        <label>Zu zahlen (€): <strong>{ betrag.toFixed(2)}</strong></label>
      </div>

      <div className="gegeben-section">
        <p>Gegeben: € {gegeben.toFixed(2)}</p>
        <div className="geld-grid">
          {geldEinheiten.map((wert) => (
            <button key={wert} onClick={() => fuegeGeldHinzu(wert)}>
              €{wert.toFixed(2)}
            </button>
          ))}
        </div>
      </div>

      <div className="rueckgeld-section">
        <h3>Rückgeld: € {rueckgeld.toFixed(2)}</h3>
        {rueckgeld > 0 && (
          <ul>
            {Object.entries(wechselgeld).map(([wert, anzahl]) => (
              <li key={wert}>
                {anzahl} x €{parseFloat(wert).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="reset-button" onClick={reset}>
        Zurücksetzen
      </button>
    </div>
  );
}

export default Calculator;
