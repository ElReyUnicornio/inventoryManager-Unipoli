import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonActionSheet, IonSearchbar, IonAlert, IonModal, IonButton, IonButtons, IonItem, IonInput, IonSelect, IonSelectOption, UseIonActionSheetResult } from '@ionic/react';
import { add } from 'ionicons/icons';
import ProductCard from '../components/ProductCard';
import { useContext, useState } from 'react';
import useGetItems from '../hooks/useGetItems';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { AuthContext } from '../components/authContext';
import './Tab1.css';
import LoadingPage from '../components/loadingPage';
import ItemForm from '../components/itemsForm';

const Tab1: React.FC = () => {
  const { items, setQuery } = useGetItems();
  const { user, loading } = useContext(AuthContext);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [actualProduct, setActualProduct] = useState<Product | null>(null);

  const handleActions = (item: Product) => {
    setActionsOpen(true);
    setActualProduct(item);
  }

  const handleActionSheet = (detail: OverlayEventDetail) => {
    const selected = detail.data.action;
    switch (selected) {
      case 'delete':

        setDeletePromptOpen(true);
        break;
      case 'edit':
        setFormOpen(true);
        break;
      case 'cancel':
        console.log('Cancelar');
        break;
      default:
        break;
    }
  }
  
  const handleDelete = () => {
    try {
      fetch(`http://localhost:8000/delete_item/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...actualProduct,
          category: 0,
          user_token: user})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
    }catch(error){
      console.log(user)
      console.error(error);
    }
  }

  if (loading) return <LoadingPage />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>inventario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar debounce={300} autocapitalize='' color='dark' onIonInput={(e) => setQuery((e.target as HTMLIonSearchbarElement).value || '')}></IonSearchbar>
        <div className='itemContainer'>
          {items && items.map((item, index) => (
            <ProductCard key={index + "inventoryItem"} product={item} action={handleActions} />
          ))}
        </div>

        {/* Items Menu ------------------------------------------------------------------------- */}
        <IonActionSheet
        isOpen={actionsOpen}
        onIonActionSheetDidDismiss={() => setActionsOpen(false)}
        header="Acciones"
        buttons={[
          {
            text: 'Borrar',
            role: 'destructive',
            data: {
              action: 'delete',
            },
          },
          {
            text: 'Editar',
            data: {
              action: 'edit',
            },
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ]}
        onDidDismiss={({detail}) => handleActionSheet(detail)}></IonActionSheet>
  
        {/* Delete Prompt ------------------------------------------------------------------------- */} 
        <IonAlert
          header="Espera"
          message="Estás seguro de que quieres borrar este elemento?"
          isOpen={deletePromptOpen}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                handleDelete();
              },
            },
          ]}
          onIonAlertDidDismiss={() => setDeletePromptOpen(false)}
        ></IonAlert>

        {/* Form Modal ------------------------------------------------------------------------- */}
        <ItemForm isOpen={formOpen}
          product={actualProduct}
          onClose={() => setFormOpen(false)}
          onConfirm={() => setFormOpen(false)}/>

        {/* Add Button ------------------------------------------------------------------------- */}
        <IonFab slot='fixed' vertical='bottom' horizontal='end'>
          <IonFabButton onClick={() => {setFormOpen(true); setActualProduct(null)}}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
