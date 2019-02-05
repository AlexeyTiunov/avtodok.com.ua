var ReactDOM = require('react-dom');
var React = require('react'); 
import {Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Extends} from './main_component.js';
import {handleData} from './data_convert.js'
import {TablesDatatables} from './js/pages/tablesDatatables.js'
import {ComContext} from './search_content_v2.js'

export class Search_content_header extends Extends
{
    constructor(props)
      {
          super(props);
          this.state.itemCode="";
          this.onchange=this.onchange.bind(this);
          this.onclick=this.onclick.bind(this);
		  this.keyup=this.keyup.bind(this);
          this.analogAdd=this.analogAdd.bind(this);
          this.state.searchTableComponent=null;
          this.state.analogAdd="checked";
		  this.state.itemCode=this.props.itemCode;
      }
	  keyup(e)
	  {
		  if (e.keyCode==13)
		  {
			   this.onclick(e);
		  }
	  }
      onchange(e)
      {
          this.setState({itemCode:e.target.value});
      }
      onclick(e)
        {
            
            this.state.searchTableComponent.setState(
            {itemCode:this.state.itemCode,
            shouldComponentUpdate:false,
            showAnalogs:(this.state.analogAdd=="checked")?true:false,
            showBrandList:true,
			brandCode:undefined,
            });    
        }
      analogAdd()
      {
          if (this.state.analogAdd=="checked")
          this.setState({analogAdd:""});
          else
          this.setState({analogAdd:"checked"}); 
      } 
      render ()
      {
         
                    
          return (  <ComContext.Consumer>
                  {
                    function (mainComp){          
                      this.state.searchTableComponent=mainComp;
                    return(     
                     <div action="" method="post" className="form-horizontal form-bordered">
                          <div className="form-group">
                               <div className="col-md-4"></div>    
                                <div className="col-md-4" >
                                    <div className="input-group">
                                        
                                        <input type="text" onKeyUp={this.keyup} onChange={this.onchange} value={this.state.itemCode} id="example-input1-group2" name="example-input1-group2" className="form-control" placeholder="Введіть номер запчастини"/>
                                        <span className="input-group-btn">
                                            <button type="button" onClick={this.onclick} className="btn btn-primary"><i className="fa fa-search"></i> Пошук </button> 
                                        </span>
                                    </div>
                               </div>
                               <div className="col-md-4">
                                   <div className="col-md-8">
                                       <label className="switch switch-danger"><input type="checkbox" onChange={this.analogAdd} checked={this.state.analogAdd} /><span></span></label><br/>
                                       <span>Пошук <br/> аналогів </span>
                                   </div>    
                               </div>    
                           </div>
                   </div> )     
                    } .bind(this)
                  }                  
                  </ComContext.Consumer>
            
            
             
                
                  )
      }   
    
    
    
}