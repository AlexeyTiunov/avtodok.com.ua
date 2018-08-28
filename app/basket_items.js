var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
import {Extends} from './main_component.js'
import {handleData} from './data_convert.js'
var jQuery=require('jquery'); 
window.$=jQuery;
var App=require('./js/app.js'); 
//import {App} from './js/app.js';
import {Search_table} from './search_content.js' 



function getMapObject()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
    var mapObject=
    {
      ID:{functions:{sFunc},params:[]},  
      BrandName:{functions:{sFunc,defineColumnName,defineTd},params: ["1","Бренд",<BrandCode_td/>] },
      ItemCodeTamplate:{functions:{sFunc,defineColumnName,defineTd},params:["1","Номер",<Common_td />]},      
      Caption:{functions:{sFunc,defineColumnName,defineTd},params:["1","Название",<Common_td />]},
      QUANTITY:{functions:{sFunc,defineColumnName,defineTd},params:["1","Кол-во",<Quantity_td />]},
      DeliveryDays:{functions:{sFunc,formatNumber,addSuffix},params:["Срок Поставки",[".","0"]," дні"]},
      PRICE:{functions:{sFunc,defineColumnName,defineTd},params:["1","Цена",<Common_td />]},
      Sum:{},
      PriceUSD:{},
      SumUSD:{},
      Props:{},
      DELETE:{functions:{sFunc,defineColumnName,defineTd},params:["1","Удалить",<Delete_td />],addNew:true},
        
        
        
    }
   return mapObject; 
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
   TDD=React.createElement(TD.type,{proto:this.__proto__,NAME:this.nValue},null);
   
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
        /* Prom.then( function(responseText)
               {
                   
                 data=JSON.parse(responseText);
                 var mapArray=createMapsArray(data);                   
                 makeConfigurationCall(mapArray);
                 //findMySelf().state.mapArray=mapArray;
                 findMySelf().setState({mapArray:mapArray});
              
               }
         
         ); */
         
         Prom.then( function (responseText){
           
             handleDT=new handleData(responseText,getMapObject());
             findMySelf().setState({mapArray:handleDT.mapArray}); 
             
             
         }); 
         
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
                                if (tr[th].Name)
                                mas.push(<th className="text-center">{tr[th].Name}</th>);
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
                                  return (<tr key={item[6].props.proto.ID.fValue}>{item}</tr>)  
                                   })  
                                
               
               
        this.state.mapArray=[];                        
         
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
                   <h4>{this.state.proto[this.state.NAME].fValue}</h4>
                   <span className="label label-info"><i className="fa fa-clock-o"></i>{this.state.proto.DeliveryDays.fValue}</span>
                 </td>
        
          
           
            
               ) 
         
         
     }
    
}
export class Quantity_td extends Extends
{
      constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
    render()  
    {
        return (<td className="text-center"><strong>x <span className="badge">{this.state.proto[this.state.NAME].fValue}</span></strong></td>
        
         
          
          
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
                   <td className="text-center">{this.state.proto[this.state.NAME].fValue}</td> 
        
        
         
             )   
         
         
     }
    
}  
export class Delete_td extends Extends 
{
     constructor(props) 
     {  
        super(props); 
         this.state=this.props;
         this.deletefromBusket=this.deletefromBusket.bind(this); 
     } 
     
     deletefromBusket(e)
   {
      
      var inputsNodeList=e.target.offsetParent.getElementsByTagName("input");
      var mas=[];
      mas.push("BasketRefresh=Y");
      for (i=0;i<inputsNodeList.length;i++)
      {
         mas.push(inputsNodeList[i].name+"="+inputsNodeList[i].value);  
          
      }
      
      
      
      //var data=par.childNodes[1].name+"="+par.childNodes[1].value;
      var Pro=this.makeRequestToRecieveData("POST","/ws/Basket.php",false,mas.join('&'));
      
      Pro.then(function(data){
        alert(data) ; 
        obj=window.objectReg["Basket_items"];
        obj.getBasketItems();
         obj=window.objectReg["Basket_icon"];
        obj.setState({getBasketPartsQuantity:true});  
        //obj.setState({getBasketPartsQuantity:true});  
      } 
     ); 
      
      
      
    
       
       
   }
     
     render()
     {
         return (
         
                  <td className="text-center">
                   <strong>
                     <span  onClick={this.deletefromBusket} className="badge">x</span>
                   </strong>
                   <input type='hidden' name={"DELETE_"+this.state.proto.ID.fValue} value='Y'/>
                   </td> )
        
           
           
            
                 
         
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