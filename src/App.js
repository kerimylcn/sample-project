import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import  Contact  from "./Pages/Contact/Contact";
import { Provider } from "mobx-react";
import initializeStores from './Stores/StoreInitializer';


function App() {
  const stores = initializeStores();

  return (
    <Provider {...stores}>
      <Router>
        <div className="App">
          <Navbar />
          <Footer />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
