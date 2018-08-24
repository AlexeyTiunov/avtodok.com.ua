var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
import {Extends} from './main_component.js'
var jQuery=require('jquery'); 
window.$=jQuery;
var App=require('./js/app.js'); 
//import {App} from './js/app.js';
import {Search_table} from './search_content.js' 
function makeConfigurationApply(mapArray)
{
    for (i=0;i<mapArray.length;i++)
    {
        obj=mapArray[i];
       for (item in mapArray[i]) 
       {
        for (func in mapArray[i][item].functionToHandle)
        {
           mapArray[i][item].functionToHandle[func].apply(obj,obj.params);
            
            
        }
      } 
        
        
    }
    
}
function makeConfigurationCall(mapArray)
{
    for (i=0;i<mapArray.length;i++)
    {
    obj=mapArray[i];
       for (item in obj) 
       {
           var j=0;
        for (func in obj[item].functionToHandle)
        {
           obj[item].functionToHandle[func].call(obj[item],obj[item].params[j]);
            
          j++;  
        }
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
            // map[item]={};
            if (typeof itemsObject[item]=="object" ) 
            {
                  
                for ( subItem in itemsObject[item])
                {
                 if (standMap[subItem])
                    {
                     map[subItem]={};  
                     Object.defineProperty(map[subItem],"functionToHandle",{value:standMap[subItem].functions,enumerable:true,writable:true});
                     Object.defineProperty(map[subItem],"params",{value:standMap[subItem].params,enumerable:true,writable:true}); 
                     Object.defineProperty(map[subItem],"fValue",{value:itemsObject[item][subItem],enumerable:true,writable:true}); 
                    // mapArray.push(map[subItem]);   
                    }
                    else
                    {
                     // Object.defineProperty(map[subItem],"functionToHandle",{value:null,enumerable:true,writable:true});
                      //Object.defineProperty(map[subItem],"params",{value:[],enumerable:true,writable:true});  
                    }
                    
                  
                }
            } else
            { 
                 
                if (standMap[item])
                {  
                 map[item]={};
                 Object.defineProperty(map[item],"functionToHandle",{value:standMap[item].functions,enumerable:true,writable:true});
                 Object.defineProperty(map[item],"params",{value:standMap[item].params,enumerable:true,writable:true}); 
                 Object.defineProperty(map[item],"fValue",{value:itemsObject[item],enumerable:true,writable:true});
                // mapArray.push(map[item]);
                }
                else
                {
                 // Object.defineProperty(map[item],"functionToHandle",{value:[],enumerable:true,writable:true});  
                }
                
                   
            } 
             
             
             
           
            
            
             
           
             
             
         }
         mapArray.push(map); 
        
    }
   return  makeCorrectDirection(standMap,mapArray); 
    
}
function getMapObject()
{
    
    var mapObject=
    {
      BrandCode:{functions:{sFunc,defineColumnName,defineTd},params: ["1","Бренд",<BrandCode_td/>] },
      ItemCode:{functions:{sFunc,defineColumnName,defineTd},params:["1","Номер",<Common_td />]},      
      Caption:{functions:{sFunc,defineColumnName,defineTd},params:["1","Название",<Common_td />]},
      Quantity:{functions:{sFunc,defineColumnName,defineTd},params:["1","Кол-во",<Common_td />]},
      DeliveryDays:{functions:{sFunc,defineColumnName,defineTd},params:["1","Срок Поставки",<Common_td/>]},
      PRICE:{functions:{sFunc,defineColumnName,defineTd},params:["1","Цена",<Common_td />]},
      Sum:{},
      PriceUSD:{},
      SumUSD:{},
      Props:{},
      
        
        
        
    }
   return mapObject; 
}


function makeCorrectDirection( mapObject,mapArray)
{
    var newMapArray=[]
 for (i=0;i<mapArray.length;i++)
 {  
     var newObj={};
     for (item in mapObject)
    {
       //var newObj={};
       if (mapArray[i][item])
       newObj[item]=mapArray[i][item]; 
         
       
        
    }
    newMapArray.push(newObj); 
 }
  for (i=0;i<newMapArray.length;i++)  
  {
       for (item in newMapArray[i])
       {
         if (newMapArray[i][item].prototype)
         {
            newMapArray[i][item].prototype=newMapArray[i]; 
         } else
         {
            newMapArray[i][item].__proto__=newMapArray[i];     
         }
           
       }
  }
      
  
    
 return  newMapArray;  
}
function sFunc()
{
   
}
function defineColumnName(name)
{
    Object.defineProperty(this,"Name",{value:name,enumerable:true,writable:true});
}
function defineTd(TD)
{
   // TDD = new TD.type( {val:this.fValue} );
   TDD=React.createElement(TD.type,this.__proto__,null);
    Object.defineProperty(this,"TD",{value:TDD,enumerable:true,writable:true});
}


export class Basket_items extends Extends
{
    constructor(props) 
     {  
        super(props); 
        this.state.mapArray=[];
         
     } 
     getBasketItems()
     {
       var findMySelf=this.findMySelf(this.constructor.name);
       var Prom=this.makeRequestToRecieveData("POST","/ws/Basket.php",false,"")
         Prom.then( function(responseText)
               {
                   
                 data=JSON.parse(responseText);
                 var mapArray=createMapsArray(data);                   
                 makeConfigurationCall(mapArray);
                 //findMySelf().state.mapArray=mapArray;
                 findMySelf().setState({mapArray:mapArray});
              
               }
         
         );  
         
     }
     ////////////////////////////////
     componentDidMount()
     {
         super.componentDidMount();
         this.getBasketItems();
        // this.setState({mapArray:this.state.mapArray});
     }
     
     render()
     {
         
       const tableHeadO= (  <thead>
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
                            
                           
       
               )
               var names=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (th in tr)
                             {
                                
                                mas.push(<th className="text-center">{tr[th].Name}</th>)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           })[0];  
               const tableHead= (  <thead>
                                    <tr>
                                    {
                                     names  
                                    } 
                                    </tr>
                                </thead>
                            
                           
       
               )
               var rows=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });   
               
               const tableBody= rows.map(function(item){                                  
                                  return (<tr>{item}</tr>)  
                                   })  
                                
               
               
                                
         
        return ( <div className="table-responsive">
                   <table className="table table-vcenter"> 
                      {tableHead}
                   
                    <tbody>
                      {tableBody}
                    </tbody>
                    < /table>  
                  </div>
               ) 
         
         
     }
    
    
}
export class BrandCode_td extends Extends 
{
    constructor(props) 
     {  
        super(props);
       //this.state.brandName=this.props.brandName;
       // this.state.deliveryDays=this.props.deliveryDays; 
       this.state=this.props;  
     } 
     
     render()
     {
        return ( <td>
                   <h4>{this.state.BrandCode.fValue}</h4>
                   <span className="label label-info"><i className="fa fa-clock-o"></i>{this.props.DeliveryDays.fValue}</span>
                 </td>
        
          
           
            
               ) 
         
         
     }
    
}
export class Common_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     render()
     {
       return(
                   <td className="text-center">{this.state.fValue}</td> 
        
        
         
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
                    <Basket_items/>
       
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