var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'
import {App} from './js/app.js';   

function getHistoryItemComponent(urlGetParametr,subData,mapObject,documentName)
{
	 class History_item extends Extends
   {
	 constructor(props) 
     {  
        super(props);
		this.state.itemCode=""+this.props.itemCode;
        this.state.mapArray=[];
		this.getHistoryFunc=this.constructor.getHistoryFunc;
		this.urlGetParametr=this.constructor.urlGetParametr;
		this.subData=this.constructor.subData
		this.mapObject=this.constructor.mapObject;
		this.documentName=this.constructor.documentName;
         
     } 
	 getHistory()
	 {
		  if (this.getHistoryFunc==null || this.getHistoryFunc==undefined) return;
		  this.getHistoryFunc.call(this,this.urlGetParametr,this.subData,this.mapObject);
	 }
	 //////////////////////////////////////
	  shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
               this.getHistory();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
	 componentDidMount()
     {
        super.componentDidMount();
        this.getHistory();
     }
     render()
     {
		
		
		 var tableHead=null;
         var  tableBody=null; 
		 try
		 {
			  var names=this.state.mapArray.map(function(tr) {
               
                             var mas=[];
                             for (th in tr)
                             {
                                 if (tr[th].THH)
                                 mas.push(tr[th].THH);  
                             }
                              return mas;    
               
                       })[0]
				 tableHead= (  
                                    <tr>
                                     {
                                       names.map(function(item){
                                         return  item;
                                       })  
                                     } 
                                    </tr>
                             
                     )  
					 var rows=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                if (tr[td].TD)
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
              
                                
                          var i=0;
                    tableBody= rows.map(function(item){                                  
			                      i++;
                                  return (  <tr key={i}>{item}</tr>)  
                                   }) 
			 
		 }catch(e)
		 {
			 return(<div> </div>)
		 }
		 
		return ( <div className="table-responsive">
		            <div className="col-xs-12 text-center">
					<table className="table table-vcenter table-condensed  table-striped">
					     <thead>
						    <th className=" text-center">{this.documentName}</th>
						 </thead> 
					</table>
					</div>
		            <table className="table table-vcenter table-condensed table-bordered table-striped">
					       <thead>
                               {tableHead}
                            </thead> 
                            <tbody>
                                {tableBody}                     
                             </tbody>					     
					</table>
		 
		
		        </div>
		       ) 
		 
		 
	 }
	
}
    History_item.urlGetParametr=urlGetParametr;
	History_item.subData=subData;
	History_item.getHistoryFunc=getHistoryOfItem;
	History_item.mapObject=mapObject;
	History_item.documentName=documentName;
	return History_item;
}

/*
function getHistoryOfShippings()
	 {
		  if (this.state.itemCode==null || this.state.itemCode==undefined || this.state.itemCode=="") return;
		  var data="GETSHIPINGS=Y&"+"ItemCode="+this.state.itemCode;
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/fulldocdetail.php",data)
		  var historyOfOrder=function(responseText)
		  {
			    handleShipingHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGS');
				//handleShipingDocsHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGDOCS');
				//handleReturnsHistory=new handleData(responseText,getMapObjectShipings(),'RETURNS');
				
				this.setState({mapArray:handleShipingHistory.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(historyOfOrder);
	 }
	 */
function getHistoryOfItem(urlGetParametr,subData,mapObject)
{
		 if (this.state.itemCode==null || this.state.itemCode==undefined || this.state.itemCode=="") return;
		  var data=urlGetParametr+"=Y&"+"ItemCode="+this.state.itemCode;
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/fulldocdetail.php",data);
		  var historyOfOrder=function(responseText)
		  {
			    handleHistory=new handleData(responseText,mapObject,subData);
				//handleShipingDocsHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGDOCS');
				//handleReturnsHistory=new handleData(responseText,getMapObjectShipings(),'RETURNS');
				
				this.setState({mapArray:handleHistory.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(historyOfOrder);
	 }
function getMapObjectShipingsDocs()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
     var defineTh=dataConvert.defineTh; 
   var parceDate=dataConvert.parceDate;
   
  
    
    
    var mapObject=
    { 
	  NUMBER:{functions:{defineColumnName,defineTd,defineTh},params:["Номер Документу",<Shiping_td/>,[<Common_th/>,"Номер/Документу"]]},
	  DELIVER:{functions:{defineColumnName,defineTd,defineTh},params:["Перевізник",<Common_td/>,[<Common_th/>,"Перевізник"]]},
	  //REGION:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Регіон","",<Common_td />,[<Common_th/>,"Регіон"]]},
	  DATE:{functions:{},params:[]},
      PLACES:{functions:{defineColumnName,defineTd,defineTh},params:["Килькість міст",<Common_td/>,[<Common_th/>,"Килькість/міст"]]},	  
	        
        
    }
   return mapObject;
}

function getMapObjectShipings()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
     var defineTh=dataConvert.defineTh; 
   var parceDate=dataConvert.parceDate;
   
  
    
    
    var mapObject=
    { 
	  NUMBER:{functions:{defineColumnName,defineTd,defineTh},params:["Номер Документу",<Shiping_td/>,[<Common_th/>,"Номер/Документу"]]},
	  STATUS:{functions:{},params:[]},
	  REGION:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Регіон","",<Common_td />,[<Common_th/>,"Регіон"]]},
	  DATE:{functions:{},params:[]},	  
	  SUMM:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Кіл-ть/Сума","",<Summ_td />,[<Common_th/>,"Кіл-ть/Сума"]]},
	  CURRENCY:{functions:{},params:[]},
	  QUANTITY:{functions:{},params:[]},        
        
    }
   return mapObject;
}

function getMapObjectOrders()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
     var defineTh=dataConvert.defineTh; 
   var parceDate=dataConvert.parceDate;
   
  
    
    
    var mapObject=
    { 
	  ORDER_ID:{functions:{defineColumnName,defineTd,defineTh},params:["Номер Заказа",<Orderid_td/>,[<Common_th/>,"Номер/Замовлення"]]},
	  STATUS_ID:{functions:{},params:[]},
	  REGION:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Регіон","",<Common_td />,[<Common_th/>,"Регіон"]]},
	  DATE_INSERT:{functions:{},params:[]},	  
	  PRICE:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Ціна/Кіл-ть/Сума","",<Price_td />,[<Common_th/>,"Ціна/Кіл-ть/Сума"]]},
	  CURRENCY:{functions:{},params:[]},
	  QUANTITY:{functions:{},params:[]},        
        
    }
   return mapObject;
}
const ComContext = React.createContext("value");  
var c=0; 
export class History extends Extends
{
	
	constructor(props) 
     { 
	    super(props)
		this.state.itemCode="";
	 }
	 componentDidUpdate()
	 {
		 super.componentDidUpdate()
		 
	 }
	  render()
	  {        
	        var History_orders=getHistoryItemComponent("GETORDERS","ORDERS",getMapObjectOrders(),"Замовлення");
	         var History_shiping=getHistoryItemComponent("GETSHIPINGS","SHIPINGS",getMapObjectShipings(),"Відгрузки");
	           var History_shipingdocs=getHistoryItemComponent("GETSHIPINGS","SHIPINGDOCS",getMapObjectShipingsDocs(),"Декларації");
			   var History_returns=getHistoryItemComponent("GETSHIPINGS","RETURNS",getMapObjectShipings(),"Повернення");
			 //History_shiping.getHistoryFunc=getHistoryOfShippings;
		  return (
		     
			  <div className="block">
			         <ComContext.Provider value={this}><History_header /></ComContext.Provider>
			          <History_orders key={c++} itemCode={this.state.itemCode}/>
					  <History_shiping key={c++} itemCode={this.state.itemCode}/>
					  <History_shipingdocs key={c++} itemCode={this.state.itemCode}/>
					   <History_returns key={c++} itemCode={this.state.itemCode}/>
					  
			  </div>
	        )
	  }
}

export class History_header extends Extends
{
	 constructor(props) 
     {  
        super(props);
		this.state.itemCode="";
        this.onchange=this.onchange.bind(this);
		this.onclick=this.onclick.bind(this);
         
     }
     onchange(event)
	 {
		  this.setState({itemCode:event.target.value});
	 }	 
	 onclick(e)
	 {
		 this.activateProgressBar();
		 this.state.historyComp.setState({itemCode:this.state.itemCode}, this.deActivateProgressBar)
	 }
	 //////////////////////////////////////////
	 componentDidMount()
	 {
		 super.componentDidMount()
		 this.deActivateProgressBar();
	 }
     render()
     {
		return ( <ComContext.Consumer>
		        {
		          function(historyComp)
				  {					  
			       this.state.historyComp=historyComp;
		         return (<div className="row">
				           <div className=" col-xs-12 col-md-4 col-md-offset-4">
                              <div className="input-group">
                               <input onChange={this.onchange} value={this.state.itemCode} type="text" id="example-input1-group2" name="example-input1-group2" className="form-control" placeholder="Введіть номер запчастини" />
                               <span className="input-group-btn">
                                 <button  onClick={this.onclick}type="button" className="btn btn-primary"><i className="fa fa-search"></i> Пошук</button>
                                </span>
                              </div>
                            </div>	
						</div>		
						  )  
					 
					 
					 }.bind(this)
				}
		     </ComContext.Consumer>
		        
		       ) 
		 
		 
	 }
	
}
/*export class History_order extends Extends
{
	 constructor(props) 
     {  
        super(props);
		this.state.itemCode=""+this.props.itemCode;
         this.state.mapArray=[];
         
     } 
	 getHistoryOfOrders()
	 {
		  if (this.state.itemCode==null || this.state.itemCode==undefined || this.state.itemCode=="") return;
		  var data="GETORDERS=Y&"+"ItemCode="+this.state.itemCode;
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/fulldocdetail.php",data)
		  var historyOfOrder=function(responseText)
		  {
			    handleOrderHistory=new handleData(responseText,getMapObjectOrders(),'ORDERS');
				this.setState({mapArray:handleOrderHistory.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(historyOfOrder);
	 }
	 //////////////////////////////////////
	  shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
               this.getHistoryOfOrders();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
	 componentDidMount()
     {
        super.componentDidMount();
        this.getHistoryOfOrders();
     }
     render()
     {
		
		
		 var tableHead=null;
         var  tableBody=null; 
		 try
		 {
			  var names=this.state.mapArray.map(function(tr) {
               
                             var mas=[];
                             for (th in tr)
                             {
                                 if (tr[th].THH)
                                 mas.push(tr[th].THH);  
                             }
                              return mas;    
               
                       })[0]
				 tableHead= (  
                                    <tr>
                                     {
                                       names.map(function(item){
                                         return  item;
                                       })  
                                     } 
                                    </tr>
                             
                     )  
					 var rows=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                if (tr[td].TD)
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
              
                                
                          var i=0;
                    tableBody= rows.map(function(item){                                  
			                      i++;
                                  return (  <tr key={i}>{item}</tr>)  
                                   }) 
			 
		 }catch(e)
		 {
			 return(<div> </div>)
		 }
		 
		return ( <div className="table-responsive">
		            <table className="table table-vcenter table-condensed table-bordered">
					       <thead>
                               {tableHead}
                            </thead> 
                            <tbody>
                                {tableBody}                     
                             </tbody>					     
					</table>
		 
		
		        </div>
		       ) 
		 
		 
	 }
	
}

export class History_shipings extends Extends
{
	 constructor(props) 
     {  
        super(props);
		this.state.itemCode=""+this.props.itemCode;
         this.state.mapArray=[];
         
     } 
	 getHistoryOfShippings()
	 {
		  if (this.state.itemCode==null || this.state.itemCode==undefined || this.state.itemCode=="") return;
		  var data="GETSHIPINGS=Y&"+"ItemCode="+this.state.itemCode;
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/fulldocdetail.php",data)
		  var historyOfOrder=function(responseText)
		  {
			    handleShipingHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGS');
				handleShipingDocsHistory=new handleData(responseText,getMapObjectShipings(),'SHIPINGDOCS');
				handleReturnsHistory=new handleData(responseText,getMapObjectOrders(),'RETURNS');
				
				this.setState({mapArray:handleOrderHistory.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(historyOfOrder);
	 }
	 
	 //////////////////////////////////////
	  shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
               this.getHistoryOfShippings();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
	 componentDidMount()
     {
        super.componentDidMount();
        this.getHistoryOfShippings();
     }
     render()
     {
		
		
		 var tableHead=null;
         var  tableBody=null; 
		 try
		 {
			  var names=this.state.mapArray.map(function(tr) {
               
                             var mas=[];
                             for (th in tr)
                             {
                                 if (tr[th].THH)
                                 mas.push(tr[th].THH);  
                             }
                              return mas;    
               
                       })[0]
				 tableHead= (  
                                    <tr>
                                     {
                                       names.map(function(item){
                                         return  item;
                                       })  
                                     } 
                                    </tr>
                             
                     )  
					 var rows=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (td in tr)
                             {
                                if (tr[td].TD)
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
              
                                
                          var i=0;
                    tableBody= rows.map(function(item){                                  
			                      i++;
                                  return (  <tr key={i}>{item}</tr>)  
                                   }) 
			 
		 }catch(e)
		 {
			 return(<div> </div>)
		 }
		 
		return ( <div className="table-responsive">
		            <table className="table table-vcenter table-condensed table-bordered">
					       <thead>
                               {tableHead}
                            </thead> 
                            <tbody>
                                {tableBody}                     
                             </tbody>					     
					</table>
		 
		
		        </div>
		       ) 
		 
		 
	 }
	
}

*/
export class Orderid_td extends Extends 
{
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     render()
     {
         return (
          
                  <td className={this.state.proto[this.state.NAME].className+" text-center" }>
				  <Link to={"/order_detail/"+this.state.proto[this.state.NAME].fValue}>{this.state.proto[this.state.NAME].fValue}</Link><br/>
					  {this.state.proto.STATUS_ID.fValue}
				  
				  </td>  
          
          
                )
     }
    
}
export class Shiping_td extends Extends 
{
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     render()
     { 
       var status="";	 
	   try{
			 status=this.state.proto.STATUS.fValue
		  }catch(e)
		 {
			 
		 }
         return (
		         
          
                  <td className={this.state.proto[this.state.NAME].className+" text-center" }>
				  <Link to={"/order_detail/"+this.state.proto[this.state.NAME].fValue}>{this.state.proto[this.state.NAME].fValue}</Link><br/>
					  {this.state.proto.DATE.fValue}
					  {}
				  
				  </td>  
          
          
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
				   {"x "}<strong><span class="badge">{this.state.proto.QUANTITY.fValue}</span></strong><br/>
				   {"= "}{}
					   {this.state.proto.CURRENCY.fValue}
				   
				   </td> 
        
        
         
             )   
         
         
     }
	
}
export class Summ_td extends Extends
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
				   {}<br/>
				   {"x "}<strong><span class="badge">{this.state.proto.QUANTITY.fValue}</span></strong><br/>
				   {"= "}{this.state.proto.SUMM.fValue}
					   {this.state.proto.CURRENCY.fValue}
				   
				   </td> 
        
        
         
             )   
         
         
     }
	
}
export class Common_th extends Extends   
 {
      constructor(props) 
     {  
        super(props);
        this.state=this.props;
         
     } 
     renderCaption()
     {
         if (!this.state.caption)
         {
           return "";  
         }
         
         else
         {
          return this.state.caption.split(/\//);
             
         }
         
         
     }
     render()
     {
         var caption=this.renderCaption();
       if (caption instanceof  Array )
       {
           const a =(  <th className="text-center">
                          {
                              caption.map(function(item){
                              
                              return (<span><span>{item}</span> <br/>
                                         </span>
                              )
                              
                                     
                              
                          }) 
                          }
                       </th> 
           
                    )
           return a;  
       } else
       {
           const a =(<th className="text-center">{this.state.caption}</th>    )  
           return a;  
       } 
      
                   
                  
        
        
         
             
         
         
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
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }> {this.state.proto[this.state.NAME].fValue}</td> 
        
        
         
             )   
         
         
     }
    
}




















