import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import CargarActuaciones from '../pages/CargarActuaciones';
import VerEditTram from '../pages/VerEditTram';
import VerImpAfor from '../pages/VerImpAfor';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/cargaractuaciones" component={CargarActuaciones}/>
        <Route exact path="/VerEditTram" component={VerEditTram}/>
        <Route exact path="/VerImpAfor" component={VerImpAfor}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
