import { useQuery } from 'react-query';
import '../App.css'
import { Card, Grid2 } from '@mui/material';

function Brand() {

  const url = `http://localhost:8080/brands`;
  const {isLoading, isError, data} : any = useQuery("Brands", () => 
    fetch(url).then((res) => res.json())
  );

  if(isLoading) {
    return (
      <h1>Loading!</h1>
    )
  }

  if(isError) {
    return (
      <h1>Error!</h1>
    )
  }

  return (
    <>
      <h1>Brands:</h1>
      <Grid2 container spacing={{xs: 1, md: 2}}>
        {data?.map((brand : any) => {
          return (
            <Grid2 size={{xs: 12, md: 6}}>
              <Card>
              <h1>{brand.name}</h1>
              <h2>{brand.country}</h2>
              <h3>{brand.legalForm}</h3>
              </Card>
            </Grid2>
          )
        })}
      </Grid2>
    </>
  )
}

export default Brand
