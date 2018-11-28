var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'
import {App} from './js/app.js';   




export class Return_docs extends Extends
{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		return(<div className="block">
		       </div>
		       )
		 
		 
		
	}
}