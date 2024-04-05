import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AuthContext } from '../components/authContext';
import { useContext, useState } from 'react';
import './Tab2.css';
import useGetUser from '../hooks/useGetUser';
import LoadingPage from '../components/loadingPage';
import { Admin, Student } from '../types/user';
import LogsModal from '../components/LogsModal';
import useGetLogs from '../hooks/useGetLogs';

const Tab2: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const { userData, isLoading } = useGetUser();
  const { logs, getLogs, getLogsByUser } = useGetLogs()
  const [logsOpen, setLogsOpen] = useState(false);

  if (isLoading) return <LoadingPage />
  if (!userData) return <IonModal isOpen>No se ha podido cargar la información de la cuenta</IonModal>

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='Ion-padding'>
        <IonCard className='card mt-2'>
          <IonCardHeader>
            <div className='doubleInline'>
              <IonCardTitle>{userData.name}</IonCardTitle>
              <IonChip color={userData.role === 'Admin' ? 'danger' : 'warning'}>{userData.role || ''}</IonChip>
            </div>
          </IonCardHeader>
          <IonCardContent>
          <IonCardSubtitle>Matricula: {userData.enrollment || "4647676444746"}</IonCardSubtitle>
            {userData.role === 'Admin' ? (
              <IonCardSubtitle>Puesto: {(userData as Admin).position || "ejemplo@gmail.com"}</IonCardSubtitle>
            ):(
              <>
                <IonCardSubtitle>Carrera: {(userData as Student).carreer || "s2f3476dst8yfudsdkjahkj"}</IonCardSubtitle>
                <IonCardSubtitle>Cuatrimestre: {(userData as Student).quarter || "ejemplo@gmail.com"}</IonCardSubtitle>
              </>
            )}
          </IonCardContent>
        </IonCard>
        <div className='card mt-1'>
        <IonButton className='mt-1' expand='block' onClick={() => {setLogsOpen(true); getLogs()}}>Ver Registros</IonButton>
          <IonButton className='mt-1' expand='block' onClick={() => {setLogsOpen(true); getLogsByUser()}}>Ver mis Registros</IonButton>
          <IonButton className='mt-1' expand='block' onClick={logout}>Cerrar sesión</IonButton>
        </div>
      </IonContent>

      <LogsModal isOpen={logsOpen} onClose={() => {setLogsOpen(false)}} logs={logs} />
    </IonPage>
  );
};

export default Tab2;
