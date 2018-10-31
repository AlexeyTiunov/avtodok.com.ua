var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'



export class Contacts extends Extends
{
	
	constructor(props) 
     { 
	    super(props);
		
	 }


render(){
          return ( 
		                 <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-3">
                                    <div className="widget">
                                        <div className="widget-simple">
                                            <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                                                <i className="fa fa-building"></i>
                                            </a>
                                            <h4 className="widget-content text-right animation-hatch">
                                                <a href="javascript:void(0)"> <strong>097 025 11 10</strong></a>
                                                <small><em>Офіс</em></small>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="widget">
                                        <div className="widget-simple">
                                            <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                                                <i className="gi gi-cart_in"></i>
                                            </a>
                                            <h4 className="widget-content text-right animation-hatch">
                                                <a href="javascript:void(0)"> <strong>044 545 70 17 + 111</strong></a>
                                                <small><em>Замовлення по Україні</em></small>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="widget">
                                        <div className="widget-simple">
                                            <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                                                <i className="gi gi-globe_af"></i>
                                            </a>
                                            <h4 className="widget-content text-right animation-hatch">
                                                <a href="javascript:void(0)"> <strong>044 545 70 17 + 105</strong></a>
                                                <small><em>Замовлення закордон</em></small>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="widget">
                                        <div className="widget-simple">
                                            <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                                                <i className="gi gi-money"></i>
                                            </a>
                                            <h4 className="widget-content text-right animation-hatch">
                                                <a href="javascript:void(0)"> <strong>044 545 70 17 + 107</strong></a>
                                                <small><em>Бухгалтер</em></small>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="widget">
                                        <div className="widget-simple">
                                            <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                                                <i className="gi gi-money"></i>
                                            </a>
                                            <h4 className="widget-content text-right animation-hatch">
                                                <a href="javascript:void(0)"> <strong>044 545 70 17 + 107</strong></a>
                                                <small><em>Головний бухгалтер</em></small>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="widget">
                                        <div className="widget-simple">
                                            <a href="javascript:void(0)" className="widget-icon pull-left animation-fadeIn themed-background">
                                                <i className="gi gi-money"></i>
                                            </a>
                                            <h4 className="widget-content text-right animation-hatch">
                                                <a href="javascript:void(0)"> <strong>044 545 70 17 + 107</strong></a>
                                                <small><em>Спірні питання</em></small>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
								


                                <div className=" col-xs-12 col-sm-4 col-md-8">
                                    

                                    <div className="col-md-4"><div className="widget">
                                        <div className="widget-simple">
                                            
                                                <h4 className="widget-content text-right animation-hatch">
                                                    <a href="mailto:office@parts.avtodok.com.ua"> office<br/>@parts.avtodok.com.ua</a>
                                                    <small><em>Загальні питання</em></small>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="widget">
                                            <div className="widget-simple">
                                            
                                                <h4 className="widget-content text-right animation-hatch">
                                                    <a href="mailto:sklad@parts.avtodok.com.ua">sklad<br/>@parts.avtodok.com.ua</a>
                                                    <small><em>Питання по прайсу</em></small>
                                                </h4>
                                           </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="widget">
                                            <div className="widget-simple">
                                           
                                                <h4 className="widget-content text-right animation-hatch">
                                                    <a href="mailto:accountant@parts.avtodok.com.ua">accountant<br/>@parts.avtodok.com.ua</a>
                                                    <small><em>Фінансові запитання</em></small>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 hidden-xs">
                                        <div className="block full">
                                            
                                            <div className="block-title">
                                                <h4><strong>Карта</strong></h4>
                                            </div>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.1534316958764!2d30.57767197538826!3d50.40618950559063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd7b6db373c439eae!2z0JDQstGC0L7QtNC-0Log0J_QsNGA0YLRgQ!5e0!3m2!1sru!2sua!4v1480087827109" width="100%" height="400em" frameborder="0" style={{"border":"0"}} allowfullscreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 visible-xs">
                                        <div className="block full">
                                            
                                            <div className="block-title">
                                                <h4><strong>Карта</strong></h4>
                                            </div>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.1534316958764!2d30.57767197538826!3d50.40618950559063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd7b6db373c439eae!2z0JDQstGC0L7QtNC-0Log0J_QsNGA0YLRgQ!5e0!3m2!1sru!2sua!4v1480087827109" width="100%" height="400em" frameborder="0" style={{"border":"0"}} allowfullscreen></iframe>
                                            </div>
                                    </div>
                        </div>)
		  
		  
		   
		          


    }
}