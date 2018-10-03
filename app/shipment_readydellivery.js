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
	  shipnumber:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Номер/Дата","",<Shipmentnumber_td/>]},
	  currency:{functions:{},params:[]},	  
	  CLIENT_CODE:{functions:{},params:[]},
	  AGREEMENT_CODE:{functions:{},params:[]},
	  DATE:{functions:{},params:[]},
	  ShipingID:{functions:{},params:[]},
	  Shiping1cCode:{functions:{},params:[]},
	  SHIPMENT_TYPE:{functions:{},params:[]},
	  DELIVERY_ALLOW:{functions:{},params:[]},
	  BrandCode:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Бренд/Номер/Найм-ня","",<Brandname_td/>]},
	  ItemCode:{functions:{},params:[]},
	  ItemCodeTamlated:{functions:{},params:[]},	  
	  Caption:{functions:{formatNumber},params:[]},
	  Price:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd},params:[[".","2"],"Ціна/Кіл-ть/Сума","",<Price_td />,]]},
	  Quantity:{functions:{},params:[]}, 	 
	  Sum:{functions:{formatNumber},params:[[".","2"],]},
	  Order:{functions:{},params:[]},
	  CurrentDebt:{functions:{formatNumber},params:[[".","2"],]},
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
	 }
	 getShipments()
	 {
		 data="SHIPNUMBERONLY=Y";
		 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/shipmentReadyToDeliver.php",data);
		 
		  var shipmentInfo= function(responceText)
		    {
			  handleBR= new  handleData(responseText,getMapObjectId());			  
			  this.setState({mapArray:handleDT.mapArray});
		    }

		 Prom.then(shipmentInfo);
	 }
	 
	 render()
	 {
		 try
		 {
			 
		 }
		 <div>
		 
		 </div>
	 }
	
	
}


export class Shipment_readyordelivery extends Extends
{
	 constructor(props) 
     { 
	    super(props);
		this.state.shipmentID=this.props.shipmentID;
	 }
	 
	 getShipmentInfo()
	 {
		 data="SHIPNUMBER="+this.state.shipmentID;
		 var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/shipmentReadyToDeliver.php",data);
		 
		 var shipmentInfo= function(responceText)
		 {
			  handleBR= new  handleData(responseText,getMapObject()); 
			  this.setState({mapArray:handleDT.mapArray});
		 }

		 Prom.then(shipmentInfo);
	 }
	 
	 ////////////////////////////////////////////////
	 render()
	 {
		 var tableHead=null;
         var  tableBody=null; 
		 
		 try
		 {   
		     var totalSum=0;
			 var shipmentType="";
			 var deliveryAllow="";
			 var currentDebt=0;
			 this.state.mapArray.map(function(tr) 
			 {    
			         for (item in tr)
                      {
						  if (th=="price")
						  {
							  totalSum+=Number(tr[item]);
						  }else if (item=="SHIPMENT_TYPE")
						  {
							  shipmentType=tr[item];
						  }else if (item=="DELIVERY_ALLOW")
						  {
							  deliveryAllow=tr[item];
						  }else if (item=="currentDebt")
						  {
							  currentDebt=Number(tr[item]);
						  }
							  
					  }
				 
			 });
		     var  tableFooter=this.state.mapArray.map(function(tr) {
			          var mas=[];
                      for (th in tr)
                      {
                        if (tr[th].THH)
                        mas.push(tr[th].THH);  
                      }
                              return mas;    
			 
			 
		       })
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
                                
                                mas.push(tr[td].TD)
                             } 
                              
                             return mas;
                              
                             //return <th className="text-center">{item.Name}</th> 
                           });
              
                                
                          var i=0;
               const tableBody= rows.map(function(item){                                  
			                      i++;
                                  return (  <ThemeContext.Provider value={i}><tr key={i}>{item}</tr>  </ThemeContext.Provider>)  
                                   })                  
        
			 
		 }catch(e)
		 {
			 
		 }
		 return
		 (
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
				        {"Всього:"+totalSum}
				</div>
			 </div>
			 <div className="row">
			    <div className="col-xs-4">
				        {deliveryType}
				</div>
			 </div>
		  
		  </div>
		 
		 )
		 
		 
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
				   {this.state.proto.shipnumber.fValue}<br/>
				   {this.state.proto.DATE.fValue}
				   
				   
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
				   {"x"}<strong><span class="badge">{this.state.proto.Quantity.fValue}</span></strong><br/>
				   {"="}{this.state.proto.Sum.fValue}
				   
				   
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