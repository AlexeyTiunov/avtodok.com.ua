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
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
      Caption:{functions:{sFunc,defineColumnName,defineTd},params:["1","Найменування",<Common_td />]},
      QUANTITY:{functions:{sFunc,defineColumnName,formatNumber,defineTd},params:["1","Кіл-ть",[".","0"],<Quantity_td />]},
      DeliveryDays:{functions:{sFunc,formatNumber,addSuffix},params:["Термін поставки",[".","0"]," дні"]},
      PRICE:{functions:{sFunc,defineColumnName,formatNumber,defineTd},params:["1","Ціна",[".","2"],<Price_td />]},
	  Currency:{functions:{},params:[]},
      Sum:{},
      PriceUSD:{},
      SumUSD:{},
      Props:{},
      DELETE:{functions:{sFunc,defineColumnName,defineTd},params:["1","Видалити",<Delete_td />],addNew:true},
        
        
        
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
        this.state.getBasketPartsQuantity=false;
        
         
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
             findMySelf().setState({mapArray:handleDT.mapArray,shouldComponentUpdate:true}); 
             
             
         }); 
         
     }
     getBasketPartsQuantity()
     {
        var findMySelf=this.findMySelf(this.constructor.name);
       // thisO=findMySelf();
       // if  (thisO==undefined) return;
        updateMyself= function(responseText)
        {
           this.setState({partsQuantity:responseText}); 
        }.bind(this);
       
        var Prom=this.makeRequestToRecieveData("POST","/ws/AddToBusket.php",false,"getBasketPartsQuantity=getBasketPartsQuantity");       
       Prom.then(
         (responseText)=>{findMySelf().setState({partsQuantity:responseText})}
         ); 
      // Prom.then(updateMyself); 
         
     }
     ////////////////////////////////
      componentDidUpdate()
      {
          super.componentDidUpdate();
           
      } 
      shouldComponentUpdate(nextProps, nextState)
      {
          if (!this.state.shouldComponentUpdate)
          {
              this.getBasketItems();   
          } 
          
          
          return this.state.shouldComponentUpdate;
      }
      componentWillUpdate(nextProps, nextState)
      {
           //getWorkPage().setState({renderIN:"",defineRoutes:false});
      }
      componentDidUpdate(prevProps, prevState)
      {
        super.componentDidUpdate(prevProps, prevState); 
      }
      componentWillMount()
      {
           
      }
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
                               var i=0;
                             for (th in tr)
                             {
                                if (tr[th].Name)
                                mas.push(<th key={++i} className="text-center">{tr[th].Name}</th>);
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
                var summ=0;
				var currency="";
                for (i=0;i<this.state.mapArray.length;i++)
                {
                   summ+=(Number(this.state.mapArray[i].QUANTITY.fValue)*Number(this.state.mapArray[i].PRICE.fValue)); 
                    
                }
				dataConvert = new handleData(null,null); 
                var formatNumber=dataConvert.formatNumber;
				wrapObject={fValue:String(summ)}
				formatNumber.call(wrapObject,".","2");
               summ=wrapObject.fValue;
			   try
			   {
				   currency=this.state.mapArray[0].Currency.fValue;
			   }catch(e)
			   {
				   
			   }
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
                                  return (<tr key={item[item.length-1].props.proto.ID.fValue}>{item}</tr>)  
                                   })  
                                
               const  tableFooter=( <tr className="active">
                                       
                                        <td colspan="4" className="text-right"><span className="h4">Сума замовлення</span></td>
                                        <td className="text-right"><span className="h3"><span className="label label-primary">{summ+" "+currency}</span></span></td>
                                    </tr>
                                     
                                   )
               
       // this.state.mapArray=[];                        
         
        return ( <div className="table-responsive">
                   <table className="table table-vcenter"> 
                      {tableHead}
                   
                    <tbody>
                      {tableBody}
                      {tableFooter}
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
            //alert(data) ; 
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
export class Basket_header extends Extends
{
    constructor(props) 
     {  
        super(props); 
         
     } 
     render()
     {
        return (
                 <div className="block-title">
                            <div className="block-options pull-right">
                                <a href="javascript:void(0)" className="btn btn-sm btn-alt btn-default" data-toggle="tooltip" title="Видалити все"><i className="fa fa-times"></i></a>
                            </div>
                            <h2><strong>Корзина</strong></h2>
                 </div>
        
         
               ) 
         
         
     }
    
}
export class Basket_info extends Extends
{ 
     constructor(props) 
     {  
        super(props); 
        this.onselect=this.onselect.bind(this);
         this.defineFirstState();
         
     } 
     defineFirstState()
     {
         this.state.DELIVERY="N";
        this.state.PAYS="N";  
     }
     onselect(e)
     {
       this.state[e.target.name]=e.target.value;
       this.updateBasketOrderButton();
       
     } 
	 
     updateBasketOrderButton()
     {
        Uobject=window.objectReg['Basket_order_button']; 
        Uobject.setState({DELIVERY:this.state.DELIVERY,PAYS:this.state.PAYS}); 
     }
     render()
     {
         return( <div class="row block-section">  
                  <div className="col-sm-4 text-left">
                                <hr/>
                                <h2><strong>Доставка</strong></h2>
                                <div className="form-group">
                                            <div className="radio">
                                                <label for="example-radio1">
                                                    <input onChange={this.onselect} name="DELIVERY" value="Y" type="radio"/> Доставка
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label for="example-radio2">
                                                    <input onChange={this.onselect} name="DELIVERY" value="N" type="radio"/>Самовивіз 
                                                </label>
                                             </div>
                                </div>
                     
                       </div>
                      <div className="col-sm-4 text-left">
                                <hr/>
                                <h2><strong>Оплата</strong></h2>
                                <div className="form-group">
                                            <div className="radio">
                                                <label for="example-radio1">
                                                    <input onChange={this.onselect} name="PAYS" value="N" type="radio"/> Готівка
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label for="example-radio2">
                                                    <input onChange={this.onselect} name="PAYS" value="Y" type="radio"/>Безготівка 
                                                </label>
                                             </div>
                                </div>
                     
                       </div>
                    </div> 
                 )
     } 
     
    
    
}

export class Basket_order_button extends Extends
{
     constructor(props) 
     {  
        super(props); 
        //Uobject=window.objectReg['Basket_info'];
        this.state.DELIVERY="N";
        this.state.PAYS="N"; 
		this.onclick=this.onclick.bind(this);
     } 
	 onclick(e)
     {
		
		 this.activateProgressBar();
		       
		 
     }
     render ()
     {
      return(  <div className="clearfix">
                            <div className="btn-group pull-right">
                                <Link onClick={this.onclick} className="btn btn-primary" to={`/Order_basket/${this.state.DELIVERY}/${this.state.PAYS}`}><i class="fa fa-angle-right"></i> Оформити замовлення</Link>                                
                            </div>
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
     
     ///////////////////////////////////////
     componentWillUpdate(nextProps, nextState)
     {   
      // var unMount=ReactDOM.unmountComponentAtNode.bind(ReactDOM.findDOMNode(window.objectReg["Basket_items"]));   
      // unMount(document.body);
       //var unMount=ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this));
     }
     render()
     {
       return ( <div className="block full"> 
       
                   <Basket_header /> 
                   <Basket_info />
                   <div class="row block-section"> 
                   
                   </div> 
                    <Basket_items/>
                    <Basket_order_button />
              </div> )  
         
         
         
         
     }
   //////////////////////////////////////
   
    componentDidMount()
    {
        super.componentDidMount();
        document.title="Basket";
    }
   ///////////////////////////////////// 
    
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
export class Price_td extends Extends
{
	 constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     render()
     {
       return(
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }>
				   {this.state.proto.PRICE.fValue}<br/>				   
				   <strong><span class="badge">
				   {this.state.proto.Currency.fValue}
				   </span></strong>
				   
				   </td> 
        
        
         
             )   
         
         
     }
	
}
    
    
