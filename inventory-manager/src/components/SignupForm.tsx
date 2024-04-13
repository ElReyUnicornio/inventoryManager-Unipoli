import { IonButton, IonCardContent, IonInput, IonSelect, IonSelectOption} from '@ionic/react';
import { useState, useContext } from 'react';
import { AuthContext } from './authContext';
import { Admin, Student, User } from '../types/user';
import useForm from '../hooks/useForm';

const SignupForm: React.FC = () => {
    const { formData, isValid, errors, handleChange } = useForm({});
    const [role , setRole] = useState<string>('');
    const { register } = useContext(AuthContext);

    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        };
        if (role === '') {
            alert('Selecciona un rol');
            return;
        }

        if (role === 'Admin') {
            const data: Admin = {
                name: (formData.name as string),
                enrollment: (formData.enrollment as string),
                password: (formData.password as string),
                role: role,
                position: (formData.position as string),
            }
            register(data);
        } else if (role === 'Student') {
            const data: Student = {
                name: (formData.name as string),
                enrollment: (formData.enrollment as string),
                password: (formData.password as string),
                role: role,
                carreer: (formData.career as string),
                quarter: (formData.quarter as number),
            }
            register(data);
        }
    }

    return (
        <IonCardContent className='card-content'>
            <form>
                <IonInput label="Nombre" 
                className={errors?.name && 'ion-invalid ion-touched'}
                    labelPlacement="floating"
                    name='name'
                    onIonChange={handleChange}
                    fill="outline"
                    errorText={errors?.name}/>
                <br></br>
                <IonInput label="Matrícula" 
                    className={errors?.enrollment && 'ion-invalid ion-touched'}
                    labelPlacement="floating"
                    name='enrollment'
                    onIonChange={handleChange}
                    counter={true}
                    maxlength={10}
                    fill="outline"
                    errorText={errors?.enrollment}/>
                <br></br>
                <IonSelect placeholder="Rol"
                    fill='outline'
                    name='role'
                    onIonChange={(e) => {setRole(e.target.value);handleChange(e)}}>
                    <IonSelectOption value="Admin">Administrador</IonSelectOption>
                    <IonSelectOption value="Student">Estudiante</IonSelectOption>
                </IonSelect>
                <br></br>
                {role === 'Admin' ? (
                    <IonInput label="Puesto"
                        labelPlacement="floating"
                        fill="outline"
                        name='position'
                        onIonChange={handleChange} />
                ) : role === 'Student' ? (
                    <div className='doubleInline'>
                        <IonSelect placeholder="Carrera"
                            fill='outline'
                            name='career'
                            onIonChange={handleChange}>
                            <IonSelectOption value="ISW">ISW</IonSelectOption>
                            <IonSelectOption value="LAGE">LAGE</IonSelectOption>
                            <IonSelectOption value="ITAM">ITAM</IonSelectOption>
                            <IonSelectOption value="IC">IC</IonSelectOption>
                            <IonSelectOption value="IRT">IRT</IonSelectOption>
                        </IonSelect>
                        <br></br>
                        <IonSelect placeholder="Cuatrimestre"
                            fill='outline'
                            name='quarter'
                            onIonChange={handleChange}>
                            <IonSelectOption value={1}>1</IonSelectOption>
                            <IonSelectOption value={2}>2</IonSelectOption>
                            <IonSelectOption value={3}>3</IonSelectOption>
                            <IonSelectOption value={4}>4</IonSelectOption>
                            <IonSelectOption value={5}>5</IonSelectOption>
                            <IonSelectOption value={6}>6</IonSelectOption>
                            <IonSelectOption value={7}>7</IonSelectOption>
                            <IonSelectOption value={8}>8</IonSelectOption>
                            <IonSelectOption value={9}>9</IonSelectOption>
                            <IonSelectOption value={10}>10</IonSelectOption>
                        </IonSelect>
                    </div>
                ): null}
                <br></br>
                <IonInput label="Contraseña"
                    className={errors?.password && 'ion-invalid ion-touched'}
                    labelPlacement="floating"
                    fill="outline"
                    type="password"
                    name='password'
                    onIonChange={handleChange}
                    errorText={errors?.password} />
                <br></br>
                <IonInput label="Confirmar Contraseña"
                    className={errors?.confirmPassword && 'ion-invalid ion-touched'}
                    labelPlacement="floating"
                    fill="outline"
                    type="password"
                    name='confirmPassword'
                    onIonChange={handleChange} 
                    errorText={errors?.confirmPassword}/>
                <br></br>
                <IonButton expand='block' onClick={handleSubmit} disabled={!isValid}>Enviar</IonButton>
            </form>
        </IonCardContent>
    )
}

export default SignupForm;