import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonInput, IonSelect, IonSelectOption, } from "@ionic/react"
import { useContext, useEffect, useRef, useState } from "react";
import useForm from "../hooks/useForm";
import { AuthContext } from "./authContext";

interface ItemForm {
    isOpen: boolean;
    product: Product | null;
    onClose?: () => unknown;
    onConfirm?: () => unknown;
}

export default function ItemForm({isOpen, product, onClose, onConfirm}: ItemForm) {
    const [open, setOpen] = useState(isOpen)
    const { formData, handleChange } = useForm({})
    const {user} = useContext(AuthContext)
    const formRef = useRef<HTMLFormElement>(null)
    const [category, setCategory] = useState<number | null>(1)

    useEffect(() => {
        if (!open) return
        const updateFields = setTimeout(() => {
            let newCategory = 0
            if (!product) {
                newCategory = 0
                return
            }
            switch(product.category) {
                case 'Periféricos': 
                    newCategory = 1
                    break
                case 'Hardware': 
                    newCategory = 2
                    break
                case 'Software': 
                    newCategory = 3
                    break
                case 'Dispositivos': 
                    newCategory = 4
                    break
            }
            setCategory(newCategory);

            (formRef.current?.children[0] as HTMLIonInputElement).value = product.name;
            (formRef.current?.children[1] as HTMLIonInputElement).value = product.description;
            (formRef.current?.children[2] as HTMLIonInputElement).value = product.stock;
            (formRef.current?.children[3] as HTMLIonSelectElement).value = newCategory;
        },200)

        return () => clearTimeout(updateFields)
    },[product, open])

    useEffect(() => {
        setOpen(isOpen)
    },[isOpen])

    const handleClose = () => {
        setOpen(false)
        if (onClose) onClose()
    }

    const handleConfirm = () => {
        try{
            if ((!formData.name 
                || !formData.description 
                || !formData.stock 
                || !formData.category)
                && 
                (!(formRef.current?.children[0] as HTMLIonInputElement).value
                || !(formRef.current?.children[1] as HTMLIonInputElement).value
                || !(formRef.current?.children[2] as HTMLIonInputElement).value
                || !(formRef.current?.children[3] as HTMLIonSelectElement).value)) {
                alert('debes llenar todos los campos')
                return
            }
            if (!product) {
                fetch('http://localhost:8000/add_item/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    stock: Number(formData.stock),
                    category: formData.category,
                    user_token: user})
                })
            } else {
                console.log(JSON.stringify({
                    name: (formRef.current?.children[0] as HTMLIonInputElement).value,
                    description: (formRef.current?.children[1] as HTMLIonInputElement).value,
                    stock: Number((formRef.current?.children[2] as HTMLIonInputElement).value),
                    category: (formRef.current?.children[3] as HTMLIonInputElement).value,
                    user_token: user}))
                fetch('http://localhost:8000/update_item/', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    name: (formRef.current?.children[0] as HTMLIonInputElement).value,
                    description: (formRef.current?.children[1] as HTMLIonInputElement).value,
                    stock: Number((formRef.current?.children[2] as HTMLIonInputElement).value),
                    category: (formRef.current?.children[3] as HTMLIonInputElement).value,
                    user_token: user})
                })
            }
            setOpen(false)
            if (onConfirm) onConfirm()
        } catch(e) {

        }
    }

    return (
        <IonModal isOpen={open}
            onDidDismiss={handleClose}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={handleClose}>Cerrar</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton onClick={handleConfirm}>Confirmar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form ref={formRef}>
                <IonInput label="Nombre" 
                    labelPlacement='floating' 
                    fill='outline' 
                    className='mt-1' 
                    name="name" 
                    defaultValue={product?.name}
                    onIonChange={handleChange}></IonInput>
                <IonInput 
                    label='Descripción' 
                    labelPlacement='floating' 
                    fill='outline' 
                    className='mt-1' 
                    name='description' 
                    defaultValue={product?.description}
                    onIonChange={handleChange}></IonInput>
                <IonInput 
                    type='number'  
                    label='Stock' 
                    labelPlacement='floating' 
                    fill='outline' 
                    className='mt-1' 
                    name="stock" 
                    defaultValue={product?.stock}
                    onIonChange={handleChange}></IonInput>
                <IonSelect 
                    label='Categoría' 
                    fill='outline' 
                    className='mt-1' 
                    labelPlacement='floating' 
                    name="category" 
                    defaultValue={category || 0}
                    onIonChange={handleChange}>
                <IonSelectOption value={1}>Periféricos</IonSelectOption>
                <IonSelectOption value={2}>Hardware</IonSelectOption>
                <IonSelectOption value={3}>Software</IonSelectOption>
                <IonSelectOption value={4}>Dispositivos</IonSelectOption>
                </IonSelect>
            </form>
          </IonContent>
        </IonModal>
    )
}