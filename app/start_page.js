var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {Carousel}  from './carousel.js'
import {Search_content_header} from './search_content_header.js'

//import jQuery from './js/vendor/jquery-1.11.1.min.js';
//import jQuery from 'jquery';
//var $=require('jquery'); 
//var jQuery=require('jquery');
//window.jQuery=jQuery;
//window.$=jQuery;  

var unickKey=1;

var $=jQuery;

require ('bootstrap/dist/js/bootstrap.js');
require ('bootstrap/dist/css/bootstrap.min.css');

export class Start_page extends Extends
{
     constructor(props)
    {
      super(props);   
        
    }
    
    render()
    {
    return (<div className="row">
            <div className="col-sm-7"> 
              <div className="block"  > 
                 <Search_content_header />
              </div>   
              <div className="block"  >
                 {React.createElement(Carousel,{id:"carousel"+unickKey++,route:"/ws/carousel/banners",})}
               </div>    
                
                
            </div>     
            <div className="col-sm-5 hidden-xs">
                        
             
                   <div className="block">
                   </div>
            
                  <div className="block">
                            <div className="block-title">
                                <h2><strong>Вигідні</strong> пропозиції</h2>
                            </div>
                             { React.createElement(Carousel,{id:"carousel"+unickKey++,route:"/ws/carousel/img",})}  
                   </div>  
               </div>   
          </div> 
      )  
        
        
    }
    
}
  