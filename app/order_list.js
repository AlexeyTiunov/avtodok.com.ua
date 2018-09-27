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
	  ID:{functions:{},params:[]}, // BASKET_ID
      ORDER_ID:{functions:{defineColumnName,defineTd},params:["Номер Заказа",<Orderid_td/>,]},
      DATE_INSERT:{functions:{parceDate,defineColumnClass,defineColumnName,defineTd},params:["","hidden-xs","Дата",<Common_td />]},
      BRAND:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Бренд","hidden-xs",<Common_td />,]}, 
      REGIONCODE:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Регион","hidden-xs",<Common_td />,]}, 
      ARTICLE:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Номер","hidden-xs",<Common_td />,]}, 
      NAME:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Название","hidden-xs",<Common_td />,]},
      QUANTITY:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Количество","hidden-xs",<Common_td/>,]},
      PRICE:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd},params:[[".","2"],"Цена","hidden-xs",<Common_td />,]}, 
      ORDER_PRICE:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Сумма","hidden-xs",<Common_td />,]},
      ITEMSTATUS:{functions:{},params:[]},
      ITEMSTATUSQUANTITY:{functions:{},params:[]},
      ITEMSTATUS2:{functions:{},params:[]},
	  ITEMSTATUSQUANTITY2:{functions:{},params:[]},
	  ITEMSTATUSCHANGEQUERY:{functions:{},params:[]},
	  QUANTITYCHANGEQUERY:{functions:{},params:[]},
	  SHIPPING_DOCUMENT:{functions:{},params:[]},
	  ISRETURNABLE:{functions:{},params:[]},
	  DELIVERYMETHODTOUA:{functions:{},params:[]},
      action:{functions:{defineColumnName,defineColumnClass,defineTd},params:["Действие" ," ", <Action_td />,],addNew:true},
      state:{functions:{defineColumnName,defineTd},params:["Состояние",<Status_td />,],addNew:true},
        
        
        
        
        
    }
   return mapObject;
}





//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 

const ThemeContext = React.createContext("value");  
var regTD={};
var regTDStatus={};

export class Order_list extends Extends
{
    constructor(props)
    {
        super(props);
        this.state.mapArray=[]; 
    }
    
    getOrderListData()
    {
        var findMySelf=this.findMySelf(this.constructor.name);
         var Prom=this.makeRequestToRecieveData("POST","/ws/order_list.php",false,this.makePostDataFromState())
         
         Prom.then(function(responseText){
             
                     handleDT=new handleData(responseText,getMapObject());
             findMySelf().setState({mapArray:handleDT.mapArray}); 
         })
    }
    
    /////////////////////////////////////
	 
      componentDidUpdate(prevProps, prevState)
    {
        super.componentDidUpdate(prevProps, prevState);
		for (state in regTDStatus)
		{
			regTDStatus[state].setState({otherTd:null});
		}
        TablesDatatables.init();
    }
    componentDidMount()
    {
        super.componentDidMount();
        this.getOrderListData();
		//TablesDatatables.init();
		//this.setState({twiceUpdated:true,shouldComponentUpdate:true});
		
        //
    }
    render()
    {
        var names=this.state.mapArray.map(function(tr) 
                           {
                               var mas=[];
                             for (th in tr)
                             {
                                if (tr[th].Name)
                                mas.push(<th className={"text-center"+" "+(tr[th].className!=undefined)?tr[th].className:"" }>{tr[th].Name}</th>);
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
                                </thead> )
                                
                                
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
                                  return (  <ThemeContext.Provider value={i}><tr key={i++}>{item}</tr>  </ThemeContext.Provider>)  
                                   })                  
        
        return (  <div className="block full">
                     <div className="block-title">
                       <div className="table-responsive">
                           <table id="example-datatable" className="table table-vcenter table-condensed table-bordered">
                                {tableHead}                   
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
          
                  <td className={this.state.proto[this.state.NAME].className+" text-center" }><Link to={"/order_detail/"+this.state.proto[this.state.NAME].fValue}>{this.state.proto[this.state.NAME].fValue}</Link></td>  
          
          
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

export class Quantity_td extends Extends
{
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
      
         
     } 
     render()
     {
       return(
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }>{this.state.proto[this.state.NAME].fValue}</td> 
        
        
         
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
		
        this.bClasses={"2":"label label-primary" };
        this.iClasses={"2":"gi gi-remove_2"};
        this.statusNames={"2":"Отказ"};
         
     } 
	 defineStatus()
	 {
		 var state=this.state.proto.ITEMSTATUS.fValue;
		 if (state=="") return getStatusInWork();
		 state=Number(state);
		 switch(state)
		 {
			 case 0:
			   return this.getStatusInWork();
			 case 2:
			  return this.getStatusDenided();
			 case 3:
			   return this.getStatusInStock();
			 case 4:
			   return this.getStatusShipped();
			 case 5:
			   return this.getStatusOnTheWay();
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
	     try
		 {
	     //var actionTd=this.state.proto.action.TD;
		 var actionTd=regTD[this.id];
	     var dataForAction=actionTd.getActionCanQueryStatusChange();
		 actionTd.setState({updateFromOtherTD:true,otherTd:dataForAction})
		 }catch(e)
		 {
			 
		 }
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"v_rabote.png"} style={{"width":"30px","height":"30px"}}/>
		 </a>)
	 }
	 getStatusDelayed()
	 {//otlozhen
	     
		 
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"otlozhen.png"} style={{"width":"30px","height":"30px"}}/>
		 </a>)
	 }
	 getStatusPayed()
	 {
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"vykuplen.png"} style={{"width":"30px","height":"30px"}}/>
		 </a>)
	 }
	 getStatusDenided()
	 {
		 try{
		 var actionTd=regTD[this.id];
	     var dataForAction=actionTd.getNullAction();
		 actionTd.setState({updateFromOtherTD:true,otherTd:dataForAction})
		 }catch(e)
		 {}
		 return (<a href='####'>
		  <img title='denided' src={this.imagePath+"otkaz.png"} style={{"width":"30px","height":"30px"}}/>
		 </a>)
	 }
	 getStatusInStock()
	 {
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"sklad.png"} style={{"width":"30px","height":"30px"}}/>
		 </a>)
	 }
	 getStatusShipped()
	 {
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"otgruzhen.png"} style={{"width":"30px","height":"30px"}}/>
		 </a>)
	 }
	 getStatusOnTheWay()
	 {
		 return (<a href='####'>
		  <img title='' src={this.imagePath+"method_sea.png"} style={{"width":"30px","height":"30px"}}/>
		 </a>)
	 }
	 
	 ////////////////////////////////////////////////////
     render()                                                                      // <td className={"text-center"+" "+this.state.proto.action.className+" "+this.bClasses[this.state.proto.ITEMSTATUS.fValue]} >{this.state.proto.ITEMSTATUS.fValue}</td>  
     {
       /*return(
                 
                     <td><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                                       
                   
         
             )*/   
			var state= null;

			state=this.defineStatus();
			
			/*return  (
			          <td className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}>{state}</td>
			        )*/
			return (
			          <ThemeContext.Consumer>
					  {
						  function(id)
						  {
							  this.id=id;
							  regTDStatus[id]=this;
							  return (<td className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}>{state}</td>)
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
		 
		 Prom.then(function(responseText)
		    {
			 alert(responseText);
		    }
		    
		  )
		 
		 
	 }
	 defineAction()
	 {
		 
		 var itemStatusChangeQuery=this.state.proto.ITEMSTATUSCHANGEQUERY.fValue;
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
		 return ( <a href='####'  onClick={this.itemStatusChangeQuery}>
		   <img style={{"width":"30px","height":"30px"}} title='' src={this.imagePath+"user_button_cancel.png"} />
		 </a>)
	 }
	 
	 getActionQueryStatusChangeInWait()
	 {
		 return ( <a href='####'>
		   <img  style={{"width":"30px","height":"30px"}} title='' src={this.imagePath+"user_deny_wait.png"} />
		 </a>)
	 }
	 getActionQueryStatusChangeDined()
	 {
		 return ( <a href='####'>
		   <img style={{"width":"30px","height":"30px"}} title='' src={this.imagePath+"user_cancel_deny.png"} />
		 </a>)
	 }
	  getActionQueryStatusChangeApproved()
	  {
		 return ( <a href='####'>
		   <img style={{"width":"30px","height":"30px"}} title='' src={this.imagePath+"user_deny.png"} />
		 </a>)
	  }

	 /////////////////////////////////////////////////////////
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
						  {
							  regTD[id]=this;
							  return (<td className={this.state.proto.action.className}>{action}</td>)
						  }.bind(this)
					  }
					  
					  </ThemeContext.Consumer>
			
			       )
		
	   /*return(
                
               <td className={this.state.proto.action.className}><span className={this.bClasses[this.state.proto.ITEMSTATUS.fValue]}><i className={this.iClasses[this.state.proto.ITEMSTATUS.fValue]}></i>{this.statusNames[this.state.proto.ITEMSTATUS.fValue]}</span></td> 
                   
         
             )*/   
         
         
     }
    
}              


