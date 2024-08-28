import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RoutesIndex from './routes/RoutesIndex'
import Navbar from "./components/Navbar";
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <RoutesIndex />
      <Footer/>
    </BrowserRouter>
  )
}

export default App
