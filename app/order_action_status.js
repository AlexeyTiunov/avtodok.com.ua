var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'


export class Order_Action extends Extends

{
	  constructor(props)
    {
        super(props);
	}
	getNullAction()
	 {
		 return (<a href='####'>-</a>);
	 }
	 getActionCanQueryStatusChange()
	 {
		 return ( <a href='####'  onClick={this.itemStatusChangeQuery}>
		   <img style={this.style} title='' src={this.imagePath+"user_button_cancel.png"} />
		 </a>)
	 }
	 
	 getActionQueryStatusChangeInWait()
	 {
		 return ( <a >
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
		  var dateArr=this.state.proto.WAREHOUSEDATE.fValue.split(/\s/);
		  var date="";
		  if (dateArr instanceof Array) 
		  {
			  date=dateArr[0];
		  }
		  return ( <a href='####'>
		   <img style={this.style}  data-toggle="tooltip" data-placement="top" data-original-title={date} src={this.imagePath+"date_come.png"} />
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
	
}

export class ItemStatusChange_Query extends Extends
{
	 constructor(props)
	 {
		 super(props);
		 this.actionComponent=this.constructor.actionComponent;
		 this.itemStatusChangeQuery=this.itemStatusChangeQuery.bind(this);
		 this.answerState=false;
		 this.queryText="Чи відправити запит на відмову від позиції?";
		 this.unMount=this.unMount.bind(this);
		 
	 }
	 itemStatusChangeQuery(e)
	 {
		 // /ws/ItemStatusChangeQuery.php
		 var basketId=this.actionComponent.state.proto.ID.fValue;
		 var data ="BASKET_ID="+basketId+"&STATUS_CODE=2";
		 var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/ItemStatusChangeQuery.php",data);
		 
		 var updateIcon=function(responseText)
		    {
			  try
			  {
				  var answer= Number(responseText);
				  if (!isNaN(answer) && answer>0)
				  {
					 var inWait= this.actionComponent.getActionQueryStatusChangeInWait();
					 this.actionComponent.setState({updateFromOtherTD:true,otherTd:inWait})
					 this.queryText="Запит відправленно.";
					 
				  }else{
					 this.queryText="Запит не відправленно.";
				  }
			  }catch(e)
			  {
				  this.queryText="Запит не відправленно.";
			  }
				this.answerState=true;
			 this.setState({justUpdate:null})
			 
		    }.bind(this)
		    
		 Prom.then(updateIcon)
		  
		  
		 
		 
	 }
	 unMount(e)
	 {
		 var thisElement=ReactDOM.findDOMNode(this);
		 ReactDOM.unmountComponentAtNode(thisElement);
	 }
	 /////////////////////////////////////
	 componentDidMount()
	 {
		 super.componentDidMount();
		  this.answerState=false;
		 this.queryText="Чи відправити запит на відмову від позиції?";
		 
	 }
	 componentDidUpdate()
	 {
		 super.componentDidUpdate();
		  this.answerState=false;
		 this.queryText="Чи відправити запит на відмову від позиції?";
	 }
	 render()
	 {
		 
		  
		   var buttons=(
		                 <div className="row"> 
		                   
                          <div className="col-xs-6 text-left">
						    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>{"  Ні  "}</font></font></button>
 						  </div>
						  <div className="col-xs-6 text-right">		                   
                            <button type="button" onClick={this.itemStatusChangeQuery}  className="btn btn-sm btn-primary"><font><font>{"  Так  "}</font></font></button>
                          </div>
                    </div>						 
		               )
		    if (this.answerState)
			{
			   buttons=(<div className="col-xs-12 text-right">
			              <button type="button" onClick={this.unMount} className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Вийти</font></font></button>						  
						 </div>
						 )
			}				
		  
		  return (
                       <div className="modal-dialog">                     
                         <div className="modal-content">
                           <div className="modal-header text-center">
                              <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font>Запит на відмову від позиції.</font></font></h2>
                           </div>
                           <div className="modal-body">
                             <fieldset>
                                <legend><font><font>{this.queryText}</font></font></legend>
                             </fieldset>
                              <div className="form-group form-actions">
                                
								 {buttons}
								                          
                               </div>
                             </div>    
                          <div className="modal-footer">
                          </div>
                    
                        
                      </div>
                      </div> 
		 )
	 }
	
}
