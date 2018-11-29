var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'

function getMapObject()
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
      ORDER_ID:{functions:{defineColumnName,defineTd},params:["Номер Заказа",<Common_td/>,]},
      RegionCode:{functions:{defineColumnName,defineTd},params:["Регион",<Common_td />]},
      ORDER_STATUS_NAME:{functions:{defineColumnName,defineTd},params:["Статус",<Common_td />,]}, 
      PRICE:{functions:{defineColumnName,defineTd},params:["Регион",<Common_td />,]}, 
      CURRENCY:{functions:{defineColumnName,defineTd},params:["Номер",<Common_td />,]}, 
     /* NAME:{functions:{defineColumnName,defineTd},params:["Название",<Common_td />,]},
      QUANTITY:{functions:{defineColumnName,defineTd},params:["Количество",<Common_td/>,]},
      PRICE:{functions:{defineColumnName,defineTd},params:["Цена",<Common_td />,]}, 
      ORDER_PRICE:{functions:{defineColumnName,defineTd},params:["Сумма",<Common_td />,]},
      ITEMSTATUS:{functions:{},params:[]}, 
      action:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Действие","hidden-xs",<Status_td />,],addNew:true},
      state:{functions:{defineColumnName,defineTd},params:["Состояние",<Action_td />,],addNew:true},*/
        
        
        
        
        
    }
   return mapObject; 
}
function getMapObjectOrder()
{
	
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
   var parceDate=dataConvert.parceDate;
   var mapObject={
   ID:{functions:{},params:[]}, 
   STATUS_ID:{functions:{},params:[]}, 
   PRICE:{functions:{},params:[]}, 
   DATE_INSERT:{functions:{},params:[]}, 
   DARE_UPDATE:{functions:{},params:[]}, 
   REGIONCODE:{functions:{},params:[]}, 
   ALLOW_DELIVERY:{functions:{},params:[]}, 
   REGION_SHORT_NAME:{functions:{},params:[]},
   REGION_NAME:{functions:{},params:[]},
   COMMENTS:{functions:{},params:[]}, 
   STATUS:{functions:{},params:[],ignore:true},
   PERSON_TYPE:{functions:{},params:[],ignore:true},
   PAY_SYSTEM:{functions:{},params:[],ignore:true},
   CURRENCY:{functions:{},params:[],ignore:true},
   }
   return mapObject; 
	
}

function getMapObjectItems()
{
  dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
   var parceDate=dataConvert.parceDate;
    var defineTh=dataConvert.defineTh;
   
   var mapObject={
    ID:{functions:{},params:[]},	   
   Brand:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:["Бренд/Номер/Найм-ня","",<Brandname_td/>,[<Common_th/>,"Бренд/Номер/Найм-ня"]]},
   ItemCode:{functions:{},params:[]}, 
   NAME:{functions:{},params:[]},   
   PRICE:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Ціна/Кіл-ть/Сума","",<Price_td />,[<Common_th/>,"Ціна/Кіл-ть/Сума"]]},
   QUANTITY:{functions:{},params:[]},  
   CURRENCY:{functions:{},params:[]},     
   RegionCode:{functions:{},params:[]},
   REGION_SHORT_NAME:{functions:{},params:[]},
   REGION_NAME:{functions:{},params:[]},   
   ItemStatus:{functions:{},params:[]},     
   ItemStatusQuantity:{functions:{},params:[]},  
   ItemStatus2:{functions:{},params:[]},  
   ItemStatusQuantity2:{functions:{},params:[]},  
   IsReturnable:{functions:{},params:[]},  
   ItemStatusChangeQuery:{functions:{},params:[]},  
   QuantityChangeQuery:{functions:{},params:[]},  
   WAREHOUSEDATE:{functions:{},params:[]},  
   DeliveryMethodToUA:{functions:{},params:[]},  
   action:{functions:{defineColumnName,defineColumnClass,defineTd,defineTh},params:["Действие" ," ", <Action_td />,[<Common_th/>,"Дія"]],addNew:true},
   state:{functions:{defineColumnName,defineTd,defineTh},params:["Состояние",<Status_td />,[<Common_th/>,"Статус"]],addNew:true},
   }
   
   
   
   return mapObject; 
	
}
const ThemeContext = React.createContext("value"); 
var regTD={};
var regTDStatus={};

export class Order_detail extends Extends
{
    constructor(props)
    {
        super(props);
        //this.state=this.props.match.params;
        this.state.mapArray=[];
		this.state.orderHeaderInfo={};
		try
		{
			this.id=this.props.match.params.id
		}catch(e)
		{
			this.id=this.props.id;
		}
		
    }
    
    getOrderDetail(id)
    {
        
         var Prom=this.makeRequestToRecieveDataAsync("POST","/ws/order_detail.php","ID="+this.id)
         var OrderInfo=function(responseText){
            handleOrderHeader=new handleData(responseText,undefined,'ORDER');
			 handleOrderItems=new handleData(responseText,getMapObjectItems(),'BASKET');
             this.setState({mapArray:handleOrderItems.mapArray,orderHeaderInfo:handleOrderHeader.mapArray});
             
         }
		 OrderInfo=OrderInfo.bind(this);
         Prom.then(OrderInfo);
        
    }
    
    ///////////////////////////////////
	 componentDidUpdate(prevProps, prevState)
    {
        super.componentDidUpdate(prevProps, prevState);
		for (state in regTDStatus)
		{
			regTDStatus[state].setState({otherTd:null});
		}
		for (action in regTD)
		{
			regTD[action].setState({otherTd:null})
		}
		if (this.state.mapArray.length!=0)
		{
			
		    this.deActivateProgressBar();
		}
        $('[data-toggle="tooltip"]').tooltip(); 
    }
    
    componentDidMount()
    {
        super.componentDidMount();
        //this.getOrderDetail(this.props.match.params.id);
		this.getOrderDetail(this.id);
    }
    
    render ()

    {      
	      var tableHead=null;
         var  tableBody=null; 
	      try{
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
                                  return (  <ThemeContext.Provider value={i}><tr key={i}>{item}</tr></ThemeContext.Provider>)  
                                   }) 
		
	         }catch(e)
			 {
				   return (<div className="block"> </div>); 
			 }
		  
            return ( <div className="block">
			          <div className="block full">
                         <div className="block-title" style={{"backgroundColor":"white"}}>
						      <Order_header  info={this.state.orderHeaderInfo}/>
								 <table id="general-table" className="table table-vcenter table-striped table-condensed table-bordered"> 
			                        <thead>
                                      {tableHead}
                                     </thead> 
                                     <tbody>
                                      {tableBody}                     
                                     </tbody>
			                    </table>
						 </div>
                          
                     </div>
				  </div>
                  )
    }       
    
}
export class Order_header extends Extends
{
	 constructor(props) 
     {  
        super(props);
        this.state.info=this.props.info
         
     } 
	 getRegionName()
     {
          var regionRangeObjectValue={
              "0-1":this.state.info["REGION_NAME"],
              "2-4":this.state.info["REGION_SHORT_NAME"],
              "980-999":this.state.info["REGION_SHORT_NAME"], 
              "default": "Украина",
              
          };
          
          var RegionCode=this.state.info["REGIONCODE"];
         return this.getRangeObjectValue(regionRangeObjectValue,RegionCode);
     }
	 getDeliveryName()
	 {
		 var deliveryNames=
		 {
			 "N":"Самовивіз","Y":"Доставка/Відправка"
		 }
		 return deliveryNames[this.state.info.ALLOW_DELIVERY];
	 }
	 render()
	 {
		 return(<div>
		    <div className="row">
			    <div className='col-xs-12 text-center'>
				<h2>{"Замовлення № "+ this.state.info.ID + " від " + this.state.info.DATE_INSERT}</h2>
				</div>
			</div>
		     
		     <div className="row">
			     <div className='col-xs-6 text-center'>
				<p className="form-control-label"><h5><strong>{"Сума замовлення"}</strong></h5></p>
				 </div>
				 <div className='col-xs-6 '>
				  <p className="form-control-label"><h5>{this.state.info.PRICE +" "+ this.state.info.CURRENCY}</h5></p>
				 </div>
			 </div>
			 <div className="row">
			    <div className='col-xs-6 text-center'>
				<p className="form-control-label"><h5><strong>{"Регіон"}</strong></h5></p>
			    </div>
			    <div className='col-xs-6 '>
				 <p className="form-control-label"><h3>{this.getRegionName()}</h3></p>
			    </div>
			 </div>
			 
			 <div className="row">
			    <div className='col-xs-6 text-center'>
				<p className="form-control-label"><h5><strong>{"Спосіб доставки"}</strong></h5></p>
			    </div>
			    <div className='col-xs-6'>
				 <p className="form-control-label"><h5>{this.getDeliveryName()}</h5></p>
			    </div>
			 </div>
			 
			 <div className="row">
			 
			 </div>
		 </div>)
		 
		 
		 
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

export class Status_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
		this.id=0;
		this.state.updateFromOtherTD=false;
		this.state.otherTd=null;
		this.imagePath='/app/img/order_list/';
		this.style={"width":"20px","height":"20px"};
		
        this.bClasses=window.configObject["Status_td"].bClasses;
        this.iClasses={"2":"gi gi-remove_2"};
        this.statusNames={"2":"Отказ"};
		
		this.touchstart=this.touchstart.bind(this);
         
     } 
	 touchstart()
	 {
		 alert("www");
	 }
	 getRegTd()
	 {
		 return regTD;
	 }
	 getRegTdStatus()
	 {
		 return regTDStatus;
	 }
	 getfValue(valueName)
	 {
		 try
		 {
			 return this.state.proto[valueName].fValue;
		 }catch(e)
		 {
			 return "";
		 }
	 }
	 defineStatus()
	 {
		 
		 //var state=this.state.proto.ItemStatus.fValue;
		 //var state2=this.state.proto.ItemStatus2.fValue
		 var state=this.getfValue("ItemStatus");
		 if (state=="") return this.getStatusInWork();
		 state=Number(state);
		 switch(state)
		 {
			 case 0:
			   return this.getStatusInWork();
			 case 1:
               	return 	this.getStatusPayed();	 
			 case 2:
			  return this.getStatusDenided();
			 case 3:
			   return this.getStatusInStock();
			 case 4:
			   return this.getStatusShipped();
			 case 5:
			   return this.getStatusOnTheWay();
			  case 7:
              	return this.getStatusDelayed();   
			 default : 
			   return this.getNullStatus();
		 }
	 }
	 getNullStatus()
	 {
		 return (<a href='####'>
		 {"-"}
		 </a>)
	 }	 
	 getStatusInWork()
	 {   
	     
		 return (<a href='#' data-toggle="tooltip" data-placement="top" title="В роботі">
		  <img title='' src={this.imagePath+"v_rabote.png"} style={this.style}/>
		 </a>)
	 }
	 getStatusDelayed()
	 {//otlozhen
	     
		 
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"otlozhen.png"} style={this.style}/>
		 </a>)
	 }
	 getStatusPayed()
	 {
		 this.updateActionTd("getNullAction");
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"vykuplen.png"} style={this.style}/>
		 </a>)
	 }
	 getStatusDenided()
	 {
		 /*try{
		 var actionTd=this.getRegTd()[this.id];
	     var dataForAction=actionTd.getNullAction();
		 actionTd.setState({updateFromOtherTD:true,otherTd:dataForAction})
		 }catch(e)
		 {}*/
		 this.updateActionTd("getNullAction");
		 return (<a href='####' onTouchStart={this.touchstart}>
		  <img title='denided' src={this.imagePath+"otkaz.png"} style={this.style}/>
		 </a>)
	 }
	 getStatusInStock()
	 {
		 this.updateActionTd("getNullAction");
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"sklad.png"} style={this.style}/>
		 </a>)
	 }
	 getStatusShipped()
	 {
		 this.updateActionTd("getNullAction");
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"otgruzhen.png"} style={this.style}/>
		 </a>)
	 }
	 getStatusOnTheWay()
	 {
		 this.updateActionTd("getActionWareHouse",'');
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"method_sea.png"} style={this.style}/>
		 </a>)
	 }
	 getStatusUserDenyApproved()
	 {
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"user_deny.png"} style={this.style}/>
		 </a>)
	 }
	 updateActionTd(funcName,value)
	 {   
		 try{
		    var actionTd=this.getRegTd()[this.id];
	        var dataForAction=actionTd[funcName](value);
		   actionTd.setState({updateFromOtherTD:true,otherTd:dataForAction})
		   }catch(e)
		 {
			 
		 }
	 }
	 
	 ////////////////////////////////////////////////////
     render()                                                                      // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
     {
       /*return(
                 
                     <td><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                                       
                   
         
             )*/   
			var state= null;

			//state=this.defineStatus();
			  
         if ("updateFromOtherTD" in this.state)
		{
			if (this.state.updateFromOtherTD)
			{
				 state=this.state.otherTd;
			}else
			{
				 state=this.defineStatus();
	            
			}
		}else
		{
			state=this.defineStatus();
		}      
			
			/*return  (
			          <td className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}>{state}</td>
			        )*/
			return (
			          <ThemeContext.Consumer>
					  {
						  function(id)
						  {
							  this.id=id;
							  this.getRegTdStatus()[id]=this;
							  return (<td className={this.getRangeObjectValue(this.bClasses,this.state.proto.ItemStatus.fValue)}>{state}</td>)
						  }.bind(this)
					  }
					  
					  </ThemeContext.Consumer>
			
			       )
			 
         
         
     }
    
}  
export class Action_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
		this.state.updateFromOtherTD=false;
		this.state.otherTd=null;
        this.bClasses=window.configObject["Action_td"].bClasses
        this.style={"width":"20px","height":"20px"};
       // this.bClasses={"2":"label label-primary" };
        this.iClasses={"2":"gi gi-remove_2"};
        this.statusNames={
            "0":"В работе",
            "2":"Отказ",
            "5": "В пути",
        };
		this.imagePath='/app/img/order_list/';
		
		this.itemStatusChangeQuery=this.itemStatusChangeQuery.bind(this)
         
     } 
	 itemStatusChangeQuery(e)
	 {
		 // /ws/ItemStatusChangeQuery.php
		 var basketId=this.state.proto.ID.fValue;
		 var data ="BASKET_ID="+basketId+"&STATUS_CODE=2";
		 var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/ItemStatusChangeQuery.php",data);
		 
		 var updateIcon=function(responseText)
		    {
			  try
			  {
				  var answer= Number(responseText);
				  if (!isNaN(answer) && answer>0)
				  {
					 var inWait= this.getActionQueryStatusChangeInWait();
					 this.setState({updateFromOtherTD:true,otherTd:inWait})
				  }else{
					  this.showInforMassage("ERROR","Операция не прошла");
				  }
			  }catch(e)
			  {
				  this.showInforMassage("ERROR","Операция не прошла");
			  }
				
			 
			 
		    }.bind(this)
		    
		 Prom.then(updateIcon)
		  
		  
		 
		 
	 }
	 getRegTd()
	 {
		 return regTD;
	 }
	 getRegTdStatus()
	 {
		 return regTDStatus;
	 }
	 getfValue(valueName)
	 {
		 try
		 {
			 return this.state.proto[valueName].fValue;
		 }catch(e)
		 {
			 return "";
		 }
	 }
	 defineAction()
	 {
		    var itemStatusChangeQuery		   
		    //var itemStatusChangeQuery=this.state.proto.ItemStatusChangeQuery.fValue;
			var itemStatusChangeQuery=this.getfValue("ItemStatusChangeQuery");
			if (itemStatusChangeQuery=="") return this.getActionCanQueryStatusChange();
			changeQueryArray=itemStatusChangeQuery.split(/#/);
			if (changeQueryArray.length!=2) return this.getActionCanQueryStatusChange();
			var statusToChange=changeQueryArray[0];
			var answerStatus=changeQueryArray[1];
			if (answerStatus=="?") return this.getActionQueryStatusChangeInWait();
			else if(answerStatus=="X") return this.getActionQueryStatusChangeDined();
			else if (statusToChange==answerStatus) return this.getActionQueryStatusChangeApproved();
			else return this.getNullAction();
			
			
		 
		 
	 }
	 getNullAction()
	 {
		 return (<a href='####'>-</a>);
	 }
	 getActionCanQueryStatusChange()
	 {
		 return ( <a href='#'  onClick={this.itemStatusChangeQuery} data-toggle="tooltip" data-placement="top" data-original-title="Зняти з заказу">
		   <img style={this.style} title='' src={this.imagePath+"user_button_cancel.png"} />
		 </a>)
	 }
	 
	 getActionQueryStatusChangeInWait()
	 {
		 return ( <a href='#' data-toggle="tooltip" data-placement="top" data-original-title="Очікування">
		   <img  style={this.style} title='' src={this.imagePath+"user_deny_wait.png"} />
		 </a>)
	 }
	 getActionQueryStatusChangeDined()
	 {
		 return ( <a href='####'>
		   <img style={this.style} title='' src={this.imagePath+"v_rabote.png"} />
		 </a>)
	 }
	  getActionQueryStatusChangeApproved()
	  {
		  this.updateStatus("getStatusUserDenyApproved");
		 return ( <a href='####'>
		   <img style={this.style} title='' src={this.imagePath+"user_deny.png"} />
		 </a>)
	  }
      getActionWareHouse()
	  {
		  return ( <a href='####'>
		   <img style={this.style} title='' src={this.imagePath+"date_come.png"} />
		 </a>)
	  }
	  updateStatus(funcName,value)
	  {
		  try{
		    var statusTd=this.getRegTdStatus()[this.id];
	        var dataForStatus=statusTd[funcName](value);
		   statusTd.setState({updateFromOtherTD:true,otherTd:dataForStatus})
		   }catch(e)
		 {
			 
		 }
		  
	  }
	 /////////////////////////////////////////////////////////
	 shouldComponentUpdate(nextProps, nextState)
	 {
		 if ("updateFromOtherTD" in nextState  )
		 {
			 if (nextState.updateFromOtherTD &&(nextState.otherTd==undefined || nextState.otherTd==null))
			 {
				 
				 return false;
			 }
		 }
		 return true;
	 }
	 componentDidUpdate()
	 {
		 super.componentDidUpdate();
		 $('[data-toggle="tooltip"]').tooltip(); 
	 }
     render()                                                                      // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
     {
		var action= null;  
        if ("updateFromOtherTD" in this.state)
		{
			if (this.state.updateFromOtherTD)
			{
				 action=this.state.otherTd;
			}else
			{
				 action=this.defineAction();
	            
			}
		}else
		{
			action=this.defineAction();
		}      
	         /*return (
		         <td className={this.state.proto.action.className}>{action}</td>		  
		         )*/
				 
				 return (
			          <ThemeContext.Consumer>
					  {
						  function(id)
						  {   this.id=id;
							  this.getRegTd()[id]=this;
							  //return (<td className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}>{action}</td>)							  
							  return (<td className={this.getRangeObjectValue(this.bClasses,this.state.proto.ItemStatus.fValue)}>{action}</td>)
						  }.bind(this)
					  }
					  
					  </ThemeContext.Consumer>
			
			       )
		
	   /*return(
                
               <td className={this.state.proto.action.className}><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                   
         
             )*/   
         
         
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
	   dataConvert = new handleData(null,null); 
        var fN=	dataConvert.formatNumberRet;   
       return(
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }>
				   {this.state.proto.PRICE.fValue}<br/>
				   {"x "}<strong><span class="badge">{this.state.proto.QUANTITY.fValue}</span></strong><br/>
				   {"= "}{fN(Number(this.state.proto.PRICE.fValue)*Number(this.state.proto.QUANTITY.fValue),".","2")}<br/>
					   {this.state.proto.CURRENCY.fValue}
				   
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
                   {this.state.proto.Brand.fValue}<br/>
                   {this.state.proto.ItemCode.fValue}<br/>
				   {this.state.proto.NAME.fValue}<br/>
                   
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
 
