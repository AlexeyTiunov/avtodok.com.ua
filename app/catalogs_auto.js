var ReactDOM = require('react-dom');
var React = require('react'); 
import 'jquery'; 
import {Extends} from './main_component.js'

export class Catalogs_auto extends Extends
{
	constructor(props)
	{
		super(props);
	}
	///////////////////////
	componentDidMount()
	{
		/*var $script = require("scriptjs");
        var scr= new $script("//gui.parts-catalogs.com/parts-catalogs.js", function() {});*/
		var head=document.getElementsByTagName("head")[0];
		var script=document.createElement("script");
		script.src="http://gui.parts-catalogs.com/parts-catalogs.js";
		head.appendChild(script);
		this.deActivateProgressBar();
 

	}
	componentDidUpdate()
	{
		/*var $script = require("scriptjs");
       var scr= new $script("//gui.parts-catalogs.com/parts-catalogs.js", function() {});*/
       var head=document.getElementsByTagName("head")[0];
		var script=document.createElement("script");
		script.src="http://gui.parts-catalogs.com/parts-catalogs.js";
		head.appendChild(script);
		this.deActivateProgressBar();

	}
	componentWillUnmount()
	{
		var thisElement=ReactDOM.findDOMNode(this);
		var scriptsCollection=document.getElementsByTagName("script");
		for (item in scriptsCollection )
		{
			if (scriptsCollection[item].src=="http://gui.parts-catalogs.com/bundle.js" || scriptsCollection[item].src=="http://gui.parts-catalogs.com/parts-catalogs.js")
			scriptsCollection[item].parentNode.removeChild(scriptsCollection[item]);
		}
		var svgCollection=document.getElementsByTagName("svg");
		for (item in svgCollection )
		{
			try
			{
				svgCollection[item].parentNode.removeChild(svgCollection[item]);
			}catch(e)
			{
				
			}
			
		}
	}
	render()
	{
		return(<div>
		          <div id="parts-catalog" data-key="TWS-6B325EDE-DE5D-4DC7-AF10-FA8B49E121C5" data-target="new_window" >
		          </div> 
				 
		     </div> 		
		)
	}
	
}