import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Index from './Views/Index.jsx'


function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
