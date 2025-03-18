import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom';
import Brand from './pages/Brand';
import BrandAdmin from './pages/BrandAdmin';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,
        cacheTime: 600000,
      },
    },
  });
  
  const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });
  
  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brand />} />
          <Route path="/admin/brands" element={<BrandAdmin />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
