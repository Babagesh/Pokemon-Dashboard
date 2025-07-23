import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout.jsx'
import NotFound from './routes/NotFound.jsx'
import PokemonPage from './routes/PokemonDetail.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index={true} element={<App />}/>
          <Route path='PokemonPage/:pokemon'element={<PokemonPage />}/>
        </Route>
        <Route path='*' element={<NotFound />}/>
    </Routes>
  </BrowserRouter>
)
