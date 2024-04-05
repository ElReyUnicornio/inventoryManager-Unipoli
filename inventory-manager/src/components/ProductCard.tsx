import { IonCard, IonCardTitle, IonCardContent, IonBadge, IonChip, IonIcon, IonButton } from '@ionic/react';
import { ellipsisHorizontal } from 'ionicons/icons';

type ProductCardProps = {
  product: Product;
  action?: (item: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, action }) => {
    const handleAction = () => {
        if (!action) return;
        action(product)
    }

    return (
        <IonCard className='productCard'>
            <IonCardContent className='productCard'>
                <div className='doubleInline'>
                    <IonCardTitle>{product.name}</IonCardTitle>
                    <div>
                        <IonChip color='primary'>{product.category}</IonChip>
                        <IonButton fill="clear" size='small'
                            onClick={handleAction}>
                            <IonIcon icon={ellipsisHorizontal}></IonIcon>
                        </IonButton>
                    </div>
                </div>
                <p className='mt-1'>{product.description}</p>
                <IonBadge color="primary" className='mt-1 productCard-stock'>{product.stock}</IonBadge>
            </IonCardContent>
        </IonCard>
    );
}

export default ProductCard;