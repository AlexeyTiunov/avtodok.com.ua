var ReactDOM = require('react-dom');
var React = require('react'); 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';


export class Check extends Extends
{
	constructor(props)
	{
		super(props);
	}
	////////////////////////////////////////
	componentDidUpdate()
	{
		this.deActivateProgressBar();
	}
	componentDidMount()
	{
		this.deActivateProgressBar();
	}
	render()
	{
		return (<div></div>);
	}
}
