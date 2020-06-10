import React from 'react';
import WineShop from './pages/WineShop'
import RegisterWine from './pages/RegisterWine'
import Nav from './components/Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/register-wine" component={RegisterWine} />
          <Route path="/" component={WineShop} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;