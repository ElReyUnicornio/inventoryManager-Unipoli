import { IonPage, IonHeader, IonToolbar, IonTitle, IonRouterOutlet, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonSegment, IonSegmentButton } from "@ionic/react";
import React, { useContext, useState } from "react";
import './AuthPage.css';
import LoginForm from "../components/LoginForm";
import bannerImg from "../assets/banner.jpg";
import SignupForm from "../components/SignupForm";

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import { AuthContext } from "../components/authContext";
import LoadingPage from "../components/loadingPage";

const AuthPage: React.FC = () => {
  const [segment, setSegment] = useState(1);
  const { loading } = useContext(AuthContext)
  
  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Gestor de inventario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
              <br></br><br></br>
              <IonCard className="card">
                  <img src={bannerImg} alt="Space image" className="banner-image" />
                  <IonCardHeader>
                      <IonSegment value={segment}>
                        <IonSegmentButton value={1}
                          onClick={() => setSegment(1)}>
                          <IonCardTitle>Iniciar Sesión</IonCardTitle>
                        </IonSegmentButton>
                        <IonSegmentButton value={2}
                          onClick={() => setSegment(2)}>
                          <IonCardTitle>Registrarse</IonCardTitle>
                        </IonSegmentButton>
                      </IonSegment>
                  </IonCardHeader>
                  {segment === 1 ? <LoginForm></LoginForm> : <SignupForm></SignupForm>}
              </IonCard>
          </IonContent>
    </IonPage>
  );
}

export default AuthPage;