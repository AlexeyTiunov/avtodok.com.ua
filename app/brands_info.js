var ReactDOM = require('react-dom');
var React = require('react');
import {Sidebar} from './sidebar.js'
import {handleData} from './data_convert.js'
import {Extends} from './main_component.js'



export class Brands extends Extends
{
	
	constructor(props)
	{ 
		super(props);
		this.brandsId={};
		this.brandsShortName={};
		this.brandsFullName={};
		
	}
	getBrandsInfo()
	{
		 var Prom=this.makeRequestToRecieveData("POST","/ws/getBrands.php",false,"");
	     var brandInfo=function(responseText)
	 {
		 var handleId= new handleData(responseText,undefined,"id");
		 this.brandsId=handleId.mapArray;
		 var handleShortName= new handleData(responseText,undefined,"ShortName");
		 this.brandsShortName=handleShortName.mapArray;
		 var handleFullName=new handleData(responseText,undefined,"FullName");
		 this.brandsFullName=handleFullName.mapArray;
	 }
	 brandInfo=brandInfo.bind(this);
	 Prom.then(brandInfo);
		
	}
	
	componentDidMount()
	{
		super.componentDidMount();
		 this.getBrandsInfo();
	}
	
	render()
	{
		return (<div></div>)
	}
}