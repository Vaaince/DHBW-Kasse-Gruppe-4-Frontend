import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom';
import Brand from './pages/Brand';

function App() {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brands" element={<Brand />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
