import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
 import LoginLanding from './components/Landing'; 
import Home from './pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Checkout from './pages/Test';
import Events from './pages/Events';


function App() {
 
  return (
    <div>
      <Navigation />
    {/* <LoginLanding /> */}
    {/*  <Home /> */}
    {/*<Events /> */}
    <Checkout />
    </div>
  );
}

export default App;
