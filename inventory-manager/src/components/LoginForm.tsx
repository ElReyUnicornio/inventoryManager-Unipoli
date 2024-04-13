import { useContext } from 'react';
import { IonPage, IonCardContent, IonInput, IonButton} from '@ionic/react';
import { AuthContext } from './authContext';
import { LoginData } from '../types/hooks/useAuth';
import useForm from '../hooks/useForm';

const LoginForm: React.FC = () => {
    const {formData, errors, isValid, handleChange} = useForm({'enrollment': '', 'password': ''});
    const { login } = useContext(AuthContext);

    const handleSubmit = () => {
        console.log(formData)
        login(formData as LoginData);
    };

    return (
        <IonCardContent className='card-content'>
            <form>
                <IonInput
                    label="Matrícula"
                    className={errors?.enrollment && 'ion-invalid ion-touched'}
                    labelPlacement="floating"
                    counter={true}
                    maxlength={10}
                    fill="outline"
                    name='enrollment'
                    onIonChange={handleChange}
                    errorText={errors?.enrollment}
                />
                <br></br>
                <IonInput
                    label="Contraseña"
                    className={errors?.password && 'ion-invalid ion-touched'}
                    labelPlacement="floating"
                    fill="outline"
                    type="password"
                    name='password'
                    onIonChange={handleChange}
                    errorText={errors?.password}
                />
                <br></br>
                <IonButton expand='block' onClick={handleSubmit} disabled={!isValid}>Enviar</IonButton>
            </form>
        </IonCardContent>
    );
};

export default LoginForm;