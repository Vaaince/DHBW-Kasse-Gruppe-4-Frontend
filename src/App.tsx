import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom';
import Brand from './pages/Brand';
import BrandAdmin from './pages/BrandAdmin';

function App() {

  const queryClient = new QueryClient();

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
