import { BrowserRouter, Routes, Route } from 'react-router'
import FrontPage from './components/FrontPage'
import DataPage from './components/DataPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
