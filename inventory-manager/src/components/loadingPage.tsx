import { IonContent, IonSpinner } from '@ionic/react';
import './loadingPage.css'

const LoadingPage: React.FC = () => {
    return (
        <IonContent>
            <div className="loading-container">
                <IonSpinner name="dots" />
                <p>Loading...</p>
            </div>
        </IonContent>
    );
};

export default LoadingPage;