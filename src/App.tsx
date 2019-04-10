import React from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {IonApp} from '@ionic/react';
import store from "./store/store";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import AppStack from "./pages/AppStack";

const App = () => (
  <Provider store={store}>
    <Router>
      <div id="app">
        <IonApp>
            <Route path="/" component={AppStack} />
        </IonApp>
      </div>
    </Router>
  </Provider>
);

export default App;