
import { Pipe, PipeTransform } from "@angular/core";

import { ProductModel } from "src/app/models/product.model";
@Pipe({
    name:'filter'
})
export class FilterPipe implements PipeTransform{
    
    transform(products:ProductModel[], filterText:string,filterCategory:string) {
        
        if(products==null || filterText==='' && filterCategory=='All'){
            return products;
        }else{
           return products.filter((product)=>{

              return (product.name.toLowerCase().includes(filterText.toLowerCase()) && product.category.toLowerCase().includes(filterCategory.toLowerCase()));
              
            })
        }
        
        
    }
}