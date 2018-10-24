var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'
import {App} from './js/app.js';   
import {getInputCalendarComponent} from './calendar_bar.js'
import {Calendar_set} from './calendar_bar.js'
 

var i=0;

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
    {  ID:{functions:{},params:[]},
	  NUMBER:{functions:{defineColumnName,defineTd,defineTh},params:["Номер Документу",<Shiping_td/>,[<Common_th/>,"Номер/Документу"]]},
	  DELIVER:{functions:{defineColumnName,defineTd,defineTh},params:["Перевізник",<Common_td/>,[<Common_th/>,"Перевізник"]]},
	  //REGION:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Регіон","",<Common_td />,[<Common_th/>,"Регіон"]]},
	  DATE:{functions:{},params:[]},
      PLACES:{functions:{defineColumnName,defineTd,defineTh},params:["Килькість міст",<Common_td/>,[<Common_th/>,"Килькість/міст"]]},	  
	        
        
    }
   return mapObject;
}
function initDataTable()
	 {
		 var thisElement=ReactDOM.findDOMNode(this);
		 var thisElement=thisElement.lastElementChild;
		 if (thisElement==null) return;
		 App.datatables();
		 if ( $.fn.dataTable.isDataTable( $(thisElement) ) ) 
		 {
			return;
		 }
		 $(thisElement).dataTable({
                "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 1 ] } ],
                "iDisplayLength": 3,
                "aLengthMenu": [[3, 5, -1], [3, 5, "Всі"]]
            });

            /* Add placeholder attribute to the search input */
            $(thisElement).attr('placeholder', 'Пошук');
	 }

export class Shiping_docs extends Extends
{
	constructor(props) 
	{
		super(props);
		this.state.dateBegin;
		this.onchange=this.onchange.bind(this);
		this.onclick=this.onclick.bind(this);
		this.getList=this.getList.bind(this);
		
	}onchange(e)
	{
		this.state.dateBegin=e.target.value;
	}
	onclick(e)
	{
		this[e.target.id]=e.target.value;
	}
	getList()
	{
		//window.objectReg['Doc_list'].setState({updated:true});
		this.setState({update:true});
	}
	////////////////////////////////////////<input onChange={this.onchange} onPaste={this.onchange} id="example-daterange1" name="example-daterange1" className="form-control text-center" placeholder="Початок періоду" type="text"/>
	componentDidMount()
	{
		super.componentDidMount();
		 this.deActivateProgressBar();
		
	}
	 
	render()
	{
		Input_calendar=getInputCalendarComponent("","","Початок періоду");
		ShipingDocsListComp=getDocsListComponent();
		ShipingDocsListComp.dateBegin=this.dateBegin;
		ShipingDocsListComp.dateEnd=this.dateEnd;
		ShipingDocsListComp.getFunc=getShipingDocsList;
		ShipingDocsListComp.mapObject=getMapObjectShipingsDocs();		
		ShipingDocsListComp.compDidUpdateFunc=[];
		ShipingDocsListComp.compDidUpdateFunc.push(initDataTable);
		
		
		return (<div onClick={this.onclick} className="block">
                 <Calendar_set />
				  <div className="col-xs-2">
				  </div>
				   <div className="col-xs-8 text-center">
                        <button onClick={this.getList} className="btn btn-danger" style={{"margin-left":"auto","margin-top":"1em"}}>Показати декларації</button>
                   </div>
				  
				   <ShipingDocsListComp />
		        </div>)	 
	}
}

function getShipingDocsList()
{
	     var data="";
		 if  ("dateBegin" in this.constructor && this.constructor.dateBegin!="")
		 {
			 try 
			 {
			 data+="filter_date_from="+this.constructor.dateBegin.replace(/\//g,".");
			 }catch(e)
			 {
				 
			 }
			 
		 }		 
		 if  ("dateEnd" in this.constructor && this.constructor.dateEnd!="")
		 {
			   try
			   {
				   data+="&filter_date_to="+this.constructor.dateEnd.replace(/\//g,".");
			   }catch(e)
			   {
				   
			   }
			  
		 }
		 
		  var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/shipingdocs.php",data);
		  var shipingDocsList=function(responseText)
		  {
			    docsList=new handleData(responseText,this.constructor.mapObject,"SHIPINGDOCS");				
				this.setState({mapArray:docsList.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(shipingDocsList);
	 }
	 
function getDocsListComponent()
{
	 class Doc_list extends Extends
   {
	 constructor(props) 
     {  
        super(props);
		this.state.itemCode=""+this.props.itemCode;
        this.state.mapArray=[];
		this.getFunc=this.constructor.getFunc;
		this.compDidUpdateFunc=this.constructor.compDidUpdateFunc;
		/*this.urlGetParametr=this.constructor.urlGetParametr;
		this.subData=this.constructor.subData
		this.mapObject=this.constructor.mapObject;
		this.documentName=this.constructor.documentName;*/
         
     } 
	 callDidUpdateFuncs()
	 {
		 try
		 {
			 for (var i=0;i<this.compDidUpdateFunc.length;i++)
		    {
			  this.compDidUpdateFunc[i].call(this);
		    }
		 }catch(e)
		 {
			 
		 }
		 
	 }
	 callGetFunc()
	 {
		  if (this.getFunc==null || this.getFunc==undefined) return;
		  this.getFunc.call(this);
	 }
	 //////////////////////////////////////
	  shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
               this.callGetFunc();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
	  componentDidUpdate()
	  {
		  super.componentDidUpdate();
		  this.callDidUpdateFuncs();
	  }
	 componentDidMount()
     {
        super.componentDidMount();
        this.callGetFunc();
		
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
    /*History_item.urlGetParametr=urlGetParametr;
	History_item.subData=subData;
	History_item.getShipingDocsList=getShipingDocsList;
	History_item.mapObject=mapObject;
	History_item.documentName=documentName;*/
	return Doc_list;
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
				  <Link to={"/shipingdoc_detail/"+this.state.proto.ID.fValue}>{this.state.proto[this.state.NAME].fValue}</Link><br/>
					  {this.state.proto.DATE.fValue}
					  {}
				  
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


