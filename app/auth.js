var ReactDOM = require('react-dom');
var React = require('react');
import {Extends} from './main_component.js' 



export class Auth extends Extends
{
     constructor(props)
    {
        super(props);
        
        
        this.state.renderIn="";
        this.state.isAuthed=false;
        
    }  
    auth(request)
    { 
         var findMySelf=this.findMySelf(this.constructor.name);
         var Prom=this.makeRequestToRecieveData("POST","/ws/auth.php",false,request)
         
         Prom.then(function(responseText){
              
               if (Number(responseText)>0)
               {
                   authComp=<Auth_done />; 
                   isAuthed=true;
               }                                       
               else 
               {
                    authComp=<Auth_need />;
                    isAuthed=false;
               }
               findMySelf().setState({renderIn:React.createElement(authComp.type),
                                      isAuthed:isAuthed
                                     })
             
         })
         
    }
    autoAuth()
    {
      this.auth("AUTO_AUTH=Y"); 
    }
    
    isAuthed()
    {
        
      this.auth("CHECK_AUTH=Y");  
        
    }
   
    /////////////////////////////
     componentDidMount()
     {
        super.componentDidMount(); 
       this.autoAuth(); 
     }  
    render(){ 
                 return ( <div id="modal-user-auth" className="modal fade"  role="dialog">
                         
                             {this.state.renderIn} 
                                   
                           </div> 
                      )
            } 
    
}   
export class Auth_done extends Extends      
{
     constructor(props)
    {
        super(props);
        this.logOut=this.logOut.bind(this);
        
    }
    
    logOut()
    {
         var findMySelf=this.findMySelf(this.constructor.name);
         var Prom=this.makeRequestToRecieveData("POST","/ws/auth.php",false,"LOG_OUT=Y")  
    }
      
    ///////////////////////////////////
   
    
    render(){
        
              return (
                       <div className="modal-dialog">                     
                         <div className="modal-content">
                           <div className="modal-header">
                           </div>
                           <div className="modal-body">
                             
                              <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="button" onClick={this.logOut}  className="btn btn-sm btn-primary"><font><font>Вийти</font></font></button>
                                 </div>                           
                               </div>
                             </div>    
                          <div className="modal-footer">
                          </div>
                    
                        
                      </div>
                      </div> 
               
               
               
                      )
        
        
            }
    
}
export class Auth_need extends Extends
{
    constructor(props)
    {
        super(props);
        this.onInputChange=this.onInputChange.bind(this);
        this.state.LOGIN="";
        
    }
    
    onInputChange()
    {
        
    } 
    render()
    {
        return (
                   <div className="modal-dialog">
                      <div className="modal-content">    
                        <div className="modal-header text-center">
                          <h2 className="modal-title"><i className="fa fa-pencil"></i><font><font> Авторизация</font></font></h2>
                        </div>
                       <div className="modal-body">
                        <form action="index.html" method="post" enctype="multipart/form-data" className="form-horizontal form-bordered" onsubmit="return false;">
                            
                          <fieldset>
                                <legend><font><font>Авторизация</font></font></legend>
                                <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Логин</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" onChange={this.onInputChange} id="user-settings-login" name="LOGIN" className="form-control" placeholder="Введіть Ваш логин..."/>
                                    </div>
                                </div>
                                 <div className="form-group">
                                    <label className="col-md-4 control-label" for="user-settings-password"><font><font>Новий пароль</font></font></label>
                                    <div className="col-md-8">
                                        <input type="password" onChange={this.onInputChange} id="user-settings-password" name="NEW_PASSWORD" className="form-control" placeholder="Введіть Ваш новий пароль..."/>
                                    </div>
                                </div>
        
                        </fieldset>   
         
                         <div className="form-group form-actions">
                                <div className="col-xs-12 text-right">
                                    <button type="button"  className="btn btn-sm btn-default" data-dismiss="modal"><font><font>Відміна</font></font></button>
                                    <button type="button" onClick={this.saveUserData}  className="btn btn-sm btn-primary"><font><font>Авторизация</font></font></button>
                                </div>
                         </div>
                       </form>
                    </div>
                 </div>  
              </div>               
             
              
              )
    }
     
    
    
}