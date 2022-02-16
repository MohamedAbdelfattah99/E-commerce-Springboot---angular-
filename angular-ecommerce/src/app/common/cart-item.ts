import { Product } from './product';

export class CartItem {
  

    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;
    CartItem(){
        this.id =String( undefined);
        this.name =String( undefined);
        this.imageUrl = String(undefined);
        this.unitPrice = Number(undefined);

        this.quantity = 1;
    }
    
    constructor(product: Product) {
        this.id = String(product.id);
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }
}
