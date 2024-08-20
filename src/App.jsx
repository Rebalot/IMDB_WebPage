import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RoutesIndex from './routes/RoutesIndex'
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <RoutesIndex />
    </BrowserRouter>
  )
}

export default App
