var ReactDOM = require('react-dom');
var React = require('react'); 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js'


export class Progress_bar extends Extends
{
	constructor(props) 
     {  
       super(props);      
	   this.state.width=0;
	   this.width=0;
	   this.state.display="none";
	   this.interval=null;
	   this.duration=1;
       this.moveBarAsync=this.moveBarAsync.bind(this);
	   this.stopBar=this.stopBar.bind(this);
	   this.intervalDuration=100
	            
     } 
	 
	 activateBar(func)
	 {
		 if (func==undefined)
		 func=function(){};
		 this.setState({display:"block",width:0},func);
		 
		 this.interval=setInterval(this.moveBarAsync,this.intervalDuration);
	 }
	 deActivateBar()
	 {
		 this.stopBar();
	 }
	 moveBar()
	 {
		 if (this.state.width>100)
		 {
			//this.stopBar();
			//this.interval=setInterval(this.moveBar,100);
			 this.setState({width:0});
		 }else if (this.state.width==0)
		 {
			 this.stopBar();
			  this.setState({width:1});
			  this.interval=setInterval(this.moveBar,100);
		 }
		 else
		 {
			 this.setState({width:this.state.width+=1});
		 }
		 
	 }
	 moveBarAsync()
	 {
		var addWidth=function()
	    {
		 if (this.width>100) 
		 {
			 this.width=0;this.duration=0;
		 }
		 
	     else 
		 {
			 this.width+=1;
			 this.duration=(this.intervalDuration/1000)+0.5;
		 }
		 
	    }
		addWidth=addWidth.bind(this); 
		 this.setState({width:this.width},addWidth);
	 }
	 
	 stopBar()
	 {
		 clearInterval(this.interval);
         this.duration=0;		 
		 this.width=0;
		 this.setState({display:"none",width:0});
		 
	 }
	 //////////////////////////////////
	 componentDidMount()
	 {
		super.componentDidMount();
	 }
	 
	 render()
	 {
		return ( <div id="progress-bar">
				    
                       <div className="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{"transitionDuration":this.duration+"s","width":this.state.width+"%","display":this.state.display}}>
                        
                     
                  </div>
		 
		 </div>)
		 
	 }
	
	
	
}