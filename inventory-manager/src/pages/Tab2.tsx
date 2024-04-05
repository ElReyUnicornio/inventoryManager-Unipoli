import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AuthContext } from '../components/authContext';
import { useContext } from 'react';
import './Tab2.css';

const Tab2: React.FC = () => {
  const { logout } = useContext(AuthContext);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='Ion-padding'>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Alejandro Soto Canales</IonCardTitle>
            <IonChip color='danger'>Desarrollador</IonChip>
          </IonCardHeader>
        </IonCard>
        <IonButton expand='block'>Ver mis Registros</IonButton>
        <IonButton expand='block' onClick={logout}>Cerrar sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
