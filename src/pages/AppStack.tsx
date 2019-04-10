import React from 'react';
import MapView from './Map';
import About from './About';
import { IonTabs, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonPage } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import FishesPage from "./FishesPage";
import BranchList from "./BranchList";
import BranchDetail from "./BranchDetail";
import FishDetail from "./FishDetail";

const AppStack: React.FC = () => (
  <IonPage>
    <Route exact path="/" render={() => <Redirect to="/fishes"/>}/>
    {
    /**
     * Only render exact matches.  Only destroy on back button click
     * On history.push keep previous route stored for back button
     *
     * TabBar does a push on iontabbutton click.
     * TabBar updates the tab links based on the current route path.
     */
    }

    <IonTabs>
      <IonRouterOutlet>
        <Route path="/:tab(fishes)" component={FishesPage} exact={true} />
        <Route path="/:tab(branches)" component={BranchList} exact={true} />
        <Route path="/:tab(branches)/branch/:id" component={BranchDetail} />
        <Route path="/:tab(fishes|branches)/fishes/:id" component={FishDetail} />
        <Route path="/:tab(map)" component={MapView} />
        <Route path="/:tab(about)" component={About} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="fishes" href="/fishes">
          <IonIcon name="sunny" />
          <IonLabel>Our Fish</IonLabel>
        </IonTabButton>
        <IonTabButton tab="branches" href="/branches">
          <IonIcon name="planet" />
          <IonLabel>Branches</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/map">
          <IonIcon name="map" />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="about" href="/about">
          <IonIcon name="information-circle" />
          <IonLabel>About</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
);

export default AppStack;
