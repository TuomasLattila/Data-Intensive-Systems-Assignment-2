import { BrowserRouter, Routes, Route } from 'react-router'
import FrontPage from './Pages/FrontPage'
import DataPage from './Pages/DataPage'

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
