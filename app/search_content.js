var ReactDOM = require('react-dom');
var React = require('react'); 
import {Extends} from './main_component.js'

var m={functionToHandle:null,};

var mapForSearchData={
  BrandCode:{functionToHandle:null,className:null,value:null},
  BrandName:{functionToHandle:null,className:null,makeHiddenInner:"BrandCode"},
  ItemCode:{functionToHandle:sFunction,className:null},
  Caption:{functionToHandle:sFunction,className:"hidden-xs sorting"},
  DeliveryDays:{functionToHandle:null,className:"sorting"},
  Quantity:{functionToHandle:null,className:"sorting"},
  RegionShortName:{functionToHandle:null,className:null},
  RegionCode:{functionToHandle:null,className:null},
  ReturnableParts:{},
  Weight:{},
  Currency:{},
  PercentSupp:{},
  Price:{},
  PriceUSD:{}  
    
    
}
function sFunction(obj)
{
  if (odj.makeHiddenInner)
  {
      this[odj.makeHiddenInner]
  }  
  const a= ( <td className={obj.className}>
     
                  </td> )
             return a;
}


export class Search_table extends Extends
{
    
   constructor(props) 
     {  
       
         super(props);        
         
     }
     dataSort(data)
     {
         
         
         
     }
     
     makeDataForRender(data)
     {
         var mas=[];
         for (i in data)
         {
             for (item in data[i])
             {
                 if ((item in mapForSearchData)==false)
                 {
                     
                 }
                 var config=mapForSearchData[item];                 
                 func=config['functionToHandle'];
                 
                 if (func!=null && func!=undefined)
                 {
                     func.call(this);
                 }
                 
                 const c=( <td>
                           </td> )
                 
             }
                                        
             
         }
         
     }
     
     /////////////////////////////////////
     render()
     {
         return ( <div className="table-responsive">
                       <table className="table table-vcenter">
                            <thead> 
                                 <tr>
                                        <th class="hidden-xs">#</th>
                                        <th>Бренд</th>
                                        <th>Код</th>
                                        <th class="hidden-xs">Опис</th>
                                        <th class="sorting">Срок</th>
                                        <th>К-во</th>
                                        <th>Регіон</th>
                                        <th class="hidden-xs sorting">Надійність</th>
                                        <th class="hidden-xs">Вага</th>
                                        <th class="hidden-xs sorting">Ціна</th>
                                        <th class="sorting">Ціна $</th>
                                        <th>Дія</th>
                                    </tr>
                             </thead> 
                             <tbody>   
                             
                             
                             </tbody>   
                             
                             
                             
                       </table>
                </div>)
         
         
         
     } 
    
    
    
}


