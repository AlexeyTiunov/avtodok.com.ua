var ReactDOM = require('react-dom');
var React = require('react');
import {Sidebar} from './sidebar.js'
import {handleData} from './data_convert.js'
import {Extends} from './main_component.js'




/*export function Regions()
{  
   this.regions={};
	
	var getRegionsInfo =function()
    {
	 var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/getRegions.php","REGIONS=Y");
	 var RegionsInfo=function(responseText)
	 {
		 var handleDT= new handleData(responseText);
		 this.Regions=handleDT.mapArray;
		 
	 }
	 RegionsInfo=RegionsInfo.bind(this);
	 Prom.then(RegionsInfo);
    }.bind(this)
	getRegionInfoById = function(id)
    {
	  
    }
	
}*/

export class Regions extends Extends
{
	constructor(props)
	{
		super(props);
		this.regions={};
	}
	
    getRegionsInfo()
    {
	 var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/getRegions.php","REGIONS=Y");
	 var RegionsInfo=function(responseText)
	 {
		 var handleDT= new handleData(responseText);
		 this.regions=handleDT.mapArray;
		 
	 }
	 RegionsInfo=RegionsInfo.bind(this);
	 Prom.then(RegionsInfo);
    }
	
	///////////////////////////////////////
	componentDidMount()
	{
		super.componentDidMount();
		 this.getRegionsInfo();
	}
	componentDidUpdate()
	{
		//this.getRegionsInfo();
	}
	render()
	{
		return (<div></div>)
	}
	
}