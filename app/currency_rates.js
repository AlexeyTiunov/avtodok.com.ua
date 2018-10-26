var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'


export function getCurrencyRates()
{
	
	var extd= new Extends();
	var Prom=extd.makeRequestToRecieveDataAsyncNewObject("POST","/ws/currency_rates.php","");
	
	function getRates()
	{
		var handleRatesUAH= new handleData(responseText,undefined,"UAH");
		var handleRatesUSD= new handleData(responseText,undefined,"USD");
		var handleRatesEUR= new handleData(responseText,undefined,"UAH")
	}
	
	
}

export class Currency_rates extends Extends
{
	constructor(props)
	{
		super(props);
	}
 getCurrencyRates(){
	
	
	var Prom=this.makeRequestToRecieveDataAsyncNewObject("POST","/ws/currency_rates.php","");
	
	var getRates =function (responseText)
	{
		var handleRatesUAH= new handleData(responseText,undefined,"UAH");
		var handleRatesUSD= new handleData(responseText,undefined,"USD");
		var handleRatesEUR= new handleData(responseText,undefined,"EUR");
		
		
		this.setState({
			           RateInfoUAH:handleRatesUAH.mapArray,
			           RateInfoUSD:handleRatesUSD.mapArray,
			           RateInfoEUR:handleRatesEUR.mapArray,
		              })
		              
		
	}.bind(this);
	Prom.then(getRates);
	
    }
	////////////////////////////////////
	componentDidMount()
	{
		super.componentDidMount();
		this.getCurrencyRates();
		var thisgetCurrencyRates=this.getCurrencyRates.bind(this);
		this.interval=setInterval(thisgetCurrencyRates,1000*20);
		
	}
	componentWillUnmount()
	{
		clearInterval(this.interval);
	}
	
	render()
	{
		var uahRateFormat="";
		var usdRateFormat="";
		try
		{    uahRateFormat=this.state.RateInfoUAH.FORMAT_STRING.replace("#","");
			 usdRateFormat=this.state.RateInfoUSD.AMOUNT_CNT+this.state.RateInfoUSD.FORMAT_STRING.replace("#","")+"="+this.state.RateInfoUSD.AMOUNT+uahRateFormat;
		}catch(e)
		{
			
		}
		return (
		
		           <span class="label label-indicator animation-floating"><font><font>{usdRateFormat}</font></font></span>  
		       )
		
	}
	
}


