import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import DisplayVehicle from './Components/DisplayVehicle';
import Home from './Containers/Home';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'> 
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/vehicle' component={DisplayVehicle} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
