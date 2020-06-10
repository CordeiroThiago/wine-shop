import React from 'react';
import WineShop from './pages/WineShop'
import RegisterWine from './pages/RegisterWine'
import Nav from './components/Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/register-wine" component={RegisterWine} />
          <Route path="/" component={WineShop} />
        </Switch>
        <ToastContainer
          position="bottom-left"
          autoClose={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
        />
      </div>
    </Router>
  );
}

export default App;