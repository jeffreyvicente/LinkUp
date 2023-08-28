import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navbar';
 import LoginLanding from './components/Landing'; 
import Home from './pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import Events from './pages/Events';
function App() {
 
  return (
    <Router>
    <div>
      <Navigation />
    {/* <LoginLanding /> */}
    {/*  <Home /> */}
    <Events />
    </div>
    </Router>
  );
}

export default App;
