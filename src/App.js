import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin/Admin';
import Checkout from './components/Checkout/Checkout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  return (
      <div className="App">
          <userContext.Provider value={[currentUser, setCurrentUser]}>
              <Router>
                  <Switch>
                      <Route exact path="/">
                          <Nav />
                          <Home />
                      </Route>
                      <PrivateRoute path="/orders">
                          <Nav />
                          <Orders />
                      </PrivateRoute>
                      <PrivateRoute path="/checkout">
                          <Nav />
                          <Checkout />
                      </PrivateRoute>
                      <PrivateRoute path="/admin">
                          <Admin />
                      </PrivateRoute>
                      <Route path="/login">
                          <Nav />
                          <Login />
                      </Route>
                  </Switch>
              </Router>
          </userContext.Provider>
      </div>
  );
}

export default App;
