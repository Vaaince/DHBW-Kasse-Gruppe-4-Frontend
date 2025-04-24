import React, { useEffect, useState } from 'react';

function Clock(){
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
        <h1 className='datumUhrzeit'>{datumUhrzeit}</h1>
        </>
    )
}
export default Clock;