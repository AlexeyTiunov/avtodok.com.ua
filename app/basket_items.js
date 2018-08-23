var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
import {Extends} from './main_component.js'
var jQuery=require('jquery'); 
window.$=jQuery;
var App=require('./js/app.js'); 
//import {App} from './js/app.js';
import {Search_table} from './search_content.js' 
function makeConfigurationCall(mapArray)
{
    for (i=0;i<mapArray.length;i++)
    {
        obj=mapArray[i];
        for (func in obj.functionToHandle)
        {
            func.apply(obj,obj.params);
            
            
        }
        
        
        
    }
    
}
function createMapsArray(data)
{
    var standMap=getMapObject();
    var map={};
    var mapArray=[];
    for (i in data)
    {
         itemsObject=data[i];
         for (item in itemsObject)
         {   
             map[item]={};
            if (typeof itemsObject[item]=="object" ) 
            {
                for ( subItem in itemsObject[item])
                {
                 if (standMap[subItem])
                    { 
                     Object.defineProperty(map[item],"functionToHandle",{value:standMap[subItem].functions,enumerable:true,writable:true});
                     Object.defineProperty(map[item],"params",{value:standMap[subItem].params,enumerable:true,writable:true}); 
                    }
                    else
                    {
                      Object.defineProperty(map[item],"functionToHandle",{value:null,enumerable:true,writable:true});
                      Object.defineProperty(map[item],"params",{value:[],enumerable:true,writable:true});  
                    }
                    Object.defineProperty(map[item],"fValue",{value:itemsObject[item][subItem],enumerable:true,writable:true}); 
                  
                }
            } else
            { 
            
                if (standMap[item])
                { 
                 Object.defineProperty(map[item],"functionToHandle",{value:standMap[item].functions,enumerable:true,writable:true});
                 Object.defineProperty(map[item],"params",{value:standMap[item].params,enumerable:true,writable:true});
                }
                else
                {
                  Object.defineProperty(map[item],"functionToHandle",{value:[],enumerable:true,writable:true});  
                }
                Object.defineProperty(map[item],"fValue",{value:itemsObject[item],enumerable:true,writable:true}); 
            } 
             
             
             
           
            
            
             
           mapArray.push(map[item]);  
             
             
         }
        
        
    }
   return mapArray; 
    
}
function getMapObject()
{
    
    var mapObject=
    {
      BrandCode:{functions:{sFunc},params:["1","2"]},
      ItemCode:{functions:{sFunc},params:[]},      
      Caption:{functions:{sFunc},params:[]},
      Quantity:{functions:{sFunc},params:[]},
      PRICE:{functions:{sFunc},params:[]},
      Sum:{},
      PriceUSD:{},
      SumUSD:{},
      Props:{},
      
        
        
        
    }
   return mapObject; 
}
function sFunc()
{
    
}


export class Basket_items extends Extends
{
    constructor(props) 
     {  
        super(props); 
         
     } 
     getBasketItems()
     {
       var Prom=this.makeRequestToRecieveData("POST","/ws/Basket.php",false,"")
         Prom.then( function(responseText)
               {
                 data=JSON.parse(responseText);  
                 makeConfigurationCall(createMapsArray(data));
             
              
               }
         
         );  
         
     }
     ////////////////////////////////
     componentDidMount()
     {
         super.componentDidMount();
          this.getBasketItems();
     }
     
     render()
     {
       return (  <div class="table-responsive">
                            <table class="table table-vcenter">
                                 <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center">Бренд</th>
                                        <th class="text-center">Номер з/ч</th>
                                        <th class="text-center">Кількість</th>
                                        <th class="text-center">Ціна</th>
                                        <th class="text-center">Сума</th>
                                        <th class="text-center">Ціна $</th>
                                        <th class="text-center">Сума $</th>
                                    </tr>
                                </thead>
                            
                            </table>
       
                  </div>
       
               )  
         
         
         
         
     }
    
    
}



export class Basket extends Extends
{
    constructor(props) 
     {  
        super(props); 
         
     } 
     
     render()
     {
       return ( <div className="block full"> 
       
                  
                   <div class="row block-section"> 
                   
                   </div> 
       
       
              </div> )  
         
         
         
         
     }
    
    
}


export class Basket_items_forModal extends Extends
{
     constructor(props) 
     {  
        super(props); 
         
     } 
     
     
     render()
     {
       return ( <div id="Basket_items" className="modal fade" role="dialog">
                   <div className="modal-dialog">                     
                     <div className="modal-content">
                        <div className="modal-header">
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                        </div>
                    
                     </div>
                   </div>
                   
                   
                  </div> 
          
           
            
              )  
         
         
         
     } 
    
    
}