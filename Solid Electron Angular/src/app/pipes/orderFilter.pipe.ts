
import { Pipe, PipeTransform } from "@angular/core";
import { OrderModel } from "../models/order.model";

@Pipe({
    name:'orderFilter'
})
export class orderFilterPipe implements PipeTransform{
    
    transform(orders:OrderModel[], filterText:string) {
        
        if(orders==null||filterText===''){
            return orders;
        }else{
           return orders.filter((order)=>{
            
              return (order.uid.includes(filterText));
              
            })
        }
        
        
    }
}