import { useMutation, useQuery } from 'react-query';
import '../App.css'
import { useState } from 'react';

interface FormData {
  name: string,
  street: string,
  houseNr: string,
  city: string,
  zipCode: string,
  country: string,
  legalForm: string
}

function BrandAdmin() {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [houseNr, setHouseNr] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [legalForm, setLegalForm] = useState('');

  const url = `http://localhost:8080/brands`;
  const mutation : any = useMutation<any, Error, FormData>(async (formData) => {
    const requestOptions = {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch(url, requestOptions).then((res) => res.json())
  });

  const handleSubmit = () => {
    const formData = {
      name,
      street,
      houseNr,
      city,
      zipCode,
      country,
      legalForm
    };
    mutation.mutate(formData);
  }

  if(mutation.isLoading) {
    return (
      <h1>Loading!</h1>
    )
  }

  if(mutation.isError) {
    return (
      <h1>Error!</h1>
    )
  }

  return (
    <>
      <h1>Brands:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label>Street: </label>
          <input 
            type="text" 
            value={street} 
            onChange={(e) => setStreet(e.target.value)} 
          />
        </div>
        <div>
          <label>House Nr: </label>
          <input 
            type="text" 
            value={houseNr} 
            onChange={(e) => setHouseNr(e.target.value)} 
          />
        </div>
        <div>
          <label>City: </label>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
          />
        </div>
        <div>
          <label>Zip Code: </label>
          <input 
            type="text" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
          />
        </div>
        <div>
          <label>Country: </label>
          <input 
            type="text" 
            value={country} 
            onChange={(e) => setCountry(e.target.value)} 
          />
        </div>
        <div>
          <label>Legal Form: </label>
          <input 
            type="text" 
            value={legalForm} 
            onChange={(e) => setLegalForm(e.target.value)} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default BrandAdmin
