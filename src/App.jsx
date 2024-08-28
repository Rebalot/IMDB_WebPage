import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RoutesIndex from './routes/RoutesIndex'
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [isRoutesLoaded, setIsRoutesLoaded] = useState(false);

  const handleRoutesLoadComplete = () => {
    setIsRoutesLoaded(true);
  };

  const handleRoutesLoading = () => {
    setIsRoutesLoaded(false);
  };
  useEffect(() => {
    // console.log('isRoutesLoaded',isRoutesLoaded)
  }, [isRoutesLoaded]);
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesIndex
        onLoadComplete={handleRoutesLoadComplete}
        onLoading={handleRoutesLoading}
      />
      {isRoutesLoaded && <Footer />}
    </BrowserRouter>
  );
}

export default App
