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
	  ID:{functions:{},params:[]},
      CODE:{functions:{},params:[]},	  
	  DATE:{functions:{parceDate},params:["",]},
	  CLIENTCODE:{functions:{},params:[]},
	  AGREEMENTCODE:{functions:{},params:[]},
	  DOCUMENTDATE:{functions:{},params:[]},
	  SUMM:{functions:{makeAlias},params:["Сума"]},
	  CURRENCYCODE:{functions:{},params:[]},
	  DOCUMENTTYPE:{functions:{defineTitle,makeTitle},params:["",""]},
	  STATUS:{functions:{},params:[]},
	  DECLARATIONID:{functions:{},params:[]},
	  AGREEMENTNAME:{functions:{makeAlias},params:["Договір"]},	 
    }
	
   return mapObject;
}
function defineTitle()
{
	var titleMap=
	{
	 "0":"Видаткова",
	 "1":"Поверненя",
	}
	this.fValue=titleMap[this.fValue]+" від "+this.DATE.fValue;
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
	  SHIPPINGID:{functions:{},params:[]},
	  BCODE:{functions:{defineColumnName,defineTd,defineTh},params:["",<Brandname_td/>,[<Common_th/>,"Бренд/Номер/Найменування"]]},
	  ICODE:{functions:{},params:[]},
	  CAPTION:{functions:{},params:[]},
	  QUANTITY:{functions:{},params:[]},
	  SUMM:{functions:{formatNumber,defineColumnName,defineColumnClass,defineTd,defineTh},params:[[".","2"],"Кіл-ть/Сума","",<Summ_td />,[<Common_th/>,"Кіл-ть/Сума"]]},
	  STATUS:{functions:{},params:[]},
	  PRICE:{functions:{},params:[]},

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
		 
	var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/shiping_detail.php",data);
		  var shipingDetail=function(responseText)
		  {
			    //details=new handleData(responseText,this.constructor.mapObject,"SHIPMENT");				
				rows=new handleData(responseText,this.constructor.mapObject,"ROWS")
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
		 
	var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/shiping_detail.php",data);
		  var shipingDetail=function(responseText)
		  {
			    details=new handleData(responseText,this.constructor.mapObject,"SHIPMENT");				
				//rows=new handleData(responseText,this.constructor.mapObject,"ROWS")
				this.setState({mapArray:details.mapArray,shouldComponentUpdate:true});
			  
		  }.bind(this)
		 Prom.then(shipingDetail);
}

//////////////////////////////////////////////////////////////


export class Shiping_detail extends Extends
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
	 /*render()
	 {
		 var agreementName="";
		 var documentType="";
		 var date="";
		 var summ="";
		try
		{
			agreementName=this.state.mapArray[0].AGREEMENTNAME.fValue;
            documentType=this.state.mapArray[0].DOCUMENTTYPE.fValue	
            date=this.state.mapArray[0].DATE.fValue;
			summ=this.state.mapArray[0].SUMM.fValue;
		} catch(e)
		{
			
		}
			
		return ( <div>
		          <div className="row">
			         <div className='col-xs-12 text-center'>
				     <h2>{documentType+" "+date }</h2>
				    </div>
			     </div>
				 
				 <div className="row">
			        <div className='col-xs-6 text-center'>
				      <p className="form-control-label"><h5><strong>{"Договір:"}</strong></h5></p>
				    </div>
				    <div className='col-xs-6 '>
				      <p className="form-control-label"><h5>{agreementName}</h5></p>
				    </div>
			      </div>
				 
				 <div className="row">
			        <div className='col-xs-6 text-center'>
				      <p className="form-control-label"><h5><strong>{"Сума:"}</strong></h5></p>
				    </div>
				    <div className='col-xs-6 '>
				      <p className="form-control-label"><h5>{summ}</h5></p>
				    </div>
			      </div>
				  
				  
				  
				  
			   </div>
			
			
			
			)
	 }
   */
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


export class Brandname_td extends Extends
 {
    
    constructor(props) 
     {  
        super(props);
        this.state=this.props;
        
     } 
	 checkCaption(caption)
	 {
		 try
		 {
			 var length=caption.length;
			 if (length>20)
			 {
				 var pattern="^(.{"+length/2+"})(.*)$";
				 var regExp= new RegExp (pattern,"g");
				 return [caption.replace(regExp,"$1"),caption.replace(regExp,"$2")]
			 }else
			 {
				 return [caption];
			 }
		 }catch(e)
		 {
			 
		 }
	 }
	 //////////////////////////////////////////////////
     render()
     {
        var captionArr=this.checkCaption(this.state.proto.CAPTION.fValue);
         
       return(
                   <td className={this.state.proto[this.state.NAME].className+" text-center" }> 
                   {this.state.proto.BCODE.fValue}<br/>
                   {this.state.proto.ICODE.fValue}<br/>				   
				   {captionArr.map(function(item){return <span>{item}</span></br>})}
				    
                   
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
 
