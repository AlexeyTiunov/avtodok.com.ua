var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'
import {App} from './js/app.js';  
////////////////////////////////////////////////////////
function getMapObjectShipingDetail()
{
   
    dataConvert = new handleData(null,null); 
   var formatNumber=dataConvert.formatNumber;
   var addSuffix=dataConvert.addSuffix;
   var defineColumnName=dataConvert.defineColumnName;
   var defineColumnClass=dataConvert.defineColumnClass; 
   var defineTd=dataConvert.defineTd;
     var defineTh=dataConvert.defineTh; 
   var parceDate=dataConvert.parceDate;
   var makeAlias=dataConvert.makeAlias;
   var makeTitle=dataConvert.makeTitle;
    
    
    var mapObject=
    { 
	  ID:{functions:{defineTitle,makeTitle},params:["",""]},
	  NUMBER:{functions:{makeAlias},params:["Номер"]},
	  DELIVER:{functions:{makeAlias},params:["Перевізник"]},
	  NUMBERBASE:{functions:{makeAlias},params:["Номер по базі"]},
	  DATE:{functions:{},params:[]},
	  PLACES:{functions:{makeAlias},params:["Кількість місць"]},
	  COMMENTS:{functions:{makeAlias},params:["Коментарі"]},
	  USERNAME:{functions:{},params:[]},	  
    }
   return mapObject;
}
function defineTitle()
{
	
	this.fValue="Декларація відгрузки від "+this.DATE.fValue;
}
function getMapObjectShipingDetailRows()
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
	 DATE:{functions:{parceDate},params:["",]},
	 NUMBER:{functions:{defineColumnName,defineTd,defineTh},params:["",<Shiping_td/>,[<Common_th/>,"Номер"]]},
	 ID:{functions:{},params:[]},
	  

    }
   return mapObject;
}

////////////////////////////////////////////////////////
function getShipingDetailRows()
{
	     var data="";
		 if  ("id" in this.constructor && this.constructor.id!="")
		 {
			 try 
			 {
			   data+="ID="+this.constructor.id;
			 }catch(e)
			 {
				 
			 }
			 
		 }		 
		 
	var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/shipingdoc_detail.php",data);
		  var shipingDetail=function(responseText)
		  {
			    //details=new handleData(responseText,this.constructor.mapObject,"SHIPMENTS");				
				rows=new handleData(responseText,this.constructor.mapObject,"SHIPMENTS")
				this.setState({mapArray:rows.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(shipingDetail);
}

function getShipingDetail()
{
	     var data="";
		 if  ("id" in this.constructor && this.constructor.id!="")
		 {
			 try 
			 {
			   data+="ID="+this.constructor.id;
			 }catch(e)
			 {
				 
			 }
			 
		 }		 
		 
	var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/shipingdoc_detail.php",data);
		  var shipingDetail=function(responseText)
		  {
			    details=new handleData(responseText,this.constructor.mapObject,"DECDETAIL");				
				//rows=new handleData(responseText,this.constructor.mapObject,"ROWS")
				this.setState({mapArray:details.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(shipingDetail);
}

//////////////////////////////////////////////////////////////


export class Shipingdoc_detail extends Extends
{
	constructor(props) 
     {  
        super(props);
        this.id=this.props.match.params.id;
		this.DocsListComponent=getDocsListComponent();
		this.HeaderComponent=getHeaderComponent();
     } 
	 render()
	 {
		this.DocsListComponent.id=this.id;
		this.DocsListComponent.mapObject=getMapObjectShipingDetailRows();
		this.DocsListComponent.getFunc=getShipingDetailRows;
		
		this.HeaderComponent.id=this.id;
		this.HeaderComponent.mapObject=getMapObjectShipingDetail();
		this.HeaderComponent.getFunc=getShipingDetail;
		
		return( <div className="block">
			 <div className="block full">
                 <div className="block-title" style={{"backgroundColor":"white"}}>
				<this.HeaderComponent/>		 
				<this.DocsListComponent/>		 
						 
				</div>
			</div>
		</div>)
						
		 
	 }
	
}

function getHeaderComponent()
{
	 class Shiping_header extends Extends
   {
	constructor(props) 
     {  
        super(props);
		this.state.mapArray=[];
		this.getFunc=this.constructor.getFunc;
        
     } 
	  callGetFunc()
	 {
		  if (this.getFunc==null || this.getFunc==undefined) return;
		  this.getFunc.call(this);
	 }
	 ////////////////////////////
	 shouldComponentUpdate(nextProps, nextState)
      {
        
          if (!nextState.shouldComponentUpdate  )
          {
               this.callGetFunc();   
          } 
          
          
          return nextState.shouldComponentUpdate;
      }
	 componentDidMount()
     {
        super.componentDidMount();
        this.callGetFunc();
     }
	render()
	 {
		
		 var aliasArr=[];
		 var titleArr=[];
		try
		{
			for (var i=0;i<this.state.mapArray.length;i++)
			{
			  for (var item in  this.state.mapArray[i])
			  {
				  
			 				  
			   if ("alias" in this.state.mapArray[i][item])
				  {
					aliasArr.push(
					<div className="row">
			          <div className='col-xs-6 text-center'>
				      <p className="form-control-label"><h5><strong>{this.state.mapArray[i][item].alias+":"}</strong></h5></p>
				    </div>
				    <div className='col-xs-6 '>
				      <p className="form-control-label"><h5>{this.state.mapArray[i][item].fValue}</h5></p>
				     </div>
			       </div>
					
					)
				  }
                 if ("title" in this.state.mapArray[i][item])
				 {
					 titleArr.push(
					 <div className="row">
			          <div className='col-xs-12 text-center'>
				       <h2>{this.state.mapArray[i][item].title}</h2>
				       </div>
			         </div>
					 
					 )
				 }
				 }
			}
		} catch(e)
		{
			
		}
			
		return ( <div>
		         {titleArr.map(function(item){return item;})} 
				 {aliasArr.map(function(item){return item;})}
			   </div>
			
			
			
			)
	 }
	  
   }
  return Shiping_header;
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
		/*this.urlGetParametr=this.constructor.urlGetParametr;
		this.subData=this.constructor.subData
		this.mapObject=this.constructor.mapObject;
		this.documentName=this.constructor.documentName;*/
         
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
				  <Link to={"/shiping_detail/"+this.state.proto.ID.fValue}>{this.state.proto[this.state.NAME].fValue}</Link><br/>
					  {this.state.proto.NUMBER.fValue}
					  {this.state.proto.DATE.fValue}
				  
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
				   {this.state.proto.PRICE.fValue}<br/>
				   {"x "}<strong><span class="badge">{this.state.proto.QUANTITY.fValue}</span></strong><br/>
				   {"= "}{this.state.proto.SUMM.fValue}
					
				   
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
 
