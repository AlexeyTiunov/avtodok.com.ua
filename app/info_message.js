var ReactDOM = require('react-dom');
var React = require('react'); 
import {Extends} from './main_component.js' 



export class Info_message extends Extends
{
     constructor(props) 
     {
         super(props)
        this.state.header=""; 
        this.state.body="";
        this.state.footer="";
		this.state.isOn=false;
        this.offMassage=this.offMassage.bind(this); 
     }
	 offMassage(e)
	 {
		 if (this.state.isOn)
		 this.setState({isOn:false})
	 }
     render()
     {
           return ( <div onClick={this.offMassage} id="info_message" className="modal fade" role="dialog">
                     <div className="modal-dialog">                     
                       <div className="modal-content">
                          <div className="modal-header">
                                  {this.state.header}
                          </div>
                          <div className="modal-body">
                                   {this.state.body}
                          </div>
                          <div className="modal-footer">
                                   {this.state.footer}
                          </div>
                    
                        </div>
                      </div>          
                   
                    </div> 
          
           
            
              )  
         
         
     }
    
    
}