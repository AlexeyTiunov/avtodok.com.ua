var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {App} from './js/app.js';   

export class Calendar_set extends Extends
{
	constructor(props) 
	{
		super(props);
		this.state.dateBegin;
		this.onclick=this.onclick.bind(this);
		this.Input_calendarBegin=getInputCalendarComponent("dateBegin","","Початок періоду");
		this.Input_calendarEnd=getInputCalendarComponent("dateEnd","","Кінець періоду");
	}
	onclick(e)
	{
		this.state.dateBegin=e.target.value;
	}
	
	////////////////////////////////////////<input onChange={this.onchange} onPaste={this.onchange} id="example-daterange1" name="example-daterange1" className="form-control text-center" placeholder="Початок періоду" type="text"/>
	componentDidUpdate()
	{
		super.componentDidUpdate();
		try
		{
			$("."+thisElement.classList[1]).datepicker({weekStart: 1,
			showOnFocus:false,
			beforeShow: function(){$('input').blur();},ignoreReadonly: true
			}
			);
		}catch(e)
		{
			
		}
		
	}
	componentDidMount()
	{
		var thisElement=ReactDOM.findDOMNode(this);
		try
		{
			$("."+thisElement.classList[1]).datepicker({weekStart: 1,
			showOnFocus:false,
			beforeShow: function(){$('input').blur();},ignoreReadonly: true
			}
			);
		}catch(e)
		{
			
		}
	}
	render()
	{
		//Input_calendarBegin=getInputCalendarComponent("dateBegin","","Початок періоду");
		//Input_calendarEnd=getInputCalendarComponent("dateEnd","","Кінець періоду");
		return (
                <div onClick={this.onclick} className="input-group input-daterange date" data-date-format="mm/dd/yyyy">
                  <this.Input_calendarBegin />
                  <div className="input-group-addon"><span ><i className="fa fa-angle-right"></i></span></div>
                  <this.Input_calendarEnd/>				 
				  <div className="input-group-addon"><span className="fa fa-angle-right"></span></div>
                </div>
				)
	}
}

export var getInputCalendarComponent =function (id,name,placeholder)
{
	


     class Input_calendar extends Extends
    {
	constructor(props) 
	{
		super(props);
		this.onclick=this.onclick.bind(this);
		this.onfocus=this.onfocus.bind(this);
		this.state.placeholder=this.constructor.placeholder;
		this.state.id=this.constructor.id;
		this.state.name=this.constructor.name;
		
	}
	onfocus(e)
	{
		e.preventDefault();
		var thisElement=ReactDOM.findDOMNode(this);
		this.startBlurEvent.call(thisElement);
		
	}
	startBlurEvent()
		{
			if (document.createEvent)
			{
				var event=document.createEvent("Event");
				event.initEvent("focusout", true, true);
				 this.dispatchEvent(event);
			}else
			{			
			var event = new Event("focusout" ,{bubbles: true, cancelable: false});
            this.dispatchEvent(event);
			}
		}
	onclick(e)
	{
		this.state.dateBegin=e.target.value;
	}
	attached()
	{
		
		var thisElement=ReactDOM.findDOMNode(this);
		valuePropertyDescriptor=Object.getOwnPropertyDescriptor(thisElement,"value");
		function startEvent()
		{
			if (document.createEvent)
			{
				var event=document.createEvent("Event");
				event.initEvent("click", true, true);
				 this.dispatchEvent(event);
			}else
			{			
			var event = new Event("click" ,{bubbles: true, cancelable: false});
            this.dispatchEvent(event);
			}
		}
		startEvent=startEvent.bind(thisElement)
		if (valuePropertyDescriptor.set)
		{
			var combinedFunc= function(value)
			{
			   this.set=valuePropertyDescriptor.set;
			   this.set(value);
			   startEvent();
			}
            combinedFunc=combinedFunc.bind(thisElement);			
			var old_setf=valuePropertyDescriptor.set;
			var newDescriptorObject={configurable:true, enumerable:true, get:valuePropertyDescriptor.get,set:combinedFunc}
			Object.defineProperty(thisElement,"value",newDescriptorObject);
		}
		
	}
	//////////////////////////////////////////
	componentDidUpdate()
	{
		super.componentDidUpdate();
		App.init();
		
	}
	componentDidMount()
	{
		super.componentDidMount();
		this.attached();
	}
	render()
	{
		return (
		          <input onClick={this.onclick} onFocus={this.onfocus} id={this.state.id} name={this.state.name} className="form-control text-center" placeholder={this.state.placeholder} readonly={(window.isMobile==true)?"true":"false"}/>
		 
		        )
	}
	
  }
Input_calendar.placeholder=placeholder;
Input_calendar.id=id;
Input_calendar.name=name;
return Input_calendar;
}
