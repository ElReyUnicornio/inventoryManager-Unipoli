import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
import { Log } from "../types/logs";

type LogsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    logs: Log[] | null;
}

export default function LogsModal({isOpen, onClose, logs}: LogsModalProps) {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Logs</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {logs?.map((log, index) => (
                        <IonItem key={index}>
                            <IonLabel>
                                <h2>{log.date}</h2>
                                <p>{log.description}</p>
                                <p>{log.user}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonModal>
    )
}