
import { Pipe, PipeTransform } from "@angular/core";
import { BasketModel } from "../models/basket.model";
@Pipe({
    name:'basketfilter'
})
export class basketFilterPipe implements PipeTransform{
    
    transform(products:BasketModel[], filterText:string) {
        
        if(products==null||filterText===''){
            return products;
        }else{
           return products.filter((product)=>{
            
              return (product.uid.includes(filterText));
              
            })
        }
        
        
    }
}