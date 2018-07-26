import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'normalize.css';
import Home from "./components/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Weather from "./components/Weather"



class App extends Component {
 
  render() {
    return (
      <Router>
        <div className="content">
            <Header title={"Current Weather"} />
            <div id="main">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/weather" exact component={Weather} />
              </Switch>
            </div>
            <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
