import { Pipe, PipeTransform } from "@angular/core";
import { ProductModel } from "src/app/models/product.model";
@Pipe({
    name:'detPipe'
})
export class DetailPipe implements PipeTransform{
    
    transform(products:ProductModel[], id:number) {
        
        if(products==null||id===null){
           return console.log('404');
            
        }else{
           return products.filter((product)=>{
            
              return product.id === id.toString();
              
            })
        }
        
        
    }
}