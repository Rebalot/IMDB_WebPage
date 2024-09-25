import { BrowserRouter } from 'react-router-dom';
import RoutesIndex from './routes/RoutesIndex';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import './App.css';
import { useLoading, LoadingProvider } from './contexts/LoadingContext';

function AppContent() {
  const { isRoutesLoaded } = useLoading();
  
  return (
    <BrowserRouter>
      <Navbar />
      <RoutesIndex />
      {isRoutesLoaded && <Footer />}
    </BrowserRouter>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
