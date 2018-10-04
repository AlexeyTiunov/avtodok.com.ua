var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'
import {App} from './js/app.js';   


function getMapObject()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
   var defineTh=dataConvert.defineTh; 
   var parceDate=dataConvert.parceDate;
   
    /*
	   "AD000133741":
	   {"SHIPMENT_INFO":
	   {"shipnumber":"AD000133741",
	   "currency":"USD","NUMBER":"AD000133741",
	   "SHIPMENT_TYPE":null,"DELIVERY_ALLOW":null,
	   "CLIENT_CODE":"00742","AGREEMENT_CODE":
	   "000000061","DATE":"06.18.2018"},
	   "56947486":{"ShipingID":"56947485",
	   "Shiping1cCode":"AD000133741",
	   "ItemCode":"287513S000",
	   "ItemCodeTamlated":"28751-3S000",
	   "BrandCode":"Hyundai","Caption":"GASKET-EXH","Quantity":"1","Price":"3.53","Sum":"3.53","Order":"161716"}}}
	    "AgreementInfo":{"CurrencyCode":"USD",
		"OrdersAllSumm":"5952.54","OrdersWorkSumm":"5952.54","CurrentDebt":"2131.12","CurrentDelayDebt":"0"
	*/
    
    
    var mapObject=
    { 
	  ID:{functions:{},params:[]},
	  shipnumber:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:["Номер/Дата/Замовлення","",<Shipmentnumber_td/>,[<Common_th/>,"Номер/Дата/Замовлення"]]},
	  currency:{functions:{},params:[]},	  
	  CLIENT_CODE:{functions:{},params:[]},
	  AGREEMENT_CODE:{functions:{},params:[]},
	  DATE:{functions:{},params:[]},
	  ShipingID:{functions:{},params:[]},
	  Shiping1cCode:{functions:{},params:[]},
	  SHIPMENT_TYPE:{functions:{},params:[]},
	  DELIVERY_ALLOW:{functions:{},params:[]},
	  BrandCode:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:["Бренд/Номер/Найм-ня","",<Brandname_td/>,[<Common_th/>,"Бренд/Номер/Найм-ня"]]},
	  ItemCode:{functions:{},params:[]},
	  ItemCodeTamlated:{functions:{},params:[]},	  
	  Caption:{functions:{formatNumber},params:[]},
	  Price:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Ціна/Кіл-ть/Сума","",<Price_td />,[<Common_th/>,"Ціна/Кіл-ть/Сума"]]},
	  Quantity:{functions:{},params:[]}, 	 
	  Sum:{functions:{formatNumber},params:[[".","2"],]},
	  Order:{functions:{},params:[]},
	  CurrentDebt:{functions:{formatNumber},params:[[".","2"]]},
	  CurrentDelayDebt:{functions:{formatNumber},params:[[".","2"],]},
	  totalSum:{functions:{},params:[],addNew:true},
	  deliveryType:{functions:{},params:[],addNew:true},
	  comments:{functions:{},params:[],addNew:true},
    }
   return mapObject;
}
function getMapObjectId()
{
	dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
   var parceDate=dataConvert.parceDate;
	var mapObject=
    { 
	  ID:{functions:{},params:[]},
	}
	
	 return mapObject;
	
}
export class Shipments extends Extends
{
	 constructor(props) 
     { 
	    super(props);
		this.state.mapArray=[];
	 }
	 getShipments()
	 {
		 data="SHIPNUMBERONLY=Y";
		 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/shipmentReadyToDeliver.php",data);
		 
		  var shipmentInfo= function(responseText)
		    {
			  handleBR= new  handleData(responseText,getMapObjectId());			  
			  this.setState({mapArray:handleBR.mapArray});
		    }
            shipmentInfo=shipmentInfo.bind(this);
		 Prom.then(shipmentInfo);
	 }
	 ///////////////////////////////////////////////////
	 componentDidUpdate()
	 {
		 super.componentDidUpdate();
		 if (this.state.mapArray.length!=0)
		 {
			  this.deActivateProgressBar();
		 }
		 
	 }
	 componentDidMount()
	 {
		 this.getShipments();
		 if (this.state.mapArray.length!=0)
		 {
			
		    this.deActivateProgressBar();
		 }
		 
	 }
	 render()
	 {     var tables=null
		 try
		 {
			  tables=this.state.mapArray.map(function(row){
				 
				  for (item in row)
				  {
					  return (<Shipment_readyordelivery shipmentID={row[item].fValue}/>)
				  }
				 
			 })
		 }catch(e)
		 {
			 
		 }
		 return (<div>
		         {tables}
		       </div>)
	 }
	
	
}


export class Shipment_readyordelivery extends Extends
{
	 constructor(props) 
     { 
	    super(props);
		this.state.shipmentID=this.props.shipmentID;
		this.state.mapArray=[];
		this.state.shipmentTypes={"0":"Самовивіз","1":"Відправка","2":"Доставка"};
		this.state.comments={"0":"Видачу товару зі складу не схвалено","1":"Борг","2":"Баланс"}
		this.state.debtComments={"0":""};
	 }
	 
	 getShipmentInfo()
	 {
		 data="SHIPMENTID="+this.state.shipmentID;
		 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/shipmentReadyToDeliver.php",data);
		 
		 var shipmentInfo= function(responseText)
		 {
			  handleBR= new  handleData(responseText,getMapObject()); 
			  this.setState({mapArray:handleBR.mapArray});
		 }
          shipmentInfo=shipmentInfo.bind(this);
		 Prom.then(shipmentInfo);
	 }
	 
	 ////////////////////////////////////////////////
	 
	 
	 componentDidMount()
	 {
		 this.getShipmentInfo();
	 }
	 
	 
	 render()
	 {
		 var tableHead=null;
         var  tableBody=null; 
		 
		 try
		 {   
		     var totalSum=0;
			 var shipmentType="";
			 var deliveryAllow="";
			 var comments="";
			 var currentDebt=0;
			 var debtComments="";
			 this.state.mapArray.map(function(tr) 
			 {    
			         for (item in tr)
                      {
						  if (item=="Sum")
						  {
							  totalSum+=Number(tr[item].fValue);
						  }else if (item=="SHIPMENT_TYPE")
						  {
							  shipmentType=tr[item].fValue;
						  }else if (item=="DELIVERY_ALLOW")
						  {
							  deliveryAllow=tr[item].fValue;
						  }else if (item=="CurrentDebt")
						  {
							  currentDebt=Number(tr[item].fValue);
						  }
							  
					  }
			 })
			
			 if (shipmentType==null || shipmentType==undefined)
			 {
				 shipmentType=0;
			 }
			  if (deliveryAllow==null || deliveryAllow==undefined)
			 {
				 deliveryAllow=0;
			 }
			 
			 if (shipmentType!=0)
			 {
				 if (deliveryAllow==0) 
				 comments+=this.state.comments[deliveryAllow]+"\n";
				 if (Number(currentDebt)>0)
			     {
			 	    debtComments+=this.state.comments["1"]+": "+currentDebt;
			     }
				 
			 }
			 
			 
		     
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
			 return (<div className="block"> </div>);
		 }
		 
		 var a=(
		  <div className="block">    
		     <table className="table table-vcenter table-condensed table-bordered"> 
			     <thead>
                   {tableHead}
                 </thead> 
                 <tbody>
                    {tableBody}                     
                  </tbody>
			 
			 
			 </table>
			 <div className="row">
			    <div className="col-xs-4">
				        {"Всього: "+totalSum}
				</div>
			 </div>
			 <div className="row">
			    <div className="col-xs-4">
				        {this.state.shipmentTypes[shipmentType]}
				</div>
			 </div>
			 <div className="row">
			    <div className="col-xs-12">
				        {comments}
				</div>
			 </div>
			 <div className="row">
			    <div className="col-xs-4">
				        {debtComments}
				</div>
			 </div>
		  
		  </div>
		  
		 
		 )
		 return a;
		 
	 }
	
	
}

export class Shipmentnumber_td extends Extends
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
				   <a href="#">{this.state.proto.shipnumber.fValue}</a><br/>
				   {this.state.proto.DATE.fValue}<br/>
				   <a href="#">{this.state.proto.Order.fValue}</a>
				   
				   
				   </td> 
        
        
         
             )   
         
         
     }
	
}
export class Brandname_td extends Extends
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
                   {this.state.proto.BrandCode.fValue}<br/>
                   {this.state.proto.ItemCode.fValue}<br/>
				   {this.state.proto.Caption.fValue}<br/>
                   
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
				   {this.state.proto.Price.fValue}<br/>
				   {"x "}<strong><span class="badge">{this.state.proto.Quantity.fValue}</span></strong><br/>
				   {"= "}{this.state.proto.Sum.fValue}<br/>
					   {this.state.proto.currency.fValue}
				   
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
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }> {this.state.proto[this.state.NAME].fValue}</td> 
        
        
         
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