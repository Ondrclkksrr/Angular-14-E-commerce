import { BasketModel } from "./basket.model";
export interface OrderModel{
    orderid?:string;
    uid?:string;
    products?:BasketModel[];
    orderPrice?:number;
    orderDate?:Date; 
}