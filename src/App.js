import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
<<<<<<< Updated upstream
import LoginLanding from './components/Landing';
=======
 import LoginLanding from './components/Landing'; 
import Home from './pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Checkout from './pages/Test';
import Events from './pages/Events';


>>>>>>> Stashed changes
function App() {
 
  return (
    <div>
      <Navigation />
<<<<<<< Updated upstream
      <LoginLanding />
=======
    {/* <LoginLanding /> */}
    {/*  <Home /> */}
    {/*<Events /> */}
    <Checkout />
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
