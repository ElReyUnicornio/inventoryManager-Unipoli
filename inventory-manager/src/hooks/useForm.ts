import { InputCustomEvent, SelectCustomEvent } from '@ionic/react';
import { useState } from 'react';

type FormData = {
    [key: string]: string | number;
};

const useForm = (initialData: FormData) => {
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string}>();

    const handleChange = (e: InputCustomEvent | SelectCustomEvent ) => {
        const { name, value } = e.target;
        if (!name) return;
        if (!value) return;
        validateForm(name, value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = (name: string, value: string | number) => {
        let newErrors = {...errors};

        //validate empty fields
        if (!value) {
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: 'Debes llenar este campo',
                };
            })
            return;
        }

        switch (name) {
            //validate name field
            case 'name':
                if ((value as string).length > 50) {
                    newErrors = {
                        ...newErrors,
                        [name]: 'El nombre debe tener menos de 50 caracteres',
                    }
                } else {
                    newErrors = {
                        ...newErrors,
                        [name]: '',
                    }
                }
                break;
            //validate enrollment field
            case 'enrollment':
                if (!/^\d{1,10}$/.test(value as string)) {
                    newErrors = {
                        ...newErrors,
                        [name]: 'La matrícula solo puede contener números'
                    }
                } else if ((value as string).length !== 10) {
                    newErrors = {
                        ...newErrors,
                        [name]: 'La matrícula debe tener 10 caracteres'
                    }
                }else {
                    newErrors = {
                        ...newErrors,
                        [name]: '',
                    }
                }
                break;
            //validate password field
            case 'password':
                if ((value as string).length < 8 || (value as string).length > 20) {
                    newErrors = {
                        ...newErrors,
                        [name]: 'La contraseña debe tener entre 8 y 20 caracteres'
                    }
                } else if (!/^[a-zA-Z0-9]+$/.test(value as string)) {
                    newErrors = {
                        ...newErrors,
                        [name]: 'La contraseña solo puede contener letras y números'
                    }
                }else {
                    newErrors = {
                        ...newErrors,
                        [name]: '',
                    }
                }
                break;
            case 'confirmPassword':
                if (value !== formData.password) {
                    newErrors = {
                        ...newErrors,
                        [name]: 'Las contraseñas no coinciden'
                    }
                }else {
                    newErrors = {
                        ...newErrors,
                        [name]: '',
                    }
                }
                break;
        }
        const valid = Object.values(newErrors).every((error) => error === '');

        setIsValid(valid)
        setErrors(newErrors);
        console.log(newErrors)
    };

    return {
        formData,
        isValid,
        errors,
        handleChange,
    };
};

export default useForm;