import { InputCustomEvent, SelectChangeEventDetail, SelectCustomEvent } from '@ionic/react';
import { FormEventHandler, useState } from 'react';

type FormData = {
    [key: string]: string | number;
};

const useForm = (initialData: FormData) => {
    const [formData, setFormData] = useState<FormData>(initialData);

    const handleChange = (e: InputCustomEvent | SelectCustomEvent ) => {
        const { name, value } = e.target;
        if (!name) return;
        if (!value) return;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return {
        formData,
        handleChange,
    };
};

export default useForm;