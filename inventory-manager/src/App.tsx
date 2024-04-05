import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonPage,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { personCircleOutline, barChartOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import './pages/AuthPage.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/dashboard">
            <Tab1 />
          </Route>
          <Route exact path="/account">
            <Tab2 />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Inventory" href="/dashboard">
            <IonIcon aria-hidden="true" icon={barChartOutline} />
            <IonLabel>Inventario</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon aria-hidden="true" icon={personCircleOutline} />
            <IonLabel>Cuenta</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
  </IonPage>
);

export default App;
