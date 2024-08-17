import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RoutesIndex from './routes/RoutesIndex'


function App() {
  return (
    <BrowserRouter>
      <RoutesIndex />
    </BrowserRouter>
  )
}

export default App
