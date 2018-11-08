var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {Carousel}  from './carousel.js'
import {Search_content_header} from './search_content_header.js'
import {Search_table_v2} from './search_content_v2.js'  

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
                 <Search_content_startpage />
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

export class  Search_content_startpage extends Search_content_header
{
      constructor(props)
      {
        super(props);  
         
          
      }
      onclick(e)
      {
          var getWorkSearch=function()
          {
            this.state.searchTableComponent=window.objectReg['Search_table_v2']; 
            this.onclick(e);   
          }
          var getWorkSearch=getWorkSearch.bind(this);  
          if (!window.objectReg['Search_table_v2'])
          {
            getWorkPage().setState({renderIN:React.createElement(Search_table_v2),defineRoutes:false}, getWorkSearch);
          }      
           else
          {
                this.state.searchTableComponent=window.objectReg['Search_table_v2'];
                super.onclick(e); 
          }
             
          
      }
      
      render()
      {
          //this.state.searchTableComponent=window.getWorkPage();
          return (<div className="block" >
                                <h2 className="text-center"><strong>Потрібні автозапчастини?</strong></h2>
                                <hr/>
                                <h4 className="text-center">Введіть номер потрібної запчастини!</h4>
                                <div className="input-group text-center" style={{width:"50%",marginLeft: "25%"}}>
                                        <input id="example-input1-group2" onChange={this.onchange} value={(this.state.itemCode==undefined)?"":this.state.itemCode} name="example-input1-group2" className="form-control" placeholder="Введіть номер запчастини" type="text"/>
                                        <span className="input-group-btn">
                                            <a href="#"><button type="button" onClick={this.onclick} className="btn btn-primary"><i className="fa fa-search"></i> Пошук</button></a>
                                        </span>
                              </div>
                              <hr/>
                              <h4 className="text-center">Або перейдіть у каталог!</h4>
                              <div className="input-group text-center" style={{width: "50%",marginLeft: "25%",marginBottom: "1em"}}>
                                        <span className="input-group-btn">
                                            <a href="catalog.html"><button type="button" className="btn btn-primary"> Каталог автозапчастин</button></a>
                                        </span>
                              </div>

                            </div>);
          
          
          
          
      }
    
}
  